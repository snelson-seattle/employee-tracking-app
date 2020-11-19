const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "15104$c00t3R1980",

    // Database to connect to
    database: "crm_DB"
  });

connection.connect(err => {
    if(err) throw err;
    begin();
});



function begin(){
    console.log("Connected to database successfully.");
}