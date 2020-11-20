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
    mainMenu();
});

function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Add Items to Database",
                "View Database Items",
                "Exit Program"
            ] 
        }
    ]).then(function(answer){
        switch(answer.action){
            case "Add Items to Database":
                databaseAdd();
                break;
            case "View Database Items":
                addRole();
                break;
            case "Exit Program":
                connection.end();
                break;
        }
    });
}


function databaseAdd(){
    
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "Return to Main Menu"
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
            case "Return to Main Menu":
                mainMenu();
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
            databaseAdd();
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
        databaseAdd();
    })
}



// Add new employee from employees table
async function addEmployee(){
    let department_id = await getDepartmentId();
    let first_name = await getFirstName();
    let last_name = await getLastName();
    let role_id = await getRoleId(department_id);

    let query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, NULL)`;
    connection.query(query, function(err, res){
        if(err) throw err;
        console.log("Employee added successfully.");
        databaseAdd();
    });
}

// Helper functions
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
                message: "To which department?",
                type: "list",
                name: "name",
                choices: dept_names
            }
        ]);

        departments.forEach(item => {
            if(output.name == item.dept_name){
                resolve(parseInt(item.id));
            }else{
                reject("Department ID not found");
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

async function getFirstName(){
    let output = await inquirer.prompt([
        {
            message: "Enter the employee's first name: ",
            type: "input",
            name: "name"
        }
    ]);

    return output.name;
}

async function getLastName(){
    let output = await inquirer.prompt([
        {
            message: "Enter the employee's last name: ",
            type: "input",
            name: "name"
        }
    ]);

    return output.name;
}

async function getRoleId(department_id){
    return new Promise(async (resolve, reject) => {
        let role_names = [];
        let role_data = await getRolesData();
        
        role_data.forEach(item => {
            if(item.department_id == department_id){
                role_names.push(item.title);
            }
        });

        let output = await inquirer.prompt([
            {
                message: "What is this employee's role?",
                type: "list",
                name: "role",
                choices: role_names
            }
        ]);

        role_data.forEach(item => {
            if(output.role == item.title){
                resolve(item.id);
            }else{
                reject("Role ID not found.");
            }
        });  
    });
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

// Read data from employees table
function getEmployeesData(){
    return new Promise((resolve, reject)=> {
        const query = "SELECT * FROM employees";
        connection.query(query, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
}

// Read data from roles table
function getRolesData(){
    return new Promise((resolve, reject)=> {
        const query = "SELECT * FROM roles";
        connection.query(query, (err, res) => {
            return err ? reject(err) : resolve(res);
        });
    });
}



    

    
