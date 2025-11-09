create database registros;

use registros;

CREATE TABLE ADMIN(
    id int primary key auto_increment,
    nome varchar(200),
    email varchar(255),
    senha varchar(255),
    nascimento date,
    criado_em datetime,
    isadmin boolean
);


create table usuarios(
    id int primary key auto_increment,
    nome varchar(200),
    email varchar(255),
    senha varchar(255),
    nascimento date,
    criado_em datetime
);

