DROP DATABASE IF EXISTS crm_DB;

CREATE DATABASE crm_DB;

USE crm_DB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary  DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id) 
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    PRIMARY KEY (id)
);