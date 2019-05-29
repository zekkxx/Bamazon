# Bamazon
A mock Amazon app utilizing MySQL and Node.js

# Functionality:
This application utilizes the console to present a simplified version of an Amazon App.
This application is split into three levels, of which I completed the first level.  
You can find the functionality walkthrough of my program here: https://youtu.be/tkQwIHO9eCA  

When writing this program, you should find a way to avoid storing and passing the entire results of the database connection like I did. I intend to come back and change this to make it seperate database calls, which would be necessary if I didn't have just 10 items in my database.

# Running what I've built on your own computer.
I utilized a key.js file in order to hide the credentials of the database that I utilized for this program. The .gitignore file indicates what files I haven't included, namely a .env file which I used to securely store the following information. You'll need to change this information to fit your own mysql server, and run the bamazon.sql code for proper set-up.
```
mysql_host=localhost
mysql_port=3306
mysql_user=________
mysql_password=root
mysql_database=bamazon_db
```  
Make sure you utilize npm in the directory in order to install the mySQL, dotenv, and inquirer dependencies this project is built on.

# Level One
* database bamazon  
    * table products  
        * item_id  
        * product_name varchar  
        * department_name varchar  
        * price float  
        * stock_quantity int  

Give 10 mock products

Node app: bamazonCustomer.js  
* Display all items available for sale  
    * Include ids, names, and prices  
* Then prompt 2 messages:  
    * Ask ID of product  
    * Ask how many units  
* If not enough units, prevent order, log error  
* If enough units, fulfill order  
    * update SQL database to reflect quantity  
    * Show total cost of purchase  

# Level Two
Node app: bamazonManager.js  
* Display set of menu options:  
    * View Products for Sale  
        * List all items with ID, name, price, quantity  
    * View Low Inventory  
        * List all items w/ quantity < 5  
    * Add to Inventory  
        * Display prompt to select existing item  
        * Increase stock  
    * Add New Product  
        * Add a brand new product to stock  

# Level Three
Using database bamazon
* table departments
    * department_id
    * department_name
    * over_head_costs (dummy number)
* table products
    * product_sales == quantity.sold * price  
            (adjust bamazonCustomer.js)

Node app: bamazonSupervisor.js  
    Display set of menu options:  
        View Product Sales by department  
            Display as table in terminal:  
                All fields in departments  
                product_sales in products  
                total_profit = product_sales - costs  
                    --Calculate on the fly  
        Create new Department  

Hints:  
* Aliases in MySQL  
* Group by/join in MySQL  
* NPM package that logs tables to console  