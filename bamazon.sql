DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(13,2),
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);


INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
('Bread', 'Groceries', 3.99, 1000),
('Peanut Butter', 'Groceries', 5.99, 250),
('Jam', 'Groceries', 4.98, 250),
('iPhone X R', 'Electronics', 1199.99, 75),
('Galaxy S9 Ultra', 'Electronics', 1029.99, 125),
('Unisex Swimsuit', 'Sports', 39.99, 100),
('Beach Towel', 'Bed Bath or Beyond', 29.99, 80),
('Swim Goggle', 'Sports', 59.99, 30),
('Volleyball', 'Sports', 14.99, 50),
('Full Scale Iron Man Suit Replica (Working)', 'Specialty Products', 999999.00, 7);