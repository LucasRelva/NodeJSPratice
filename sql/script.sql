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
    /*REFERENCES nome (usuario)*/
);

/*CREATE TABLE   usuario (
    nome varchar(50),
    CONSTRAINT nome PRIMARY KEY (nome)

)
/* modela de criação da tabela para o banco de dados */