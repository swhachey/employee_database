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
      choices: ["View all employees?","View all Roles?","View all Departments?" ,"Add Employee?", "Add Role?","Add Department?", "Update employee role?"]
    }
  ])
  .then((data)=> {
      switch (data.action) {
        case "View all employees?":
          allEmployees()
          break;
        case "View all Roles?":
          allRoles()
          break;
        case "View all Departments?":
          allDepartments()
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
  connection.query(`SELECT * FROM employee JOIN role ON employee.role_id = role.id`, (err, res) => {
    if (err) throw err;
    console.log("\n-------------------------\n")
    console.table(res)
  });
  promptMain();
};
const allRoles = () => {
  connection.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    console.log("\n-------------------------\n")
    console.table(res)
  });
  promptMain();
};
const allDepartments = () => {
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.log("\n-------------------------\n")
    console.table(res)
  });
  promptMain();
};

const addEmployee = () => {return inquirer.prompt([
    {
      type: 'input',
      name: 'firstname',
      message: 'Employee First Name?',
    },
    {
      type: 'input',
      name: 'lastname',
      message: 'Employee Last Name?',
    },
    {
      type: 'input',
      name: 'roleid',
      message: 'What is their role ID?',
    }
  ])
  .then((data)=>{
    connection.query('INSERT INTO employee SET ?', 
    {
      first_name: data.firstname,
      last_name: data.lastname,
      role_id: data.roleid,
    }, (err, res) => {
      if (err) throw err;
      console.table(`${res.affectedRows} employee added!\n`)
    })
    allEmployees()
  })

}

const addDepartment = () => {return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentname',
      message: 'Department name?',
    },
  ])
  .then((data)=>{
    connection.query('INSERT INTO department SET ?', 
    {
      name: data.departmentname,
    }, (err, res) => {
      if (err) throw err;
      console.table(`${res.affectedRows} department added!\n`)
    })
    allEmployees()
  })
};

const addRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Role title?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Salary?',
    },
    {
      type: 'input',
      name: 'deptid',
      message: 'Department ID?',
    },
  ])
  .then((data)=>{
    connection.query('INSERT INTO role SET ?', 
    {
      title: data.title,
      salary: data.salary,
      department_id: data.deptid,
    }, (err, res) => {
      if (err) throw err;
      console.table(`${res.affectedRows} Role added!\n`)
    })
    allEmployees()
  })
};

const updateRole = () => {
  return inquirer.prompt([
     {
      type: 'input',
      name: 'roleid',
      message: 'What Role ID to update?',
    },
    {
      type: 'input',
      name: 'newrole',
      message: 'New Role Title?',
    },
   
  ])
  .then((data)=>{connection.query(
    'UPDATE role SET ? WHERE ?',
    [
      {
        title: data.newrole,
      },
      {
        id: data.roleid,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} Roles updated!\n`);
      promptMain();
        }
  )}
  )
  }
  