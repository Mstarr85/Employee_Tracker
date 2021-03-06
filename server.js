var mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

//create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employee_trackerDB"
});
//Connect to the my sql server and database
connection.connect(function (err) {
    if (err) throw err;

    //Run the runApp function after the connection is made to prompt the user
    runApp();

});
// Function that prompts the user for what action they should take
function runApp() {
    inquirer
        .prompt({
            name: "create",
            type: "list",
            message: "Create a [Department], a [Role] or [Employee] or [View] the following.",
            choices: ["Department", "Role", "Employee", "View"]
        })
        .then(function (promtAnswers) {
            if (promtAnswers.create === "Department") {
                addDepartment();
            }
            else if (promtAnswers.create === "Role") {
                addRole();
            }
            else if (promtAnswers.create === "Employee") {
                addEmployee();
            }
            else if (promtAnswers.create === "View") {
                viewTable();
            }
            else {
                // connection.end();
            }
        })
}
//function to add department
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "division",
                type: "input",
                message: "Which department would you like to add?",
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department (name) VALUES (?)", answer.division,
                function (err) {
                    if (err) throw err;
                    console.log("Department added!");
                    runApp();
                    // connection.end();
                }
            );
        });
}
//function to add role
function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Which title would you like to add?",
            },
            {
                name: "salary",
                type: "input",
                message: "How much would you lke to make the employee's salary?",
            },
            {
                name: "departmentId",
                type: "input",
                message: "Which departmentID would you like to add?",
            }
        ])
        .then(function (answer) {

            connection.query(
                "INSERT INTO roles SET ?",
                { title: answer.title, salary: answer.salary, department_id: answer.departmentId }, function (err) {
                    if (err) throw err;
                    console.log("Role added!");
                    runApp();
                    // connection.end();
                }
            );
        })
        .catch(err => console.log(err));
}
//function to add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: "What's the employee's first name?",
            },
            {
                name: "last",
                type: "input",
                message: "What's the employee's last name?",
            },
            {
                name: "roleId",
                type: "input",
                message: "What's the eployee's role?"
            },
            {
                name: "managerId",
                type: "input",
                message: "What's the managerID for this employee?",
            }
        ])
        .then(function (answer) {
            connection.query(
                // "INSERT INTO employee (first_name, last_name, role_id, ) VALUES (?,?,?,?)",
                "INSERT INTO employee SET ?",
                { first_name: answer.first, last_name: answer.last, roles_id: answer.roleId, manager_id: answer.managerId },
                // first_name: answer.first,
                // last_name: answer.last,
                // roles_id: answer.roleId,
                // manager_id: answer.managerId

                function (err) {
                    if (err) throw err;
                    console.log("Employee added!");
                    runApp();
                }
            );
        });
}
//Function to view table
function viewTable() {
    inquirer
        .prompt({
            name: "viewTable",
            type: "list",
            message: "Which table would you like to view?",
            choices: ["Department", "Role", "Employee"]
        })
        .then(function (answer) {
            if (answer.viewTable === "Department") {
                viewDept();
            }
            else if (answer.viewTable === "Role") {
                viewRole();
            }
            else if (answer.viewTable === "Employee") {
                viewEmployee();
            }
            else {
                connection.end();

            }
        });
}
function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].name);
        }
        console.log("-----------------------------------");
        runApp();
    });

}
function viewRole() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
        }
        console.log("-----------------------------------");
        runApp();

    })
};
function viewEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].roles_id + " | " + res[i].manager_id);
        }
        console.log("-----------------------------------")
        runApp();
    })
    console.log(query.sql);
    connection.end();
}

