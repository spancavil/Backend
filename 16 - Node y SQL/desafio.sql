-- 1 y 2 )
CREATE DATABASE mydb CHARACTER SET utf8;

CREATE TABLE prueba (
    id int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    categoria varchar(255) NOT NULL,
    stock  int unsigned,
    PRIMARY KEY (id)
);

-- 3)

INSERT INTO prueba (nombre, categoria, stock) VALUES ("Fideos", "Harina", 20);
INSERT INTO prueba (nombre, categoria, stock) VALUES ("Leche", "Lácteos", 30);
INSERT INTO prueba (nombre, categoria, stock) VALUES ("Crema", "Lácteos", 15);

-- 4) 
SELECT * from prueba;

-- 5)
DELETE FROM prueba WHERE id = 1;

-- 6)
UPDATE prueba SET stock = 45 WHERE id = 2;

--7) 
SELECT * from prueba;
