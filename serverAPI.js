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
    const query = `SELECT nume, prenume, cnp, numar_telefon, email, role FROM vizitatori WHERE id = ${userId}`;

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
            rol: user.role,
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
      SELECT v.motiv_vizita, v.dataa, d.nume AS detainee_name, vi.nume AS visitor_name,
      v.relatia, v.natura, v.obiecte_aduse, v.martori
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
        res.end(JSON.stringify(results));
      }
    });
  }
else if (parsedUrl.pathname === '/api/updateUserInfo') {
    // Handle POST request to update user info
    if (req.method === 'POST') {
      const userId = parsedUrl.query.id;
      const email = parsedUrl.query.email;
      const phone = parsedUrl.query.phone;

      // Create a MySQL query to update the user info
      const query = `UPDATE vizitatori SET email = '${email}', numar_telefon = '${phone}' WHERE id = ${userId}`;

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
  }else if(parsedUrl.pathname === '/api/getVisitsAsAdmin'){
    // get all the data from table vizite order by date desc
    const query = `SELECT v.motiv_vizita, v.dataa, d.nume AS detainee_name, vi.nume AS visitor_name,
                    v.relatia, v.natura, v.obiecte_aduse, v.martori
                    FROM vizite v
                    INNER JOIN detinuti d ON v.id_detinut = d.id
                    INNER JOIN vizitatori vi ON v.id_vizitator = vi.id
                    ORDER BY v.dataa DESC`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      }
    });               

  }else if(parsedUrl.pathname === '/api/getUsersAsAdmin'){

    const query = `SELECT id,nume,prenume,email,numar_telefon,data_nasterii,cetatenie,role FROM vizitatori ORDER BY role`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      }
    });

  }else if(parsedUrl.pathname === '/api/findUserByCNP'){
    //get the cnp from the query parameter and search for the user with that cnp and return it
    const cnp = parsedUrl.query.cnp;
    const query = `SELECT id,nume,prenume,email,numar_telefon,data_nasterii,cetatenie,role FROM vizitatori WHERE cnp = '${cnp}'`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      }
    });

  }else if(parsedUrl.pathname === '/api/findUserByNumePrenume'){  
    console.log( parsedUrl.query.nume + " " + parsedUrl.query.prenume);
    //get the name and surname from the query parameter and search for the user with that name and surname and return it
    const nume = parsedUrl.query.nume;
    const prenume = parsedUrl.query.prenume;
    const query = `SELECT id,nume,prenume,email,numar_telefon,data_nasterii,cetatenie,role FROM vizitatori WHERE nume = '${nume}' AND prenume = '${prenume}'`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      }
    });
  }else if(parsedUrl.pathname === '/api/findUserByTelefon'){
    // get the phone number from the query parameter and search for the user with that phone number and return it
    const numar_telefon = parsedUrl.query.numar_telefon;
    const query = `SELECT id,nume,prenume,email,numar_telefon,data_nasterii,cetatenie,role FROM vizitatori WHERE numar_telefon = '${numar_telefon}'`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      }
    });
  }else if (parsedUrl.pathname === '/api/deleteUser') {
    //the browser first send with options method to check if the server accept delete method
    //if the server accept delete method then the browser send the delete request
    //so we need to handle the options method
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
    } else if (req.method === 'DELETE') {
      console.log('delete user');
      const userId = parsedUrl.query.id;
      const query = `DELETE FROM vizitatori WHERE id = ${userId}`;
      pool.query(query, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'User deleted successfully' }));
        }
      });
    } else {
      res.statusCode = 400;
      res.end('Bad Request');
    }
  }else if(parsedUrl.pathname === '/api/makeAdmin'){
    if(req.method === 'OPTIONS'){
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'PUT');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
    }else if(req.method === 'PUT'){
      const userId = parsedUrl.query.id;
      const query = `UPDATE vizitatori SET role = 'admin' WHERE id = ${userId}`;
      pool.query(query, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'PUT');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'User is now admin' }));
        }
      });
    }else{
      res.statusCode = 400;
      res.end('Bad Request');
    }
  }else if (parsedUrl.pathname === '/api/changePassword') {
    // Handle POST request to change password
    if (req.method === 'POST') {
      const userId = parsedUrl.query.id;
      const currentPassword = parsedUrl.query.currentPassword;
      const newPassword = parsedUrl.query.newPassword;
  
      // Create a MySQL query to check if the user exists and the current password is correct
      const query = `SELECT * FROM vizitatori WHERE id = ${userId} AND parola = '${currentPassword}'`;
  
      // Execute the query
      pool.query(query, (error, results) => {
        if (error) {
          console.error('Error executing query: ', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        } else {
          if (results.length === 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: 'Invalid current password' }));
          } else {
            // User and current password are valid, update the password
            const updateQuery = `UPDATE vizitatori SET parola = '${newPassword}' WHERE id = ${userId}`;
  
            // Execute the update query
            pool.query(updateQuery, (error, updateResults) => {
              if (error) {
                console.error('Error executing query: ', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
              } else {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'POST');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Password changed successfully' }));
              }
            });
          }
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
