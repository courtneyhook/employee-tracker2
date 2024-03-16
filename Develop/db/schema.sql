DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id      INT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(30)  /*to hold department name*/
);

CREATE TABLE role (
    id               INT PRIMARY KEY AUTO_INCREMENT,
    title            VARCHAR(30),  /*to hold role title*/
    salary           DECIMAL, /*to hold role salary*/
    department_id    INT, /*to hold reference to department the role belongs to*/
    is_manager       BOOLEAN,

    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    first_name      VARCHAR(30),  /*to hold employee first name*/
    last_name       VARCHAR(30), /*to hold employee last name*/
    role_id         INT,  /*to hold reference to employee role*/
    manager_id      INT, /*to hold reference to another employee that is the manager of the current employee ...NULL if the employee has no manager*/

    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);

ALTER TABLE role AUTO_INCREMENT = 101;
ALTER TABLE employee AUTO_INCREMENT = 1001;