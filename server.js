const mysql = require('mysql');
const inquirer = require("inquirer");

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