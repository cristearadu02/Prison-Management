var image_to_send = null;

function previewImage(event) {
  const reader = new FileReader();
  const imagePreview = document.getElementById('image-preview');

  
  reader.onload = function () {
    if (reader.readyState === 2) {
      imagePreview.src = reader.result;
      image_to_send = reader.result;
      imagePreview.style.display = 'block';
    }
  }


  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
  }
}


function navigateToLink(path) {
  window.location.href = path;
}



document.getElementById('register-form').addEventListener('submit', function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();
  const fileInput = document.getElementById('image-upload');


  // Create an object to hold the form data
  let formData = {
    image: image_to_send,
    cnp: document.getElementById('cnp').value,
    nume: document.getElementById('family-name').value,
    prenume: document.getElementById('name').value,
    email: document.getElementById('email').value,
    numar_telefon: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    data_nasterii: document.getElementById('dob').value,
    cetatenie: document.getElementById('citizenship').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirm-password').value,
    intrebare_securitate: document.getElementById('security-question').value,
    raspuns_intrebare_securitate: document.getElementById('security-answer').value,
    terms: document.querySelector('input[name="terms"]').checked,
  };

  // Send a POST request to the server
  fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    // Here you can check the response status
    if (response.status === 201) {
      console.log('Registration successful');
    } 
    else {
      console.log('Registration failed');
    }

    return response.json();  // This will pass the JSON response to the next then()
  })
  .then(data => {

    if (data && data.errors) {
      const errorMessages = data.errors.map(error => `-> ${error}`).join('\n');
      alert(`${errorMessages}`);
    } 
    else if (data && data.token) {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `jwt=${data.token}; Secure; SameSite=Strict;`;
      console.log(data.token);
      window.location.href = "./user-profile.html";
    } 
  })
  .catch(error => {
    // Handle the error
    alert("Registration failed. An error occurred.");
    console.error("Error during registration:", error);
  });
});



