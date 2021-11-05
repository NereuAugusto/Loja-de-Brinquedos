-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS loja;
CREATE DATABASE IF NOT EXISTS loja DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE loja;

CREATE TABLE produto (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  descricao varchar(100) NOT NULL,
  preco float NOT NULL,
  PRIMARY KEY (id)
);
