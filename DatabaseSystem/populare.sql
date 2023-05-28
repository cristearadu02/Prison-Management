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
INSERT INTO Vizite (id_vizitator, id_detinut, motiv_vizita, dataa, relatia, natura, obiecte_aduse, martori)
VALUES
  (1, 1, 'Vizita de familie', '2023-05-01', 'frate', 'personal', 'cadouri', NULL),
  (2, 2, 'Vizita de prietenie', '2023-05-02', 'prieten', 'profesional', 'scrisori', 'Maria'),
  (3, 3, 'Vizita avocatiala', '2023-05-03', 'avocat', 'legal', 'documente', 'Alexandru'),
  (4, 4, 'Vizita de familie', '2023-05-04', 'mama', 'personal', 'alimente', NULL),
  (5, 5, 'Vizita de prietenie', '2023-05-05', 'prieten', 'personal', 'flori', 'Mihai'),
  (6, 6, 'Vizita avocatiala', '2023-05-06', 'avocat', 'legal', 'contracte', 'Gabriel'),
  (7, 7, 'Vizita de familie', '2023-05-07', 'sora', 'personal', 'haine', NULL),
  (8, 8, 'Vizita de prietenie', '2023-05-08', 'prieten', 'personal', 'jucarii', 'Elena');
