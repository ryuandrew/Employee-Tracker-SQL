
SELECT  *
FROM department D
;

SELECT  title, 
        J.id, 
        department_name, 
        salary 
FROM job_roles J
LEFT JOIN department D
        ON D.id = J.department_id
;

SELECT  E.first_name, 
        E.last_name, 
        J.title, 
        D.department_name, 
        J.salary, 
        M.last_name AS manager 
FROM employee E
LEFT JOIN job_roles J
        ON E.employee_role_id = J.id
LEFT JOIN department D
        ON J.department_id = D.id
LEFT JOIN employee M 
        ON E.manager_id = M.id
;



-- SELECT  department_name, 
--         department_id 
-- FROM department 
-- LEFT JOIN job_roles 
--         ON department.id = job_roles.department_id
-- ;

-- SELECT  title, 
--         job_roles.id, 
--         department_name, 
--         salary 
-- FROM job_roles 
-- LEFT JOIN department 
--         ON department.id = job_roles.department_id
-- ;

-- SELECT  employee.first_name, 
--         employee.last_name, 
--         job_roles.title, 
--         department.department_name, 
--         job_roles.salary, 
--         manager.last_name AS manager 
-- FROM employee
-- LEFT JOIN job_roles 
--         ON employee.employee_role_id = job_roles.id
-- LEFT JOIN department 
--         ON job_roles.department_id = department.id
-- LEFT JOIN employee manager 
--         ON employee.manager_id = manager.id
-- ;
