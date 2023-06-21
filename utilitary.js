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

  const validateCNP = (cnp,name, pool) => {
    return new Promise((resolve, reject) => {
      const errors = [];
  
      // Validate CNP (should be unique and numeric)
      if (!cnp || !/^\d{13}$/.test(cnp)) {
        errors.push('Invalid CNP. The CNP should have exactly 13 digits.');
      }
  
      // Check if CNP exists
      pool.query(
        'SELECT * FROM vizitatori WHERE cnp = ? AND nume = ?',
        [cnp, name],
        (err, results) => {
          if (err) {
            reject(err);
          }
  
        if (results && results.length === 0) {
          errors.push('CNP and name do not match.');
        }
  
        // Resolve the errors
        resolve(errors);
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
            resolve({id: results[0].id, role: results[0].role});
          } else {
            // No user found, or password did not match
            resolve(null);
          }
        });
      });
  }


  const validateInmate = (cnp, startDate, endDate, grade, pool) => {
    return new Promise((resolve, reject) => {
      const errors = [];
  
      // Validate CNP (should be unique and numeric)
      if (!cnp || !/^\d{13}$/.test(cnp)) {
        errors.push('Invalid CNP. The CNP should have exactly 13 digits.');
      }
  
      // Check if CNP exists
      pool.query(
        'SELECT * FROM vizitatori WHERE cnp = ?',
        [cnp],
        (err, results) => {
          if (err) {
            reject(err);
          }
  
          if (results && results.length > 0) {
            errors.push('CNP exist.');
          }
  
          // Check if endDate is not lesser than startDate
          if (endDate < startDate) {
            errors.push('End date cannot be lesser than start date.');
          }
  
          // Check if grade is between 1 and 4 (inclusive)
          if (grade < 1 || grade > 4) {
            errors.push('Invalid grade. Grade should be between 1 and 4.');
          }
  
          // Resolve the errors
          resolve(errors);
        }
      );
    });
  };

  function findUserByID(id, password, pool) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM vizitatori WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length > 0 && results[0].parola === hashPassword(password)) {
          // User found and password matches
          resolve({id: results[0].id, role: results[0].role});
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

  async function generateBlobFromBase64(base64Image) {
    try {
      const response = await fetch(base64Image);

      const blob = await response.blob();
      const commaIndex = base64Image.indexOf(',');
      if (commaIndex !== -1) {
        const type = base64Image.substring(0, commaIndex + 1);
        return { blob, type };
      } else {
        throw new Error('Invalid base64 image format');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  

  module.exports = {validateData, findUserByCNP, findUserByID, hashPassword, validateCNP, validateInmate, generateBlobFromBase64};