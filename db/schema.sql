DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;
USE  employeeTracker_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT DEFAULT(10),
  name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES 
  department (id) 
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES
  role (id),
  FOREIGN KEY (manager_id) REFERENCES 
  employee (id) 
);







