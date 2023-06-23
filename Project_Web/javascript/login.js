document.addEventListener('DOMContentLoaded', () => {

  // Get the button element inside the login form
  const loginButton = document.querySelector('button');

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    const cnpInput = document.getElementById('CNP');
    const passwordInput = document.getElementById('password');

    const loginData = {
      cnp: cnpInput.value,
      password: passwordInput.value,
    };

    // Send the login data to the server
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        if (response.ok) {
          // Successful login
          return response.json();
        } else {
          // Login failed
          throw new Error('Login failed. Please check your credentials.');
        }
      })
      .then(data => {
        // Handle the response data after successful login
        console.log(data);

        // Store the JWT in a secure cookie
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `jwt=${data.token}; Secure; SameSite=Strict;`;
        console.log(data.token);
        window.location.href = "./user-profile.html";
      })
      .catch(error => {
        // Handle any errors that occurred during the login process
        console.error('Error during login:', error);
        // Display an error message or perform error handling
        alert('Login failed. Please check your credentials.');
      });
  });
});