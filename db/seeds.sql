INSERT INTO department (name)
     VALUES ("Administration"),/*1*/
            ("Maintenance"),/*2*/
            ("Technology"),/*3*/
            ("Transportation"),/*4*/
            ("Food Services"),/*5*/
            ("Special Services"),/*6*/
            ("General Education"),/*7*/
            ("Business Office");/*8*/

INSERT INTO role (department_id, title, salary, is_manager)
    VALUES (1, "Superintendent", 150000, 1),/*101*/
           (1, "Principal", 120000, 1),/*102*/
           (1, "Assisstant Principal", 110000),/*103*/
           (2, "Maintenance Supervisor", 60000, 1),/*104*/
           (2, "General Maintenance", 45000),/*105*/
           (2, "Custodian", 35000),/*106*/
           (3, "Technology Supervisor", 100000, 1),/*107*/
           (3, "IT", 90000),/*108*/
           (4, "Bus Supervisor", 55000, 1),/*109*/
           (4, "Bus Driver", 40000),/*110*/
           (5, "Kitchen Supervisor", 60000, 1),/*111*/
           (5, "Cook", 35000),/*112*/
           (6, "Special Services Coordinator", 100000, 1),/*113*/
           (6, "Gifted Teacher", 60000),/*114*/
           (6, "Resource Teacher", 60000),/*115*/
           (6, "Paraprofessional", 35000),/*116*/
           (7, "Teacher", 60000),/*117*/
           (8, "Business Supervisor", 60000),/*118*/
           (8, "Payroll", 55000),/*119*/
           (8, "Human Resources", 55000),/*120*/
           (8, "Secretary", 50000);/*121*/

INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES ("Jim", "Glenn", 101, null),/*1001*/
           ("Nick", "Golden", 102, 1001),/*1002*/
           ("Lacy", "Wakefield", 103, 1001),/*1003*/
           ("Lori", "Whitaker", 103, 1001),/*1004*/
           ("Missy", "Nix", 102, 1001),/*1005*/
           ("Sheila", "Robertson", 111, 1001),/*1006*/
           ("Sarah", "Carter", 118, 1001),/*1007*/
           ("Denver", "Dickey", 104, 1001),/*1008*/
           ("Les", "Dysart", 109, 1001),/*1009*/
           ("Shawna", "Tyrrell", 113, 1001),/*1010*/
           ("Courtney", "Hook", 117, 1002),/*1011*/
           ("Kristy", "Lindsey",17, 1002),/*1012*/
           ("Marlie", "Sheppard", 117, 1002),/*1013*/
           ("Laura", "Wood", 117, 1002),/*1014*/
           ("Violet", "Brawley", 117, 1002),/*1015*/
           ("Kristen", "Williams", 117, 1002),/*1016*/
           ("Kelly", "Watson", 117, 1002),/*1017*/
           ("Tori", "Keith", 117, 1003),/*1018*/
           ("Alison", "Hayes", 117, 1003),/*1019*/
           ("Bayley", "Hawkins", 117, 1003),/*1020*/
           ("Megan", "Allen", 117, 1003),/*1021*/
           ("Jamie", "Mitchell", 117, 1003),/*1022*/
           ("Lacie", "Madden", 117, 1003),/*1023*/
           ("Nina", "Maloney", 112, 1006),/*1024*/
           ("Wendy", "Guzman", 112, 1006),/*1025*/
           ("Teresa", "Jones", 112, 1006),/*1026*/
           ("Terrye", "Loughridge", 121, 1007),/*1027*/
           ("Sam", "Fry", 121, 1007),/*1028*/
           ("Crystal", "Offill", 105, 1008),/*1029*/
           ("Shannon", "Thompson", 106, 1008),/*1030*/
           ("Greg", "Moore", 109, 1009),/*1031*/
           ("Scott", "Dobson", 110, 1009),/*1032*/
           ("Rodney", "Hook", 110, 1009),/*1033*/
           ("Sabrina", "Davis", 115, 1010),/*1034*/
           ("Kristen", "Dethrow", 114, 1010),/*1035*/
           ("Toni", "Cable", 115, 1010),/*1036*/
           ("Bobbi", "Dowden", 119, 1001),/*1037*/
           ("Teresa", "Lindsay", 120, 1002),/*1038*/
           ("Jasmine", "Hubble", 116, 1010),/*1039*/
           ("Cheryl", "Mosby", 116, 1010),/*1040*/
           ("Ethan", "Nelson", 107, 1001),/*1041*/
           ("Jason", "Boatman", 108, 1041)/*1042*/

