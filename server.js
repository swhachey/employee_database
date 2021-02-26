const mysql = require('mysql');
const inquirer = require("inquirer");
const table = require("console.table")

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Cornell77',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
//   connection.end();
  promptMain();
});
/////////////////////////

const promptMain = () => {
  return inquirer.prompt([
    {
    type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ["View all employees?","Add Employee?", "Add Role?","Add Department?", "Update employee role?"]
    }
  ])
  .then((data)=> {
      switch (data.action) {
        case "View all employees?":
          allEmployees()
          break;
        case "Add Employee?":
          addEmployee()
          break;
        case "Add Department?":
          addDepartment()
          break;
        case "Add Role?":
          addRole()
          break;
        case "Update employee role?":
          updateRole()
          break;
        default:
          connection.end()
      }
  });
};

const allEmployees = () => {
  connection.query(`SELECT * FROM employee JOIN department ON employee.role_id = department.id`, (err, res) => {
    if (err) throw err;
    console.table(res)
    connection.end()
  });
  promptMain();
};

const addEmployee = () => {console.log("Yup")}

const addDepartment = () => {console.log("Yup")}

const addRole = () => {console.log("Yup")}

const updateRole = () => {console.log("Yup")}