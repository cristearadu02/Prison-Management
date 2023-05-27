create database projectweb;
use projectweb;

CREATE TABLE Vizitatori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(255),
  prenume VARCHAR(255),
  cnp VARCHAR(15) unique,
  parola VARCHAR(255),
  email VARCHAR(255) unique,
  numar_telefon VARCHAR(20),
  data_nasterii DATE,
  cetatenie VARCHAR(255),
  intrebare_securitate VARCHAR(255),
  raspuns_intrebare_securitate VARCHAR(255)
);

CREATE TABLE Detinuti (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(255),
  prenume VARCHAR(255),
  cnp VARCHAR(15) unique,
  motivul_detinerii TEXT,
  gradul INT
);

-- Crearea tabelului Vizite
CREATE TABLE Vizite (
  id INT AUTO_INCREMENT PRIMARY KEY,vizitatori
  id_vizitator INT,
  id_detinut INT,
  motiv_vizita TEXT,
  dataa DATE,
  FOREIGN KEY (id_vizitator) REFERENCES Vizitatori(id),
  FOREIGN KEY (id_detinut) REFERENCES Detinuti(id)
);