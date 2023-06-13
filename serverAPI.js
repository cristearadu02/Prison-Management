const http = require('http');
const mysql = require('mysql');
const url = require('url');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const secretKey = 'goodKey';

const { validateData, findUserByCNP, hashPassword, findUserByID } = require('./utilitary');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'projectweb',
});

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  console.log("Request received!");
  // Preflight request. Reply successfully:
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.end(JSON.stringify({}));
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/api/register' && req.method === 'POST') {
    // Parse the request body (assumes it's JSON)
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      const userInfo = JSON.parse(body);

      validateData(userInfo, pool)
        .then(errors => {
          if (errors.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400; // Bad Request
            res.end(JSON.stringify({ message: 'Validation failed', errors: errors }));
            console.log(...errors);
          } else {
            // create the query to insert the new user
            const query = `
              INSERT INTO vizitatori (
                nume,
                prenume,
                cnp,
                parola,
                email,
                numar_telefon,
                data_nasterii,
                cetatenie,
                intrebare_securitate,
                raspuns_intrebare_securitate,
                role
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user')
            `;
            pool.query(
              query,
              [
                userInfo.nume,
                userInfo.prenume,
                userInfo.cnp,
                hashPassword(userInfo.password),
                userInfo.email,
                userInfo.numar_telefon,
                userInfo.data_nasterii,
                userInfo.cetatenie,
                userInfo.intrebare_securitate,
                userInfo.raspuns_intrebare_securitate,
              ],
              (error, results) => {
                if (error) {
                  console.error('Error executing query: ', error);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ message: 'Internal Server Error!' }));
                } else {
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 201; // Created
                  res.end(JSON.stringify({ message: 'User registered successfully' }));
                }
              }
            );
          }
        })
        .catch(error => {
          console.error('Error during validation:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
        });
    });
  }

  //LOGIN
  else if (req.method === 'POST' && req.url === '/api/login') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { cnp, password } = JSON.parse(body);
      //console.log(cnp,password);

      findUserByCNP(cnp, password, pool)
        .then(userId => {
          if (userId) {
            console.log(userId);
            // User found, generate and send token
            const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ token: `Bearer ${token}` }));
          } else {
            // User not found
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Authentication failed. Invalid credentials.' }));
          }
        })
        .catch(error => {
          // Handle database error
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Internal server error.' }));
        });

    });
  }
  else if (parsedUrl.pathname === '/api/getInfoByID' && req.method === 'GET') {
    // Parse the Cookie header and extract the JWT
    //const cookies = cookie.parse(req.headers.cookie || '');
    const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
    console.log(bearerToken);

    // Remove 'Bearer ' prefix
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    console.log(token);

    // Verify and decode the JWT
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));

      } else {
        // Extract the user ID from the JWT
        const userId = decoded.userId;

        // Create a MySQL query
        const query = `SELECT nume, prenume, cnp, numar_telefon, email, role FROM vizitatori WHERE id = ${userId}`;

        // Execute the query
        pool.query(query, (error, results) => {
          if (error) {
            console.error('Error executing query: ', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Internal server error.' }));
          } else {
            if (results.length === 0) {
              res.statusCode = 404;
              res.end(JSON.stringify({ message: 'User not found' }));
            } else {

              const user = results[0];
              const userData = {
                nume: user.nume,
                prenume: user.prenume,
                cnp: user.cnp,
                email: user.email,
                telefon: user.numar_telefon,
                rol: user.role
              };

              // Set CORS headers
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(userData));
            }
          }
        });
      }
    });
  } else if (parsedUrl.pathname === '/api/getVisitsByIDVizitator') {
    // Extract the visitor CNP from the query parameter
    const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
    console.log(bearerToken);

    // Remove 'Bearer ' prefix
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    console.log(token);

    // Verify and decode the JWT

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));

      } else {

        const visitorID = decoded.userId;
        //this query should take v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor from vizite for a vizitator with a certain id, but in table visits you dont have the id vor vizitator, but his cnp which is in table vizitatori also

        const query = `
        SELECT v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor 
        FROM vizite v 
        INNER JOIN vizitatori vi 
        ON v.cnp = vi.cnp 
        WHERE vi.id = ${visitorID}`;

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
    });
  } else if (parsedUrl.pathname === '/api/updateUserInfo') {
    // Handle POST request to update user info
    if (req.method === 'POST') {

      const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
      console.log(bearerToken);

      // Remove 'Bearer ' prefix
      const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

      console.log(token);

      // Verify and decode the JWT
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error('Failed to verify JWT: ', err);
          res.statusCode = 401;
          res.end(JSON.stringify({ message: 'Unauthorized' }));

        } else {

          const userId = decoded.userId;

          const email = parsedUrl.query.email;
          const phone = parsedUrl.query.phone;

          console.log(email, phone, userId);

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
        }
      });
    }
    else {
      res.statusCode = 400;
      res.end('Bad Request');
    }
  } else if (parsedUrl.pathname === '/api/getVisitsAsAdmin') {

    const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
    console.log(bearerToken);

    // Remove 'Bearer ' prefix
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    console.log(token);

    // Verify and decode the JWT

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));

      } else {


        //this query should take v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor from vizite

        const query = `
        SELECT v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.nume, v.prenume, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor
        FROM vizite v`;

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
      }
    });
  } else if (parsedUrl.pathname === '/api/getUsersAsAdmin') {

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

  } else if (parsedUrl.pathname === '/api/findUserByCNP') {

    const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
    console.log(bearerToken);

    // Remove 'Bearer ' prefix
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    console.log(token);

    // Verify and decode the JWT

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));

      } else {

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
      }
    });

  } else if (parsedUrl.pathname === '/api/findUserByNumePrenume') {
    console.log(parsedUrl.query.nume + " " + parsedUrl.query.prenume);
    //get the name and surname from the query parameter and search for the user with that name and surname and return it
    const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
    console.log(bearerToken);

    // Remove 'Bearer ' prefix
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    console.log(token);

    // Verify and decode the JWT

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));

      } else {
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
      }
    });
  } else if (parsedUrl.pathname === '/api/findUserByTelefon') {

    const bearerToken = req.headers.authorization // replace 'jwt' with the name of your cookie
    console.log(bearerToken);

    // Remove 'Bearer ' prefix
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    console.log(token);

    // Verify and decode the JWT

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));

      } else {
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
      }
    });
  } else if (parsedUrl.pathname === '/api/deleteUser') {
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
      const bearerToken = req.headers.authorization;
      const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;


      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error('Error verifying token:', err);
          res.statusCode = 401;
          res.end(JSON.stringify({ message: 'Unauthorized' }));
        } else {
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
        }
      });
    } else {
      res.statusCode = 400;
      res.end('Bad Request');
    }
  } else if (parsedUrl.pathname === '/api/makeAdmin') {
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'PUT');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
    } else if (req.method === 'PUT') {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error('Failed to verify JWT: ', err);
          res.statusCode = 401;
          res.end(JSON.stringify({ message: 'Unauthorized' }));
        } else {
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
        }
      });
    } else {
      res.statusCode = 400;
      res.end('Bad Request');
    }
  }else if(parsedUrl.pathname ==='/api/findVisitsByVisitorName'){

    const bearerToken = req.headers.authorization;
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));
      } else {
        const nume = parsedUrl.query.nume;
        const prenume = parsedUrl.query.prenume;
        const query = `
        SELECT v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.nume, v.prenume, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor
        FROM vizite v
        WHERE v.nume = '${nume}' and v.prenume = '${prenume}'`;
        pool.query(query, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
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
    });

  }else if(parsedUrl.pathname === '/api/findVisitsByDeteineeName')
  {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));
      } else {
        const nume = parsedUrl.query.nume;
        const prenume = parsedUrl.query.prenume;
        const query = `
        SELECT v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.nume, v.prenume, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor
        FROM vizite v
        WHERE v.nume_detinut = '${nume}' and v.prenume_detinut = '${prenume}'`;
        pool.query(query, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
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
    });

  }else if(parsedUrl.pathname === '/api/findVisitsByDate')
  {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Failed to verify JWT: ', err);
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));
      } else {
        const dataStart = parsedUrl.query.dataStart;
        const dataEnd = parsedUrl.query.dataEnd;
        
        const query = `
        SELECT v.natura_vizitei, v.data_vizitei, v.nume_detinut, v.prenume_detinut, v.nume, v.prenume, v.relatia, v.obiecte_de_livrat, v.nume_martor, v.prenume_martor
        FROM vizite v
        WHERE v.data_vizitei >= '${dataStart}' and v.data_vizitei <= '${dataEnd}'`; 

        pool.query(query, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
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
    });

  }
  else if (parsedUrl.pathname === '/api/changePassword') {
    // Handle POST request to change password
    if (req.method === 'POST') {

      const bearerToken = req.headers.authorization;
      //console.log(bearerToken);

      const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;

      //console.log(token);

      // Verify and decode the JWT

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error('Failed to verify JWT: ', err);
          res.statusCode = 401;
          res.end(JSON.stringify({ message: 'Unauthorized' }));

        } else {

          const userId = decoded.userId;
          const currentPassword = parsedUrl.query.currentPassword;
          const newPassword = hashPassword(parsedUrl.query.newPassword);

          // Create a MySQL query to check if the user exists and the current password is correct

          findUserByID(userId, currentPassword, pool)
            .then((user) => {
              if (!user) {
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
            }).catch(error => {
              // Handle database error
              console.error(error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Internal server error.' }));
            });

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
