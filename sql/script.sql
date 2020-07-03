CREATE DATABASE IF NOT EXISTS conta;
USE conta;

CREATE TABLE transactions (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(50) NOT NULL,
    tipo varchar(50) NOT NULL,
    valor float NOT NULL,
    dia DATE NOT NULL,
    token varchar(100) NOT NULL,
    PRIMARY KEY (id)
);