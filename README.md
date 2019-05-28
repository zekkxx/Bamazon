# Bamazon
A mock Amazon app utilizing MySQL and Node.js

# Level One
database bamazon
    table products
        item_id
        product_name varchar
        department_name varchar
        price float
        stock_quantity int
Give 10 mock products

Node app: bamazonCustomer.js
    Display all items available for sale
        --Include ids, names, and prices
    Then prompt 2 messages:
        Ask ID of product
        Ask how many units
    If not enough units, prevent order, log error
    If enough units, fulfill order
        update SQL database to reflect quantity
        Show total cost of purchase

# Level Two
Node app: bamazonManager.js
    Display set of menu options:
        View Products for Sale
            --List all items with ID, name, price, quantity
        View Low Inventory
            --List all items w/ quantity < 5
        Add to Inventory
            --Display prompt to select existing item
                Increase stock
        Add New Product
            --Add a brand new product to stock

# Level Three
Using database bamazon
    table departments
        department_id
        department_name
        over_head_costs (dummy number)
    table products
        product_sales == quantity.sold * price
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
    Aliases in MySQL
    Group by/join in MySQL
    NPM package that logs tables to console