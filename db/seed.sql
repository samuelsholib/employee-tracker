-- DEPARTMENT SEEDS -----

INSERT INTO department (name)
VALUE ("Admin");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Marketing");



-- ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
Values("CEO", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Senior Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Admin Assistant", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 110000, 2);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, role_id ,manager_id)
VALUE ("James", "Brian", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jennifer", "Tompson", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tamrat", "Worede", 3, 3);
INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUE ("Justin", "Jeffery", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Alicia", "Everett", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ted","Kalubiski",  6, null);






