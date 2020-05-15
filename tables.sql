DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (10, 10),
  department_id INT (10),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT (10),
  manager VARCHAR (30),
  manager_id INT (10),
  PRIMARY KEY (id)
);

/*DUMMY DATA FOR TESTING PURPOSES*/
USE employeesDB;

INSERT INTO department (name)
VALUES ("marketing");

INSERT INTO department (name)
VALUES ("legal");

INSERT INTO department (name)
VALUES ("finance");


USE employeesDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amelia", "Goodson", 11, 14);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Isabelle", "Goodson", 12, 65);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lauren", "OReilly", 13, 54);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Jones", 14, 12); 

SELECT * from employee;

USE employeesDB;

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000.00, 14);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 95000.00, 13);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 85000.00, 16);

SELECT * FROM employeesdb.role;