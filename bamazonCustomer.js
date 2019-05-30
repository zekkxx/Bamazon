require("dotenv").config(); //Utilize the .env file
//Import dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js")
//Create connection object to mySQL
var connection = mysql.createConnection(keys.connections);
  
function connectToDatabase(){ //Opens connection to database
    connection.connect(function(err){
        if(err) throw err;
        console.log("connected as id " + connection.threadId + "\n"); //Shows connection made
    });
}

function displayProducts(){ //Displays products and sends to product select inquirer
    console.log("###########################################################");
    connection.query("SELECT * FROM products", function(err, res){ //selects all information from products.
        if (err) throw err;
        for(let i=0; i<res.length; i++){ //Prints out item id, name, and price for every item in response from products
            console.log(res[i].item_id + ": " + res[i].product_name
            + " $" + res[i].price);
        }
        console.log("###########################################################");
        productSelect(res); //passes response from products into product select
    });
}

function productSelect(dbResponse){ //Inquires for ID from user, and passes as necessary
    console.log("------------------------------------------------------");
    inquirer.prompt([{ //inquires for the ID number and saves it to selectID
        type: "number",
        message: "What is the ID of the item you would like to purchase?",
        name: "selectID"
    }]).then(function(response){
        if(response.selectID <=0 || response.selectID > dbResponse.length){ //If the response is not within the number of ids
            console.log("-----------------------------------------------")
            console.log("That's not a valid ID, please select another ID");
            productSelect(dbResponse); //try again (passes response from products again)
        } else {
            selectPurchaseQuantity(dbResponse[response.selectID-1]); //passes the specific product from products based on ID
        } //Because array starts at 0, selected ID will need to be pushed one to the left, hence the -1
    });
}

function selectPurchaseQuantity(dbResponse){ //Inquires for quantity desired, and passes as necessary
    console.log("------------------------------------------------------------------");
    console.log("You may enter a number zero or lower to return to product display."); //information for use/return policy
    inquirer.prompt([{ //inquires for quantity desired and saves it to numberPurchased
        type: "number",
        message: "How many units would you like to purchase of the product?",
        name: "numberPurchased"
    }]).then(function(response){
        if(response.numberPurchased < 0){ //If quantity is negative, assume trying to offload
            console.log("--------------------------------------------------------------");
            console.log("I'm sorry, we don't purchase product from unsolicited sources.");
            displayProducts(); //Return to main screen
        } else if (response.numberPurchased == 0){ //If quantity is 0, assume accidental selection
            console.log("--------------------------------------------------------------------");
            console.log("If you made this selection by accident, please try again. Thank you.");
            displayProducts(); //Return to main screen
        } else if (response.numberPurchased > dbResponse.stock_quantity) { //If quantity desired is higher than stock available
            console.log("--------------------------------------------------------------------------------------");
            console.log("We're sorry, unfortunately you have requested more than we have in stock of this item."); //apologize
            console.log("We have " + dbResponse.stock_quantity + " available for purchase."); //give current stock
            selectPurchaseQuantity(dbResponse); //Let them make another quantity request
        } else { //We want to display price as an XXX.XX value, price and numPurchased are unlimited floats.
            totalSalesPrice = parseFloat(parseInt(dbResponse.price * response.numberPurchased * 100)) / 100 //push decimal over for .XX and make int and then push back over
            console.log("Your total price is: $" + totalSalesPrice); //salese price is now a XXX.XX number
            var updateQuantity = (dbResponse.stock_quantity - response.numberPurchased); //get new quantity
            updateSQLTable(dbResponse.item_id, updateQuantity); //apply new quantity to item_id
        }
    });
}

function updateSQLTable(itemId, quantityRemaining){ //Sets the stock of item_id to quantityRemaining where item_id equals itemId
    connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: quantityRemaining
              },
              {
                item_id: itemId
              }
            ],
            function(err) {
              if (err) throw err;
            }
          );
    connection.end(); //end connection to database, end application
}

connectToDatabase(); //start connection
displayProducts(); //starts main functionality