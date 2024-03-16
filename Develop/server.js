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
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewAllRoles().then(() => {
            questionList();
          });
          break;

        case "Add Role":
          addRole();
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

        case "View Employees by Manager":
          viewEmployeesByManager();
          break;

        case "View Employees by Department":
          viewEmployeesByDepartment();
          break;

        case "Delete a Department":
          deleteDepartment().then(() => {
            questionList();
          });
          break;

        case "Delete a Role":
          deleteRole().then(() => {
            questionList();
          });
          break;

        case "Delete an Employee":
          deleteEmployee().then(() => {
            questionList();
          });
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

async function addEmployee() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the first name of the employee.",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the last name of the employee.",
        },
        {
          type: "list",
          name: "newRole",
          message: "What is the employee's role?",
          choices: await displayRoles(),
        },
        {
          type: "list",
          name: "newManager",
          message: "Who is the employee's manager?",
          choices: await displayManagers(),
        },
      ])
      .then((response) => {
        addEmployee2(response);
      });
  } catch (error) {
    console.error(error);
  }
}

async function addEmployee2(response) {
  try {
    const newRoleQuery = `SELECT id FROM role WHERE title='${response.newRole}'`;
    const newEmpRoleId = await db.query(newRoleQuery);
    const manId = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)='${response.newManager}'`;
    const newManId = await db.query(manId);
    const insertEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const empParams = [
      response.first_name,
      response.last_name,
      newEmpRoleId[0][0].id,
      newManId[0][0].id,
    ];
    await db.query(insertEmp, empParams, (err, result) => {
      console.log(
        `You have added ${response.first_name} ${response.last_name} to the database.`
      );
    });
    questionList();
  } catch (error) {
    console.error(error);
  }
}

async function updateEmployeeRole() {
  try {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Select an employee to update.",
          choices: await displayEmployees(),
        },
        {
          type: "list",
          name: "newRole",
          message: "Select a new role for this employee.",
          choices: await displayRoles(),
        },
      ])
      .then((response) => {
        updateEmployeeRole2(response);
      });
  } catch (error) {
    console.error(error);
  }
}

async function updateEmployeeRole2(response) {
  try {
    const roleId = await db.query(
      `SELECT id FROM role WHERE title='${response.newRole}'`
    );
    await db.query(
      `UPDATE employee SET role_id = "${roleId[0][0].id}" WHERE CONCAT(first_name, ' ', last_name)='${response.employee}'`
    );
    questionList();
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

async function addRole() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "Enter the title of the role you wish to add.",
        },
        {
          type: "input",
          name: "newSalary",
          message: "Enter the salary for this role",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does this role belong to?",
          choices: await displayDepartments(),
        },
        {
          type: "list",
          name: "isManager",
          message: "Will this role be a manager?",
          choices: ["yes", "no"],
        },
      ])
      .then((response) => {
        let isItManager = 0;
        if (response.isManager === "yes") {
          isItManager = 1;
        }
        addRole2(response, isItManager);
      });
  } catch (error) {
    console.error(error);
  }
}

async function addRole2(response, isItManager) {
  try {
    const depNameQuery = `SELECT id FROM department WHERE name='${response.department}'`;
    const depName = await db.query(depNameQuery);

    const insertRoleQuery = `INSERT INTO role (title, salary, department_id, is_manager) VALUES (?,?,?,?)`;
    const insertRoleParams = [
      response.newRole,
      parseInt(response.newSalary),
      depName[0][0].id,
      isItManager,
    ];
    await db.query(insertRoleQuery, insertRoleParams, (err, result) => {
      console.log(`You have added ${response.newRole} to the database.`);
    });
    questionList();
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

async function viewEmployeesByManager() {
  try {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "viewManager",
          message: "Select a Manager",
          choices: await displayManagers(),
        },
      ])
      .then((response) => {
        viewEmployeesByManager2(response);
      });
  } catch (error) {
    console.error(error);
  }
}

async function viewEmployeesByManager2(response) {
  try {
    const manID = await db.query(
      `SELECT id from employee WHERE CONCAT(first_name, ' ', last_name)='${response.viewManager}'`
    );
    const managerList = await db.query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE manager_id=${manID[0][0].id}`
    );
    if (managerList[0].length === 0) {
      console.log(`\n\n${response.viewManager} has no active employees\n`);
    } else {
      console.table(managerList[0]);
    }
    questionList();
  } catch (error) {
    console.error(error);
  }
}

async function viewEmployeesByDepartment() {
  try {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "viewDepartment",
          message: "Select a Department",
          choices: await displayDepartments(),
        },
      ])
      .then((response) => {
        viewEmployeesByDepartment2(response);
      });
  } catch (error) {
    console.error(error);
  }
}

async function viewEmployeesByDepartment2(response) {
  try {
    const getDep = await db.query(
      `SELECT id from department WHERE name='${response.viewDepartment}'`
    );
    const depNum = getDep[0][0].id;
    const depQuery = await db.query(
      `SELECT employee.id, first_name, last_name, title, salary, department.name AS department, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id WHERE department.id='${depNum}';`
    );
    console.table(depQuery[0]);
    questionList();
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

async function deleteRole() {
  try {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "roledelete",
          message: "Select the role you wish to delete.",
          choices: await displayRoles(),
        },
      ])
      .then((response) => {
        db.query(`DELETE FROM role WHERE title='${response.roledelete}'`);
      });
  } catch (error) {
    console.error(error);
  }
}

//working
async function deleteEmployee() {
  try {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "deleteEmployee",
          message: "Select the employee you would like to delete.",
          choices: await displayEmployees(),
        },
      ])
      .then((response) => {
        db.query(
          `DELETE FROM employee WHERE CONCAT(first_name, ' ', last_name)='${response.deleteEmployee}'`
        );
      });
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
    const roleList = `SELECT id, title, department_id, is_manager FROM role`;
    const roleListQuery = await db.query(roleList);
    const roleListResults = roleListQuery[0];
    let roles = [];
    for (let rl = 0; rl < roleListResults.length; rl++) {
      roles.push(roleListResults[rl].title);
    }
    return roles;
  } catch (error) {
    console.error(error);
  }
}

async function displayEmployees() {
  try {
    const empListQuery = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee`;
    const empList = await db.query(empListQuery);
    const empListResults = empList[0];
    let employees = [];
    for (let el = 0; el < empListResults.length; el++) {
      employees.push(empListResults[el].name);
    }
    return employees;
  } catch (error) {
    console.error(error);
  }
}

async function displayManagers() {
  try {
    const managerList = `SELECT role.id, CONCAT(first_name, ' ', last_name) AS name FROM employee LEFT JOIN role ON employee.role_id=role.id WHERE role.is_manager=1`;
    const managerListQuery = await db.query(managerList);
    const managerListResults = managerListQuery[0];
    let managers = [];
    for (let ml = 0; ml < managerListResults.length; ml++) {
      managers.push(managerListResults[ml].name);
    }
    return managers;
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
