USE projectweb;

-- Populating the Vizitatori table
INSERT INTO Vizitatori (nume, prenume, cnp, parola, email, numar_telefon, data_nasterii, cetatenie, intrebare_securitate, raspuns_intrebare_securitate)
VALUES
  ('John', 'Doe', '1234567890123', 'password1', 'john@example.com', '1234567890', '1990-01-01', 'Romanian', 'Question 1', 'Answer 1'),
  ('Jane', 'Smith', '9876543210987', 'password2', 'jane@example.com', '9876543210', '1995-05-10', 'American', 'Question 2', 'Answer 2'),
  ('Alice', 'Johnson', '4567890123456', 'password3', 'alice@example.com', '4567890123', '1988-07-15', 'British', 'Question 3', 'Answer 3'),
  ('Bob', 'Anderson', '7890123456789', 'password4', 'bob@example.com', '7890123456', '1992-12-25', 'Canadian', 'Question 4', 'Answer 4'),
  ('Eva', 'Brown', '2345678901234', 'password5', 'eva@example.com', '2345678901', '1998-03-20', 'German', 'Question 5', 'Answer 5'),
  ('Michael', 'Wilson', '5678901234567', 'password6', 'michael@example.com', '5678901234', '1993-09-05', 'Australian', 'Question 6', 'Answer 6'),
  ('Sophia', 'Taylor', '8901234567890', 'password7', 'sophia@example.com', '8901234567', '1991-11-30', 'French', 'Question 7', 'Answer 7');

-- Populating the Detinuti table
INSERT INTO Detinuti (nume, prenume, cnp, motivul_detinerii, gradul)
VALUES
  ('Smith', 'John', '1234567890123', 'Theft', 3),
  ('Johnson', 'Michael', '9876543210987', 'Assault', 2),
  ('Brown', 'Sarah', '4567890123456', 'Drug possession', 1),
  ('Davis', 'Emily', '7890123456789', 'Robbery', 4),
  ('Anderson', 'James', '2345678901234', 'Fraud', 3),
  ('Wilson', 'Jessica', '5678901234567', 'Burglary', 2),
  ('Taylor', 'Daniel', '8901234567890', 'Murder', 5);

-- Populating the Vizite table
INSERT INTO Vizite (id_vizitator, id_detinut, motiv_vizita, dataa)
VALUES
  (1, 1, 'Family visit', '2023-01-01'),
  (2, 2, 'Legal consultation', '2023-02-15'),
  (3, 3, 'Friend visit', '2023-03-10'),
  (4, 4, 'Medical check-up', '2023-04-05'),
  (5, 5, 'Family visit', '2023-05-20'),
  (6, 6, 'Legal consultation', '2023-06-25'),
  (7, 7, 'Friend visit', '2023-07-15');
