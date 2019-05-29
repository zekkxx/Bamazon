require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js")

var connection = mysql.createConnection(keys.connections);
  
function connectToDatabase(){
    connection.connect(function(err){
        if(err) throw err;
        console.log("connected as id " + connection.threadId + "\n");
        displayProducts();
    });
}

function displayProducts(){
    console.log("###########################################################");
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for(let i=0; i<res.length; i++){
            console.log(res[i].item_id + ": " + res[i].product_name
            + " $" + res[i].price);
        }
        console.log("###########################################################");
        productSelect(res);
    });
}

function productSelect(dbResponse){
    console.log("------------------------------------------------------");
    inquirer.prompt([{
        type: "number",
        message: "What is the ID of the item you would like to purchase?",
        name: "selectID"
    }]).then(function(response){
        if(response.selectID <=0 || response.selectID > dbResponse.length){
            console.log("-----------------------------------------------")
            console.log("That's not a valid ID, please select another ID");
            productSelect(dbResponse);
        } else {
            selectPurchaseQuantity(dbResponse[response.selectID-1]);
        }
    });
}

function selectPurchaseQuantity(dbResponse){
    console.log("------------------------------------------------------------------");
    console.log("You may enter a number zero or lower to return to product display.");
    inquirer.prompt([{
        type: "number",
        message: "How many units would you like to purchase of the product?",
        name: "numberPurchased"
    }]).then(function(response){
        if(response.numberPurchased < 0){
            console.log("--------------------------------------------------------------");
            console.log("I'm sorry, we don't purchase product from unsolicited sources.");
            displayProducts();
        } else if (response.numberPurchased == 0){
            console.log("--------------------------------------------------------------------");
            console.log("If you made this selection by accident, please try again. Thank you.");
            displayProducts();
        } else if (response.numberPurchased > dbResponse.stock_quantity) {
            console.log("--------------------------------------------------------------------------------------");
            console.log("We're sorry, unfortunately you have requested more than we have in stock of this item.");
            console.log("We have " + dbResponse.stock_quantity + " available for purchase.");
            selectPurchaseQuantity(dbResponse);
        } else {
            totalSalesPrice = parseFloat(parseInt(dbResponse.price * response.numberPurchased * 100) / 100)
            console.log("Your total price is: $" + totalSalesPrice);
            var updateQuantity = (dbResponse.stock_quantity - response.numberPurchased);
            updateSQLTable(dbResponse.item_id, updateQuantity);
        }
    });
}

function updateSQLTable(itemId, quantityRemaining){
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
    connection.end();
}

connectToDatabase();