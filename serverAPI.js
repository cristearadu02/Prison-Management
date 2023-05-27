const http = require('http');
const mysql = require('mysql');
const url = require('url');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'projectweb',
});

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/api/getInfoByID') {
    // Extract the user ID from the query parameter
    const userId = parsedUrl.query.id;

    // Create a MySQL query
    const query = `SELECT nume, prenume, cnp, numar_telefon, email FROM vizitatori WHERE id = ${userId}`;

    // Execute the query
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        if (results.length === 0) {
          res.statusCode = 404;
          res.end('User not found');
        } else {
          const user = results[0];
          const userData = {
            nume: user.nume,
            prenume: user.prenume,
            cnp: user.cnp,
            email: user.email,
            telefon: user.numar_telefon,
          };

          // Set CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(userData));
        }
      }
    });
  } else if (parsedUrl.pathname === '/api/getVisitsByIDVizitator') {
    // Extract the visitor ID from the query parameter
    const visitorId = parsedUrl.query.id;

    // Create a MySQL query to join the visits, detainees, and visitors tables
    const query = `
      SELECT v.motiv_vizita, v.dataa, d.nume AS detainee_name, vi.nume AS visitor_name
      FROM vizite v
      INNER JOIN detinuti d ON v.id_detinut = d.id
      INNER JOIN vizitatori vi ON v.id_vizitator = vi.id
      WHERE v.id_vizitator = ${visitorId}
    `;

    // Execute the query
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.end(JSON.stringify(results));
      }
    });
  }else if (parsedUrl.pathname === '/api/updateUserInfo') {
    // Handle POST request to update user info
    if (req.method === 'POST') {
      const userId = parsedUrl.query.id;
      const email = parsedUrl.query.email;
      const phone = parsedUrl.query.phone;

      // Create a MySQL query to update the user info
      const query = `UPDATE vizitatori SET email = '${email}', telefon = '${phone}' WHERE id = ${userId}`;

      // Execute the query
      pool.query(query, (error, results) => {
        if (error) {
          console.error('Error executing query: ', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'User info updated successfully' }));
        }
      });
    } else {
      res.statusCode = 400;
      res.end('Bad Request');
    }
  }
  else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

// Start the server
const port = 3000; // Change this to your desired port number
server.listen(port, () => {
  console.log(`ServerAPI listening on port ${port}`);
});
