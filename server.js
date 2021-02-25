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
      choices: ["Find songs by artist", "Search for song","Find artists with top song and album in same year","Exit"]
    }
  ])
  .then((data)=> {
      if (data.action === "Find songs by artist") {
        promptArtist();
      } if (data.action === "Search for song") {
          promptSong();
      } if (data.action === "Find artists with top song and album in same year") {
          albumSong();
      } if (data.action === "Exit") {
              connection.end();
              return;
      }
  });
};
