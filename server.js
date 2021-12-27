const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const Sequelize = require('sequelize');
const { title } = require('process');
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
            'Add a role', 'Add an employee', 'Update an employee role', 'exit'
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
            case 'exit':
                quit();
        };
    });
    // function to view department
    function viewDepartments() {
        connection.query("SELECT * FROM department",
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

    // Function to add a new role
    function addRole() {
        inquirer
            .prompt([{
                    type: "input",
                    name: "role",
                    message: "What is the role you want to add?",
                    validate: (role) => {
                        if (role) {
                            return true;
                        } else {
                            console.log("Please enter a valid role!");
                            return false;
                        }
                    },
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of your new role?",
                    validate: (salary) => {
                        if (salary) {
                            return true;
                        } else {
                            console.log("Please enter a valid salary!");
                            return false;
                        }
                    },
                },
            ])
            //take answers and insert into params
            .then((answer) => {
                const params = [answer.role, answer.salary];

                //sql query to gram name and id from department table
                const departmentQuery = `SELECT name, id FROM department`;

                connection.query(departmentQuery, (err, data) => {
                    if (err) throw err;

                    // .map() on department to get id/name for inquirer question
                    const departments = data.map(({ id, name }) => ({
                        name: name,
                        value: id,
                    }));
                    //inquirer question for role's department with list of database departments as answers
                    inquirer
                        .prompt([{
                            type: "list",
                            name: "department",
                            message: "What department is this role in?",
                            choices: departments,
                        }, ])
                        //take answer from question above and push to params array
                        .then((answer) => {
                            const department = answer.department;
                            console.log(department);
                            params.push(department);

                            //sql query to insert new role into role table
                            const sqlData = `INSERT INTO role(title, salary, department_id)
                                VALUES (?, ?, ?)`;

                            connection.query(sqlData, params, (err, result) => {
                                if (err) throw err;
                                console.log("Added" + answer.role + " to roles!");
                                // back to main()
                                mainFunction();
                            });
                        });
                });
            });
    };


    var roleArr = [];

    function selectRole() {
        connection.query("SELECT * FROM role", function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                roleArr.push({ name: res[i].title, value: res[i].id });
            }

        })
        return roleArr;
    }


    // Select Role quieries The Managers for Add Employee Prompt 
    var managersArr = [];

    function selectManager() {
        connection.query("SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                managersArr.push({ name: res[i].first_name, value: res[i].id });
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
                name: "manager",
                type: "list",
                message: "Whats their managers name?",
                choices: selectManager()
            }
        ]).then(function(res) {
            connection.query("INSERT INTO employee SET ?", {
                first_name: res.firstname,
                last_name: res.lastname,
                manager_id: res.manager,
                role_id: res.role

            }, function(err) {
                if (err) throw err
                console.table(res)
                mainFunction();
            })
        })
    }




    // // function to update employee

    function updateEmployeeRole() {
        const employeeData = `SELECT * FROM employee`;
        connection.query(employeeData, (err, data) => {
            if (err) throw err;

            const employees = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
            }));
            inquirer.prompt([{
                    name: "name",
                    type: "list",
                    message: "which employee's role do you want to update?",
                    choices: employees,
                }])
                // to push the inquirer answerto params array
                .then((employeeChoice) => {
                    const emp = employeeChoice.name;
                    const params = [];
                    params.push(emp);

                    // sql query to select the roles
                    const roleSql = `SELECT * FROM role`;
                    //query results and then .map() on table data to form id/title for inquirer question

                    connection.query(roleSql, (err, data) => {
                        if (err) throw err;

                        const roles = data.map(({ id, title }) => ({
                            name: title,
                            value: id,
                        }));
                        //inquirer to ask employee's new role question with database roles as possible answers
                        inquirer.prompt([{
                                type: "list",
                                name: "role",
                                message: "What is the employee's new role?",
                                choices: roles,
                            }, ])
                            //taking answer from inquirer and pushing to params array
                            .then((roleChoice) => {
                                let role = roleChoice.role;
                                params.push(role);

                                let employee = params[0];
                                params[0] = role;
                                params[1] = employee;

                                //update employee role in database with params array data
                                const sqlData = `UPDATE employee SET role_id = ? WHERE id = ?`;

                                connection.query(sqlData, params, (err, result) => {
                                    if (err) throw err;
                                    console.log("The role is updated!!!");
                                })



                            })
                    })
                })
        });
    }

    function quit() {
        console.log("You have completed your task. Enjoy your day!!!")
        process.exit();
    }
}

mainFunction();