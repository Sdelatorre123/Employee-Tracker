const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password123',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);

function accessDb() { }
inquirer.prompt([
    {
        type: 'list',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Exit'],
        message: 'What would you like to do now?',
    }
])

    .then((answers) => {
        switch (answers.choices) {
            case 'View all departments':
                db.query('SELECT * FROM department', (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('the results are below!')
                    console.table(results);
                    accessDb()
                });
                break;

            case 'View all roles':
                db.query('SELECT employee_role.title, employee_role.salary, department.department_name FROM employee_role, department WHERE employee_role.department_id = department.id', (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Roles are available below!')
                    console.table(results);
                    accessDb()
                });


                switch (answers.action) {
                    case "View all employees":
                        viewAllEmp();
                        break;

                    case "View all employees by department":
                        viewAllEmpByDept();
                        break;

                    case "View all employees by role":
                        viewAllEmpByRole();
                        break;

                    case "Add employee":
                        addEmp();
                        break;

                    case "Add department":
                        addDept();
                        break;

                    case "Add role":
                        addRole();
                        break;

                    case "Update employee role":
                        updateEmpRole();
                        break;
                }

        }
    })
accessDb();
function addDept() {
    inquirer.prompt({
        name: "deptName",
        type: "input",
        message: "Department Name: "
    }).then((answer) => {
        db.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, results) => {
            if (err) return err;
            console.log("DEPARTMENT ADDED.");
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your new role title?',
            name: 'Sales'
        },
        {
            type: 'input',
            message: 'What is the new salary for this role?',
            name: 'legal'
        },
        {
            type: 'list',
            choices: ["Engineering", "Sales", "Lead Engineer", "Legal"],
            message: 'Which department?',
            name: 'Lead Engineering'
        }
    ])
        .then((answers) => {
            let newDeptId;
            switch (answers.choices) {
                case "Legal":
                    db.query(`INSERT INTO employee_role (title, salary, department_id))
                VALUES ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 4);`, (err, results) => {
                        if (err) {
                            return err;
                        }
                    });
                    break;

                case "Engineering":
                    db.query(`INSERT INTO employee_role (title, salary, department_id))
                VALUES ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 1);`, (err, results) => {
                        if (err) {
                            return err;
                        }
                    });
                    break;

                case "Sales":
                    db.query(`INSERT INTO employee_role (title, salary, department_id))
                        VALUES ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 2);`, (err, results) => {
                        if (err) {
                            return err;
                        }
                    });
                    break;

                case "Lead Engineering":
                    db.query(`INSERT INTO employee_role (title, salary, department_id))
                            VALUES ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 3);`, (err, results) => {
                        if (err) {
                            return err;
                        }
                    });
                    break;
            }
        })
}



