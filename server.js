// start the app
    // options    
        // view all departments, view all roles, view all employees, 
        // add a department, add a role, add an employee, and update an employee role
    // when selected: 
        // when all departments is selected
            // table: 
                // department names, 
                // department id's
        // when all roles is selected
            // table: 
                // job title, 
                // role id, 
                // department, 
                // salary
        // when all employees is selected
            // table: 
                // employee id, 
                // first name, 
                // last name, 
                // job title, 
                // department, 
                // salary, 
                // manager
        // add a department
            // prompt: enter the name of the department. 
            // Then the department is added to the database
        // add a role
            // prompt: enter the name, salary, and department for the role. 
            // Then the role is added to the database
        // add an employee
            // prompt: enter the employee's first name, last name, role, and manager.
            // Then the employee is added
        // update an employee role
            // prompt: select an employee to update and their new role.
            // Then the information is updated in the database

const inquirer = require('inquirer')
const mysql = require('mysql2');
const { title } = require('process');
const { identity } = require('rxjs');
const { isBuffer } = require('util');


// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
  );


const firstQuestion = ()=>{
    inquirer.prompt([
        {
            type: 'list',
            message: "Select an option",
            name: "selectChoice",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"]
        },
    ]).then((ans) => {
        switch(ans.selectChoice) {
            case 'view all departments':
                viewAllDepartments();
                break;
            case 'view all roles':
                viewAllRoles();
                break;
            case 'view all employees':
                viewAllEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmployeeRole();
                break;
            default: 
                process.exit();
        }
    })
}

// enable asynchronous, promise-based behavior
const viewAllDepartments = async ()=>{
    const res = await db.promise().query("SELECT * FROM department")
        console.table(res[0]); // need first set of arrays that contains data, not the buffer
    firstQuestion()
}

const viewAllRoles = async ()=>{
    const res = await db.promise().query("SELECT title, job_roles.id, department_name, salary FROM job_roles LEFT JOIN department ON department.id = job_roles.department_id;")
        console.table(res[0]);
    firstQuestion()
}

const viewAllEmployees = async ()=>{
    const res = await db.promise().query("SELECT employee.first_name, employee.last_name, job_roles.title, department.department_name, job_roles.salary, manager.last_name as manager FROM employee LEFT JOIN job_roles ON employee.employee_role_id = job_roles.id LEFT JOIN department ON job_roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;")
        console.table(res[0]);
    firstQuestion()
}

const addDepartment = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department',
            name: 'department'
        },
    ]).then(async (ans)=>{
        const res = await db.promise().query(`INSERT INTO department (department_name) VALUES (?)`, ans.department)
            console.log("department added!");
            firstQuestion()
    })
}

const addRole = async ()=>{
    const allDepartments = await db.promise().query(`SELECT department_name AS name, id AS value FROM department`)
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter the role title",
            name: "title"
        },
        {
            type: 'input',
            message: "Enter the salary for the role",
            name: "salary"
        },
        {
            type: 'list',
            message: "Enter the department for the role",
            name: "department_id",
            choices: allDepartments[0]
        },
    ]).then(async (ans)=>{
        const res = await db.promise().query(`INSERT INTO job_roles SET ?`, ans) //object holds exact key (name matches) from db and we need it's value 
        console.log("role added!")
        firstQuestion()
    })
}

const addEmployee = async ()=>{
    const allRoles = await db.promise().query(`SELECT title as name, id AS value FROM job_roles`)
    const allEmployees = await db.promise().query(`SELECT last_name AS name, id AS value FROM employee`)
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter the employee's first name",
            name: "first_name"
        },
        {
            type: 'input',
            message: "Enter the employee's last name",
            name: "last_name"
        },
        {
            type: 'list',
            message: "Select the employee's role",
            name: "employee_role_id",
            choices: allRoles[0]
        },
        {
            type: 'list',
            message: "Select the employee's manager name",
            name: "manager_id",
            choices: allEmployees[0]
        },
    ]).then(async (ans) => {
        const res = await db.promise().query(`INSERT INTO employee SET ?`, ans)
        console.log("employee added!")
        firstQuestion()
    })
}

const updateEmployeeRole = async ()=>{
    const allRoles = await db.promise().query(`SELECT title as name, id AS value FROM job_roles`)
    const allEmployees = await db.promise().query(`SELECT last_name AS name, id AS value FROM employee`)
    inquirer.prompt([
        {
            type: 'list',
            message: "Select the employee",
            name: "id",
            choices: allEmployees[0]
        },
        {
            type: 'list',
            message: "Select the employee's role",
            name: "employee_role_id",
            choices: allRoles[0]
        },
    ]).then(async (ans) => {
        const res = await db.promise().query(`UPDATE employee SET employee_role_id = ? WHERE id = ?`, [ans.employee_role_id, ans.id])
        console.log("employee updated!")
        firstQuestion()
    })
}


firstQuestion()