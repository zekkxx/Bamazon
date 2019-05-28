require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js")

var connection = mysql.createConnection(keys.connections);
  
  function connectToDatabase(){
      connection.connect(function(err){
          if(err) throw err;
          console.log("connected as id " + connection.threadId + "\n");
          entryChoice();
      });
  }