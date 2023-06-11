const crypto = require('crypto');

const validateData = (data, pool) => {
    return new Promise((resolve, reject) => {
      const errors = [];
  
      // Validate email
      if (!data.email || !data.email.includes('@')) {
        errors.push('Invalid email.');
      }
  
      // Validate CNP (should be unique and numeric)
      if (!data.cnp || !/^\d{13}$/.test(data.cnp)) {
        errors.push('Invalid CNP. The CNP should have exactly 13 digits.');
      }

      if (!data.numar_telefon || !/^0\d{9}$/.test(data.numar_telefon)) {
        errors.push('Invalid phone number. Phone number must have exactly 10 digits and start with 0.');
      }
  
      // Validate password (length greater than 5)
      if (!data.password || data.password.length <= 5) {
        errors.push('Password should be more than 5 characters.');
      }
  
      // Checks if password and confirm password are the same
      if (data.password !== data.confirmPassword) {
        errors.push('Password and Confirm Password should be the same');
      }
  
      if (!data.terms) {
        errors.push('Terms and conditions should be checked');
      }

  
      // Check if email is unique
      pool.query(`SELECT * FROM vizitatori WHERE email = ?`, [data.email], (err, results) => {
        if (err) {
          reject(err);
        }

        if (results && results.length > 0) {
          errors.push('Email already exists.');
        }
  
        // Check if CNP is unique
        pool.query(`SELECT * FROM vizitatori WHERE cnp = ?`, [data.cnp], (err, results) => {
          if (err) {
            reject(err);
          }
  
          if (results && results.length > 0) {
            errors.push('CNP already exists.');
          }
  
          // Check if numar_telefon is unique
          pool.query(`SELECT * FROM vizitatori WHERE numar_telefon = ?`, [data.numar_telefon], (err, results) => {
            if (err) {
              reject(err);
            }
  
            if (results && results.length > 0) {
              errors.push('Phone number already exists.');
            }
  
            // Resolve the errors
            resolve(errors);
          });
        });
      });
    });
  };




  function findUserByCNP(cnp, password, pool) {
    return new Promise((resolve, reject) => {
        // Assuming `cnp` is a unique column in your users table
        pool.query('SELECT * FROM vizitatori WHERE cnp = ?', [cnp], (error, results) => {
          if (error) {
            reject(error);
          } else if (results.length > 0 && results[0].parola === hashPassword(password)) {
            // User found and password matches
            resolve(results[0].id); // assuming `id` is the column name for user id
          } else {
            // No user found, or password did not match
            resolve(null);
          }
        });
      });
  }


  function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }
  



  module.exports = {validateData, findUserByCNP, hashPassword};