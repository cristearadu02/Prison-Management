
USE projectweb;

-- Popularea tabelului Vizitatori
INSERT INTO Vizitatori (nume, prenume, cnp, parola, email, numar_telefon, data_nasterii, cetatenie, intrebare_securitate, raspuns_intrebare_securitate, role)
VALUES
  ('Popescu', 'Ion', '12345678901234', 'parola1', 'popescu.ion@example.com', '1234567890', '1990-01-01', 'Romanian', 'Care este numele mamei tale?', 'Mama', 'admin'),
  ('Ionescu', 'Maria', '98765432109876', 'parola2', 'maria.ionescu@example.com', '0987654321', '1995-05-10', 'Romanian', 'Care este numele primului tau animal de companie?', 'Rex', 'user'),
  ('Dumitrescu', 'Andrei', '45678901234567', 'parola3', 'andrei.dumitrescu@example.com', '5555555555', '1985-12-15', 'Romanian', 'Care este filmul tau preferat?', 'Inception', 'user'),
  ('Mihai', 'Ana', '98765432101234', 'parola4', 'ana.mihai@example.com', '7777777777', '1992-06-20', 'Romanian', 'Care este numele primului tau profesor?', 'Popescu', 'user'),
  ('Popa', 'Alexandru', '12345678909876', 'parola5', 'alexandru.popa@example.com', '9999999999', '1988-03-25', 'Romanian', 'Care este culoarea ta preferata?', 'Albastru', 'user'),
  ('Stancu', 'Elena', '23456789098765', 'parola6', 'elena.stancu@example.com', '2222222222', '1980-09-08', 'Romanian', 'Care este destinatia ta de vacanta preferata?', 'Bali', 'user'),
  ('Radu', 'Adrian', '98765432123456', 'parola7', 'adrian.radu@example.com', '3333333333', '1982-07-12', 'Romanian', 'Care este numele primului tau coleg de clasa?', 'Marius', 'user'),
  ('Constantin', 'Mirela', '34567890123456', 'parola8', 'mirela.constantin@example.com', '4444444444', '1998-11-03', 'Romanian', 'Care este numele orasului in care te-ai nascut?', 'Bucuresti', 'user');

-- Popularea tabelului Detinuti
INSERT INTO Detinuti (nume, prenume, cnp, motivul_detinerii, gradul)
VALUES
  ('Popescu', 'Mihai', '11111111111111', 'Furt', 2),
  ('Ionescu', 'Gabriel', '22222222222222', 'Omucidere', 4),
  ('Dumitru', 'Andrei', '33333333333333', 'Trafic de droguri', 3),
  ('Popa', 'Maria', '44444444444444', 'Furt', 1),
  ('Georgescu', 'Cristian', '55555555555555', 'Viol', 2),
  ('Stanescu', 'Alexandru', '66666666666666', 'Trafic de persoane', 4),
  ('Radu', 'Elena', '77777777777777', 'Furt', 1),
  ('Constantinescu', 'Marius', '88888888888888', 'Frauda', 3);

-- Popularea tabelului Vizite
INSERT INTO vizite (nume, prenume, cnp, nume_detinut, prenume_detinut, relatia, natura_vizitei, data_vizitei, obiecte_de_livrat, nume_martor, prenume_martor, relatia_detinut_martor)
VALUES
  ('John', 'Doe', '1234567890123', 'Detainee1', 'Detainee1 Lastname', 'Family', 'Personal', '2023-05-01', 'Gifts', NULL, NULL, NULL),
  ('Jane', 'Smith', '2345678901234', 'Detainee2', 'Detainee2 Lastname', 'Friend', 'Professional', '2023-05-02', 'Letters', 'Maria', NULL, NULL),
  ('Alex', 'Johnson', '3456789012345', 'Detainee3', 'Detainee3 Lastname', 'Lawyer', 'Legal', '2023-05-03', 'Documents', 'Alexandru', NULL, NULL),
  ('Mary', 'Williams', '4567890123456', 'Detainee4', 'Detainee4 Lastname', 'Mother', 'Personal', '2023-05-04', 'Food', NULL, NULL, NULL),
  ('Michael', 'Davis', '5678901234567', 'Detainee5', 'Detainee5 Lastname', 'Friend', 'Personal', '2023-05-05', 'Flowers', 'Mihai', NULL, NULL),
  ('Gabriel', 'Brown', '6789012345678', 'Detainee6', 'Detainee6 Lastname', 'Lawyer', 'Legal', '2023-05-06', 'Contracts', 'Gabriel', NULL, NULL),
  ('Sophia', 'Wilson', '7890123456789', 'Detainee7', 'Detainee7 Lastname', 'Sister', 'Personal', '2023-05-07', 'Clothing', NULL, NULL, NULL),
  ('Emma', 'Taylor', '8901234567890', 'Detainee8', 'Detainee8 Lastname', 'Friend', 'Personal', '2023-05-08', 'Toys', 'Elena', NULL, NULL);
