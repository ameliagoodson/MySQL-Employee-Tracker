var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "default",
    database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected...");
    runProgram()
});

function runProgram() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add employee",
            "Add department",
            "Add role",
            "Update employee role",
            "View departments",
            "View employees",
            "View roles",
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "Add employee":
                addEmployee();
                break;

            case "Add department":
                addDepartment();
                break;

            case "Add role":
                addRole();
                break;

            case "Update employee role":
                updateEmployee();
                break;

            case "View departments":
                viewDepartments();
                break;

            case "View employees":
                viewEmployees();
                break;

            case "View roles":
                viewRoles();
                break;
        }
    });
}
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "employeeRole",
                type: "input",
                message: "What is the employee's role?"  //should be dropdown list
            },
            {
                name: "employeeManager",
                type: "input",
                message: "Who is the employee's manager?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    manager: answer.employeeManager,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    runProgram()
                }
            )
        })
};

function addDepartment() {
    inquirer
        .prompt(
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the department you would like to add?"
            },
        ).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.departmentName,
                },
                function (err) {
                    if (err) throw err;
                    console.log("The department was created successfully!");
                    runProgram()
                },

        )})}

    function addRole() {
        inquirer
        .prompt(
            [{
                name: "roleName",
                type: "input",
                message: "What is the name of the role you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary payable for the role?"
            },
            {
                name: "departmentID",
                type: "input",
                message: "What is the deparment ID for the role?"
            }
        ])
            .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleName,
                    salary: answer.salary,
                    department_id: answer.departmentID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("The role was created successfully!");
                    runProgram()
                },

        )})
    };

    function updateEmployee() {
        inquirer
        .prompt(
            {
                name: "employeeRole",
                type: "input",
                message: "Which employee's role would you like to update?"
            })
        .then(function (answer) {
            connection.query(
                "SELECT employee.first_name, employee.last_name, role.title, role.salary",
                "FROM employee INNER JOIN role",
                "UPDATE INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    title: answer.employeeRole,
                },
                function (err) {
                    if (err) throw err;
                    console.log("The employee was updated successfully!");
                    runProgram()
                }
            )
        })
    };

    function viewDepartments() {
        connection.query("SELECT * from department", function(err, res) {
            if (err) throw err;
        console.log(res)
        runProgram()
    })}; 

    function viewEmployees() {
        connection.query("SELECT * from employee", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].first_name + " " + res[i].last_name + " " + "Role ID: " + res[i].role_id + " " + "Manager:" + " " + res[i].manager + " " + "Manager ID:" + " " + res[i].manager_id)};
        runProgram()
    })
    }
    function viewRoles() {
        connection.query("SELECT * from role", function(err, res) {
            if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].title)};
        runProgram()
    })
    }
