const mysql = require("mysql2");
const inquirer = require("inquirer");
const db = require("./config/connection.js");
const cTable = require("console.table");

//starts the program
function questionList() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainQuestion",
        message: "\nWhat would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Update Employee Manager",
          "View Employees by Manager",
          "View Employees by Department",
          "Delete a Department",
          "Delete a Role",
          "Delete an Employee",
          "View Budget",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      const choice = response.mainQuestion;
      switch (choice) {
        //once the user makes a selection the corresponding function will be invoked
        case "View All Employees":
          viewAllEmployees().then(() => {
            questionList();
          });
          break;

        case "Add Employee":
          break;

        case "Update Employee Role":
          break;

        case "View All Roles":
          break;

        case "Add Role":
          break;

        case "View All Departments":
          break;

        case "Add Department":
          break;

        case "Update Employee Manager":
          break;

        case "View Employees by Department":
          break;

        case "Delete a Department":
          break;

        case "Delete a Role":
          break;

        case "Delete an Employee":
          break;

        case "View Budget":
          break;

        //working
        case "Quit":
          console.log("goodbye");
          db.end();
          break;
      }
    });
}

//working
async function viewAllEmployees() {
  try {
    const viewEmpQuery = `SELECT employee.id, first_name, last_name, title, salary, department.name AS department, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id;`;
    const viewEmpList = await db.query(viewEmpQuery);
    console.table(viewEmpList[0]);
  } catch (error) {
    console.error(error);
  }
}

function addEmployee() {}

function updateEmployeeRole() {}

function viewAllRoles() {}

function addRole() {}

function viewAllDepartments() {}

function addDepartment() {}

function updateEmployeeManager() {}

function viewEmployeesByManager() {}

function viewEmployeesByDepartment() {}

function deleteDepartment() {}

function deleteRole() {}

function deleteEmployee() {}

function viewBudget() {}

//helper functions
async function getRoleList() {
  //count the number of departments
  const roleList = `SELECT id, title, department_id, is_manager FROM role`;
  const roleListQuery = await db.query(roleList);

  const roleListResults = roleListQuery[0].map((employee) => ({
    id: employee.id,
    name: employee.title,
    dept_id: employee.department_id,
    is_manager: employee.is_manager,
  }));
  return roleListResults;
}

questionList();
