const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const Sequelize = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function mainFunction() {
    inquirer.prompt([{
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department',
            'Add a role', 'Add an employee', 'Update an employee role'
        ]
    }]).then(function(answers) {



        switch (answers.choices) {
            case 'View all departments':
                viewDepartments()
                break;
            case "View all roles":
                viewRoles()
                break;
            case 'View all employees':
                viewEmployees()
                break;
            case 'Add a department':
                addDepartment()
                break;
            case 'Add a role':
                addRole()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Update an employee role':
                updateEmployeeRole()
                break;
        };
    });
    // function to view department
    function viewDepartments() {
        connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
            function(err, res) {
                if (err) throw err
                console.table(res)
                mainFunction()
            })
    }
    // function to view roles
    function viewRoles() {
        connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
            function(err, res) {
                if (err) throw err
                console.table(res)
                mainFunction()
            })
    }
    // function to view employee list
    function viewEmployees() {
        connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
            function(err, res) {
                if (err) throw err
                console.table(res)
                mainFunction()
            })
    }

    // function to add department
    function addDepartment() {

        inquirer.prompt([{
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }]).then(function(res) {
            var query = connection.query(
                "INSERT INTO department SET ? ", {
                    name: res.name

                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    mainFunction();
                }
            )
        })
    }

    // function to add roles
    function addRole() {
        connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
            inquirer.prompt([{
                    name: "Title",
                    type: "input",
                    message: "What is the roles Title?"
                },
                {
                    name: "Salary",
                    type: "input",
                    message: "What is the Salary?"

                }
            ]).then(function(res) {
                connection.query(
                    "INSERT INTO role SET ?", {
                        title: res.Title,
                        salary: res.Salary,
                    },
                    function(err) {
                        if (err) throw err
                        console.table(res);
                        mainFunction();
                    }
                )

            });
        });
    }

    var roleArr = [];

    function selectRole() {
        connection.query("SELECT * FROM role", function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
            }

        })
        return roleArr;
    }
    // Select Role quieries The Managers for Add Employee Prompt 
    var managersArr = [];

    function selectManager() {
        connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                managersArr.push(res[i].first_name);
            }

        })
        return managersArr;
    }
    // function to Add Employee 
    function addEmployee() {
        inquirer.prompt([{
                name: "firstname",
                type: "input",
                message: "Enter their first name "
            },
            {
                name: "lastname",
                type: "input",
                message: "Enter their last name "
            },
            {
                name: "role",
                type: "list",
                message: "What is their role? ",
                choices: selectRole()
            },
            {
                name: "choice",
                type: "rawlist",
                message: "Whats their managers name?",
                choices: selectManager()
            }
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            var managerId = selectManager().indexOf(val.choice) + 1
            connection.query("INSERT INTO employee SET ?", {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function(err) {
                if (err) throw err
                console.table(val)
                mainFunction();
            })
        })
    }


    // function to update employee
    function updateEmployeeRole() {
        connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
            // console.log(res)
            if (err) throw err
            console.log(res)
            inquirer.prompt([{
                    name: "lastName",
                    type: "rawlist",
                    choices: function() {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    },
                    message: "What is the Employee's last name? ",
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the Employees new title? ",
                    choices: selectRole()
                },
            ]).then(function(val) {
                var roleId = selectRole().indexOf(val.role) + 1
                connection.query("UPDATE employee SET WHERE ?", {
                        last_name: val.lastName
                    }, {
                        role_id: roleId

                    },
                    function(err) {
                        if (err) throw err
                        console.table(val)
                        mainFunction();
                    })

            });
        });

    }

}
mainFunction();