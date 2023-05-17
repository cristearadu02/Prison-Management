// ----> ROUTING <----

// - FOR HTTP
const http = require('http');

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3005;


// - FOR SQL
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'projectweb',
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err);
      return;
    }
    console.log('Connected to MySQL database!');
  
    // Insert data into table
    const data = { nume: 'Cristescu', prenume: 'Cristian', cnp:'129056781234', parola: 'password', email: 'john.doe@example.com' };
    const insertSql = 'INSERT INTO vizitatori SET ?';
    connection.query(insertSql, data, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL database: ', err);
        return;
      }
      console.log('Data inserted successfully!');
      console.log('Result: ', result);
    });
  });


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    switch (req.url) {
        case "/":
            res.end("Welcome to my node API!");
            break;
        case "/about":
            res.end("About page");
            break;
        case "/contact":
            res.end("Contact page");
            break;
        default:
            res.end("Page not found");
            break;
    }
   
});

server.listen(port, host, () => { 
    console.log(`Server running at http://${host}:${port}/`);
});

