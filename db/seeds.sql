INSERT INTO department (department_name)
VALUES ("Sales"),
       ("HR"),
       ("Marketing"),
       ("Finance"),
       ("Engineer");

SELECT * FROM department;

INSERT INTO job_roles (title, salary, department_id)
VALUES ('Recruiter', 80000, 2),
       ('SW Engineer', 180000, 5),
       ('Actuary', 250000, 4),
       ('Sales Rep', 150000, 1),
       ('Project Manager', 160000, 3);

SELECT * FROM job_roles;

INSERT INTO employee (first_name, last_name, employee_role_id, manager_id)
VALUES ('Harry', 'Potter', 1, 3),
       ('Hermione', 'Granger', 2, 3),
       ('Rubeus', 'Hagrid', 3, NULL),
       ('Ron', 'Weasley', 4, 3),
       ('Draco', 'Malfoy', 5, 3);

SELECT * FROM employee;