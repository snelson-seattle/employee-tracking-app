DROP DATABASE IF EXISTS crm_DB;

CREATE DATABASE crm_DB;

USE crm_DB;

CREATE TABLE department {
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
};

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary  DECIMAL(10,2) NULL,
    department_id FOREIGN KEY,
    PRIMARY KEY (id) 
);
 


CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT FOREIGN KEY,
    manager_id INT FOREIGN KEY,
    PRIMARY KEY (id)
);