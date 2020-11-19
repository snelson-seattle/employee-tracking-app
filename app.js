// Package Imports
const inquirer = require("inquirer");
const mysql = require("mysql");

// Set up database connection parameters
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",

    // Select database from server
    database: "crm_DB"
  });

// Establish connection to MySQL database
connection.connect(err => {
    if(err) throw err;
    // Start application upon successful database connection
    begin();
});



function begin(){
    console.log("Connected to database successfully.");
}