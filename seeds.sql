-- Database --
USE employee_trackerDB;

-- Insert Rows into department table -- 
INSERT INTO department (name)
    VALUES 
        ("Human Resources"), 
        ("Sales"), 
        ("Marketing"), 
        ("Management");

-- Insert Rows into roles table -- 
INSERT INTO roles ( title, salary, department_id)
    VALUES 
        ("Human Resources Representative", 65000, 1), 
        ("Salesperson", 30000, 2), 
        ("Social Media Marketer", 50000, 3), 
        ("Assistant Manager", 70000, 4),
        ("General Manager", 90000, 4),
        ("Digital Marketing Manager", 85000, 4),
        ("Senior Human Resources Manager", 120000, 4),
        ("Sales Manager", 80000, 4);

-- Insert Rows into employee table -- 
INSERT INTO employee ( first_name, last_name, roles_id, manager_id)
    VALUES 
        ("Fox", "Maulder", 1, 7),
        ("Dana", "Scully", 8, null), 
        ("Jean-Luc", "Picard", 5, null),
        ("William", "Riker", 4, 5),
        ("Luke", "Skywalker", 2, 8),
        ("Han", "Solo", 3, 8),
        ("Thomas", "Anderson", 6, null),
        ("Agent", "Smith", 7, null);
     



