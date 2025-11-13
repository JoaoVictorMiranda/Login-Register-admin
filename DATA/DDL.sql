create database registros;

use registros;

CREATE TABLE administradores(
    id int primary key auto_increment,
    nome varchar(200),
    email varchar(255) UNIQUE,
    senha varchar(255),
    criado_em datetime
);


create table usuarios(
    id int primary key auto_increment,
    nome varchar(200),
    email varchar(255) UNIQUE,
    senha varchar(255),
    criado_em datetime
);


create table post_usuario(
    id int primary key auto_increment,
    id_usuario int,
    comentario varchar(255),
    criado_em datetime,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


create table anuncio_admin(
    id int primary key auto_increment,
    id_admin int,
    comentario varchar(255),
    criado_em datetime,
    FOREIGN KEY (id_admin) REFERENCES administradores(id)
);