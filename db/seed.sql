-- DEPARTMENT SEEDS -----

INSERT INTO department (name)
VALUE ("Admin");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Marketing");



-- ROLE SEEDS -------
INSERT INTO role (id, title, salary, department_id)
Values(0011, "CEO", 200000, 1)
INSERT INTO role (id, title, salary, department_id)
VALUE (0021, "Senior Engineer", 150000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUE (0031, "Accountant", 120000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUE (0012, "Admin Assistant", 120000, 1);
INSERT INTO role (id title, salary, department_id)
VALUE (0032, "Salesperson", 80000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUE (0022, "Software Engineer", 110000, 2);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("James", "Brian", 1, 0011);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jennifer", "Tompson", null, 0012);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tamrat", "Worede", 1, 0021);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Justin", "Jeffery", 2, 0022);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Alicia", "Everett", null, 0031);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ted","Kalubiski", null, 0032);




