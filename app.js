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
    console.log("Connected to database successfully.");
    begin();
});



function begin(){
    
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "Exit Program"
            ]
        }
    ]).then(function(answer){
        switch(answer.action){
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Exit Program":
                connection.end();
                break;
        }
    });
}

// ---------------------------------------------------------------------------
// CRUD OPERATIONS
// ---------------------------------------------------------------------------

// Add new department to departments table
function addDepartment(){
    inquirer.prompt([
        {
            message: "What is the name of the new department?",
            type: "input",
            name: "value"
        }
    ]).then(function(answer){
        let query = `INSERT INTO departments (dept_name) VALUES ("${answer.value}")`;
        connection.query(query, function(err, res){
            if(err) throw err;
            console.log("New department added successfully.");
            begin();
        });
    });
}


// Add new role to roles table
async function addRole(){
    let id = await getDepartmentId(); 
    let title = await getRoleTitle();
    let salary = await getRoleSalary();

    let query = `INSERT INTO roles (title, salary, department_id) VALUE ("${title}", ${salary}, ${id})`;
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("Successfully added new role.");
        begin();
    })
}

// Helper functions for addRole()
async function getDepartmentId(){
    return new Promise(async (resolve, reject) => {
        // query database and wait for response before continuing on
        let departments = await getDepartmentsData();
        let dept_names = [];
        departments.forEach(item => {
            dept_names.push(item.dept_name);
        });

        let output = await inquirer.prompt([
            {
                message: "Which department do you wish to add a role to?",
                type: "list",
                name: "name",
                choices: dept_names
            }
        ]);

        departments.forEach(item => {
            if(output.name == item.dept_name){
                resolve(item.id);
            }else{
                reject("ID not found");
            }
        });
    });     
}

async function getRoleTitle(){
    let output = await inquirer.prompt([
        {
            message: "What is the name of the role?",
            type: "input",
            name: "name"
        }
    ]);

    return output.name;
}

async function getRoleSalary(){
    let output = await inquirer.prompt([
        {
            message: "What is the salary for this role?",
            type: "input",
            name: "salary"
        }
    ]);

    return parseFloat(output.salary);
}

// Add new employee from employees table
function addEmployee(){
    console.log("You want to add an employee");
}



// Read data from departments table
function getDepartmentsData(){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM departments";
        connection.query(query, (err,res) => {
           return err ? reject(err) : resolve(res);
        });
    });
}




    

    
