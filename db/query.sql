
SELECT  department_name, 
        department_id 
FROM department 
LEFT JOIN job_roles 
        ON department.id = job_roles.department_id
;

SELECT  title, 
        job_roles.id, 
        department_name, 
        salary 
FROM job_roles 
LEFT JOIN department 
        ON department.id = job_roles.department_id
;

SELECT  employee.first_name, 
        employee.last_name, 
        job_roles.title, 
        department.department_name, 
        job_roles.salary, 
        manager.last_name AS manager 
FROM employee
LEFT JOIN job_roles 
        ON employee.employee_role_id = job_roles.id
LEFT JOIN department 
        ON job_roles.department_id = department.id
LEFT JOIN employee manager 
        ON employee.manager_id = manager.id
;
