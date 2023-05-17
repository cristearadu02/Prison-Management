create database projectWEB;
use projectWEB;

-- Crearea tabelului Vizitatori
CREATE TABLE Vizitatori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(255),
  prenume VARCHAR(255),
  cnp VARCHAR(13),
  parola VARCHAR(255),
  email VARCHAR(255)
);

-- Crearea tabelului Detinuti
CREATE TABLE Detinuti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(255),
  prenume VARCHAR(255),
  cnp VARCHAR(13),
  motivul_detinerii TEXT,
  gradul INT
);

-- Crearea tabelului Vizite
CREATE TABLE Vizite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_vizitator INT,
  id_detinut INT,
  motiv_vizita TEXT,
  dataa DATE,
  FOREIGN KEY (id_vizitator) REFERENCES Vizitatori(id),
  FOREIGN KEY (id_detinut) REFERENCES Detinuti(id)
);