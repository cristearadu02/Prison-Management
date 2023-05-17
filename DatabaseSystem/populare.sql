-- Inserare înregistrări în tabelul Vizitatori
INSERT INTO Vizitatori (nume, prenume, cnp, parola, email) VALUES
('Popescu', 'Ion', '1234567890123', 'parola1', 'ion.popescu@example.com'),
('Ionescu', 'Maria', '2345678901234', 'parola2', 'maria.ionescu@example.com'),
('Georgescu', 'Mihai', '3456789012345', 'parola3', 'mihai.georgescu@example.com'),
('Dumitrescu', 'Ana', '4567890123456', 'parola4', 'ana.dumitrescu@example.com'),
('Radu', 'Alexandru', '5678901234567', 'parola5', 'alexandru.radu@example.com');

-- Inserare înregistrări în tabelul Detinuti
INSERT INTO Detinuti (nume, prenume, cnp, motivul_detinerii, gradul) VALUES
('Popa', 'Gheorghe', '6789012345678', 'Furt', 2),
('Munteanu', 'Elena', '7890123456789', 'Omucidere', 4),
('Stanescu', 'Adrian', '8901234567890', 'Trafic de droguri', 3),
('Constantinescu', 'Andrei', '9012345678901', 'Furt calificat', 2),
('Iordache', 'Cristina', '0123456789012', 'Fraudă', 1);

-- Inserare înregistrări în tabelul Vizite
INSERT INTO Vizite (id_vizitator, id_detinut, motiv_vizita, dataa) VALUES
(1, 1, 'Vizită familială', '2023-01-01'),
(2, 1, 'Vizită prieteni', '2023-02-15'),
(3, 2, 'Vizită avocat', '2023-03-10'),
(4, 3, 'Vizită consilier religios', '2023-04-05'),
(5, 4, 'Vizită prieten', '2023-05-01');
