create database projectweb;
use projectweb;


-- Crearea tabelului Vizite
CREATE TABLE vizite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(50) NOT NULL,
  prenume VARCHAR(50) NOT NULL,
  cnp VARCHAR(13) NOT NULL,
  nume_detinut VARCHAR(50) NOT NULL,
  prenume_detinut VARCHAR(50) NOT NULL,
  relatia VARCHAR(50) NOT NULL,
  natura_vizitei VARCHAR(50) NOT NULL,
  data_vizitei DATE NOT NULL,
  obiecte_de_livrat TEXT,
  nume_martor VARCHAR(50),
  prenume_martor VARCHAR(50),
  relatia_detinut_martor VARCHAR(50)
);
Alter TABLE vizite
ADD status VARCHAR(255) DEFAULT 'not verified';

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



-- Adaugarea campului 'role' in tabela 'Vizitatori'
ALTER TABLE Vizitatori
ADD role VARCHAR(255) DEFAULT 'user';



