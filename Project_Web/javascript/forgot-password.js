document.getElementById("security-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the form data
  const cnp = document.getElementById("cnp").value;
  const email = document.getElementById("email").value;
  const securityQuestion = document.getElementById("security-question").value;
  const answer = document.getElementById("answer").value;

  // Create the request body
  const requestBody = {
    cnp: cnp,
    email: email,
    securityQuestion: securityQuestion,
    answer: answer
  };

  // Make a POST request to the server
  fetch('http://localhost:3000/api/forgotPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {

    if (data && data.errors) {
      const errorMessages = data.errors.map(error => `-> ${error}`).join('\n');
      alert(`${errorMessages}`);
    } 
    else if (data && data.token) {

      document.getElementById("security-form").classList.add("hidden");
      document.getElementById("message").classList.add("hidden");
      document.getElementById("password-form").classList.remove("hidden");

      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `jwt=${data.token}; Secure; SameSite=Strict;`;
      console.log(data.token);
    } 
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
});






document.getElementById("password-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the form data
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");


  // Create the request body
  const requestBody = {
    password: newPassword,
    confirmPassword: confirmPassword,
  };

  // Make a POST request to update the password
  fetch("http://localhost:3000/api/updatePassword", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
        'Authorization': jwt // The JWT already includes 'Bearer' prefix
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (response.ok) {

      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("Password updated successfully");
      window.location.href = "./login.html";
    } 
    else 
    {
      alert("Failed to update password.");
    }
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
});




