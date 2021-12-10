const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./config/connection');
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



        switch (answers.command) {
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

    function viewDepartments() {
        console.log('should show me the Department list');

        connection.querry('SELECT * FROM employeeTracker_db.department', function(err, results) {
            console.log('here are departments', err, results);
        });
    }


    function viewRoles() {
        console.log('would show me the role lists');

        connection.query('SELECT * FROM employeeTracker_db.role', function(err, results) {
            console.log('here are the roles', err, results);
        });

    }

    function viewEmployees() {
        console.log('would show me employees list');
        connection.query('SELECT * FROM employeeTracker_db.employee', function(err, results) {
            console.log('list of employees', err, results);

        });

    }

    function addDepartment() {
        console.log(' should add new department');
    }

    function addRole() {
        console.log('should add a new role');
    }

    function addEmployee() {
        console.log('should add a new employee');
    }

    function updateEmployeeRole() {
        console.log('should update employees role');
    }


}
mainFunction();