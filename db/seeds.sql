INSERT INTO department (id, department_name)
VALUES  (1, 'Engineering'),
         (2, 'Sales'),
         (3, 'Lead Engineer'),
         (4, 'Legal');

         INSERT INTO employee_role (id, title, salary, department_id)
         VALUES (1, 'Accountant', 125000, 1),
                (2, 'Software Engineer', 120000, 4),
                (3, 'Lead Engineer', 150000, 3),
                (4, 'Salesperson', 80000, 2),
                (5, 'Lawyer', 190000, 5),
                (6, 'Sales Lead', 100000, 2),
                (7, 'Legal Team Lead', 250000, 4);


       INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
       VALUES ( 1, 'Serg', 'Dela', 1, null),
              (2, 'victor', 'Vaughn', 2, 4);         