USE crm_DB;

INSERT INTO departments(dept_name) VALUES ("Sales");
INSERT INTO roles (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("no", "manager", NULL, NULL)