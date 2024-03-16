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
          viewAllRoles().then(() => {
            questionList();
          });
          break;

        case "Add Role":
          break;

        case "View All Departments":
          viewAllDepartments().then(() => {
            questionList();
          });
          break;

        case "Add Department":
          addDepartment().then(() => {
            questionList();
          });
          break;

        case "Update Employee Manager":
          break;

        case "View Employees by Department":
          break;

        case "Delete a Department":
          deleteDepartment().then(() => {
            questionList();
          });
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

function addEmployee() {
  try {
  } catch (error) {
    console.error(error);
  }
}

function updateEmployeeRole() {
  try {
  } catch (error) {
    console.error(error);
  }
}

//working
async function viewAllRoles() {
  try {
    const viewRoleQuery = `SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON role.department_id=department.id`;
    const viewRoleList = await db.query(viewRoleQuery);
    console.table(viewRoleList[0]);
  } catch (error) {
    console.error(error);
  }
}

function addRole() {
  try {
  } catch (error) {
    console.error(error);
  }
}

//working
async function viewAllDepartments() {
  try {
    const viewDepartmentQuery = `SELECT id, name FROM department`;
    const viewDepartmentList = await db.query(viewDepartmentQuery);
    console.table(viewDepartmentList[0]);
  } catch (error) {
    console.error(error);
  }
}

//working
async function addDepartment() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "newDepartment",
          message: "Please enter the name of the new department.",
        },
      ])
      .then((response) => {
        const addDeptQuery = `INSERT INTO department (name) VALUES (?)`;
        const addDeptParam = response.newDepartment;
        db.query(addDeptQuery, [addDeptParam], (err, result) => {
          console.log(`You have added ${response.newDepartment}.`);
        });
      });
  } catch (error) {
    console.error(error);
  }
}

function updateEmployeeManager() {
  try {
  } catch (error) {
    console.error(error);
  }
}

function viewEmployeesByManager() {
  try {
  } catch (error) {
    console.error(error);
  }
}

function viewEmployeesByDepartment() {
  try {
  } catch (error) {
    console.error(error);
  }
}

//working
async function deleteDepartment() {
  try {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "departmentdelete",
          message: "Select the department you wish to delete.",
          choices: await displayDepartments(),
        },
      ])
      .then((response) => {
        db.query(
          `DELETE FROM department WHERE name='${response.departmentdelete}'`
        );
      });
  } catch (error) {
    console.error(error);
  }
}

function deleteRole() {
  try {
  } catch (error) {
    console.error(error);
  }
}

function deleteEmployee() {
  try {
  } catch (error) {
    console.error(error);
  }
}

function viewBudget() {
  try {
  } catch (error) {
    console.error(error);
  }
}

//helper functions
async function displayRoles() {
  try {
    //count the number of departments
    const roleList = `SELECT id, title, department_id, is_manager FROM role`;
    const roleListQuery = await db.query(roleList);

    const roleListResults = roleListQuery[0].map((employee) => ({
      name: employee.title,
    }));
    return roleListResults;
  } catch (error) {
    console.error(error);
  }
}

function displayEmployees() {
  try {
  } catch (error) {
    console.error(error);
  }
}

function displayManagers() {
  try {
  } catch (error) {
    console.error(error);
  }
}

//working
async function displayDepartments() {
  try {
    const deptListQuery = `SELECT id, name from department`;
    const deptList = await db.query(deptListQuery);
    const deptListResults = deptList[0];
    let listDept = [];
    for (let dl = 0; dl < deptListResults.length; dl++) {
      listDept.push(deptListResults[dl].name);
    }
    return listDept;
  } catch (error) {
    console.error(error);
  }
}

questionList();
