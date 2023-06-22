const crypto = require('crypto');

const validateData = (data, pool) => {
    return new Promise((resolve, reject) => {
      const errors = [];
  
      if (!data.image) {
        errors.push('Profile image not atached');
      }

      if (!data.nume || !/^[a-zA-Z\s\-]{3,}$/.test(data.nume)) {
        errors.push('Invalid family name. Name should have at least 5 characters and only include letters and spaces and char \'-\'.');
      }

      if (!data.prenume || !/^[a-zA-Z\s\-]{3,}$/.test(data.prenume)) {
        errors.push('Invalid first name. Name should have at least 5 characters and only include letters, spaces and char \'-\'.');
      }

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

      if (!data.address || data.address.length < 5) {
        errors.push('Invalid address. Address should have at least 5 characters.');
      }

      if (!data.data_nasterii) {
        errors.push('Invalid date of birth.');
      }

      if (!data.cetatenie) {
        errors.push('Invalid citizenship.');
      }
  
      // Validate password (length greater than 5)
      if (!data.password || data.password.length <= 5) {
        errors.push('Password should be more than 5 characters.');
      }
  
      // Checks if password and confirm password are the same
      if (data.password !== data.confirmPassword) {
        errors.push('Password and Confirm Password should be the same');
      }

      if (!data.intrebare_securitate) {
        errors.push('Invalid security question.');
      }

      if (!data.raspuns_intrebare_securitate || data.raspuns_intrebare_securitate.length < 5) {
        errors.push('Invalid security answer. Answer should have at least 5 characters.');
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




  const validateDataForgotPassword = (data, pool) => {
    return new Promise((resolve, reject) => {
      const errors = [];
  
      if (!data.cnp || !/^\d{13}$/.test(data.cnp)) {
        errors.push('Invalid CNP. The CNP should have exactly 13 digits.');
      }
      // Validate email
      if (!data.email || !data.email.includes('@')) {
        errors.push('Invalid email.');
      }
  
      if (!data.securityQuestion) {
        errors.push('Invalid security question.');
      }
  
      if (!data.answer || data.answer.length < 5) {
        errors.push('Invalid security answer. Answer should have at least 5 characters.');
      }
  
      // Check if CNP and email exist and match the security question and answer
      pool.query(
        'SELECT * FROM vizitatori WHERE cnp = ? AND email = ? AND intrebare_securitate = ? AND raspuns_intrebare_securitate = ?',
        [data.cnp, data.email, data.securityQuestion, data.answer],
        (err, results) => {
          if (err) {
            reject(err);
          }
  
          if (results && results.length === 0) {
            errors.push('Invalid CNP, email, security question, or security answer.');
          }
          resolve(errors);
        }
      );
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

  function findUserByID(id,password, pool) {
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



function findUserByCNPandEmail(cnp, email, pool) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM vizitatori WHERE cnp = ? AND email = ?', [cnp, email], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        // User found
        resolve(results[0]);
      } else {
        // No user found
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
  
  

  module.exports = {validateData, findUserByCNP, findUserByID, 
                    hashPassword, validateCNP, validateInmate, generateBlobFromBase64,
                    validateDataForgotPassword, findUserByCNPandEmail};