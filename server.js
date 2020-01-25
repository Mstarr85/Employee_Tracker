var mysql = require("mysql");
var inquirer = require("inquirer");

// Connection information for sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "employee_trackerDB"
});

// Connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    // Runs the runapp function after connection is made to prompt user
    runapp();
});

// Function that prompts user for what action they should take
function runapp() {
    inquirer
        .prompt({
            name: "addDeptEmpRole",
            type: "list",
            message: "Would you like to add [DEPARTMENTS] [ROLES] or [EMPLOYEES]",
            choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES"]
        })

        .then(function (answer) {
            // Based on answer, call the Departments, Roles or Employees function
            if (answer.addDeptEmpRole === "DEPARTMENTS") {
                addDepartments();
            }
            else if (answer.addDeptEmpRole === "ROLES") {
                addRoles();
            }
            else if (answer.addDeptEmpRole === "EMPLOYEES") {
                addEmployees();
            }
            else if (promtAnswers.create === "View") {
                    tableData();
            } else {
                connection.end();
            }
        });
}

// Function to handle adding Departments
function addDepartments() {
    // Prompt for Departments being added
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Which Department would you like to add?"
            }
        ])
        .then(function(answer) {
            // After prompting, insert a new Department into the department table
            connection.query(
                "INSERT INTO DEPARTMENTS SET ?",
                {
                    name: answer.department
                },

                function (err) {
                    if (err) throw err;
                    console.log("DEPARTMENT ADDED!");
                    // Then prompt user to add more Departments, Employees or Roles
                    runapp();
                }
            );
        });
}

// Function to handle adding Roles
function addRoles() {
    // Prompt for Roles being added
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "Which Roles would you like to add?"
            }
        ])
        .then(function (answer) {
            // After prompting, insert a new Role into the Role table
            connection.query(
                "INSERT INTO ROLES SET ?",
                {
                    name: answer.role
                },

                function (err) {
                    if (err) throw err;
                    console.log("ROLE ADDED!");
                    // Then prompt user to add more Departments, Employees or Roles
                    runapp();
                }
            );
        });
}// Function to handle adding Employees
function addEmployees() {
    // Prompt for Employees being added
    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: "What is the employee's first name that you would like to add?",
            },
            {
                name: "last",
                type: "input",
                message: "What is the employee's last name that you would like to add?",
            },
            {
                name: "role",
                type: "input",
                message: "Which role would you like to give the employee?"
            },
       
            {
                name: "manager",
                type: "input",
                message: "Who will be their manager?"
            }

        ])
        .then(function (answer) {
            // After prompting, insert a new Employee into the Role table
            connection.query(
                "INSERT INTO EMPLOYEES SET ?",
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.role,
                    manager: answer.manager.id
                },

                function (err) {
                    if (err) throw err;
                    console.log("Employee ADDED!");
                    // Then prompt user to add more Departments, Employees or Roles
                    runapp();
                }
            );
        });
}

//View table data function
  function tableData() {
    inquirer
      .prompt({
        name: "table",
        type: "list",
        message: "Which category would you like to view?",
        choices: ["Department", "Role", "Employee"]
      })
      .then(function(answer) {
        if (answer.table === "Department") {
         deptData();
        }
        else if(answer.table === "Role") {
          roleData();
        } 
        else if(answer.table === "Employee") {
          employeeData();
        }
        else{
          connection.end();
        }
      });
  }

  function deptData() {
    connection.query("SELECT * FROM department", function(err,res){
      if (err) throw err;
      console.table(res);
      runSearch();
    })
  };
  
  function roleData() {
    connection.query("SELECT * FROM role", function(err,res){
      if (err) throw err;
      console.table(res);
      runSearch();
    })
  };
  
  function employeeData() {
    connection.query("SELECT * FROM employee", function(err,res){
      if (err) throw err;
      console.table(res);
      runSearch();
    })
  };























