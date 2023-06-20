document.getElementById('formular-inregistrare-detinut').addEventListener('submit', function(event) {
    //Prevent the form from submitting normally
   event.preventDefault();
   let formData = {
    nume: document.getElementById('Nume').value,
    prenume: document.getElementById('Prenume').value,
    cnp: document.getElementById('CNP').value,
    motivul: document.getElementById('motivul').value,
    gradul: document.getElementById('gradul').value,
    data_inceperii_sentintei: document.getElementById('DataStart').value,
    data_sfarsirii_sentintei: document.getElementById('DataEnd').value,
   };
   fetch('http://localhost:3000/api/addInmate', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    })
    .then(response => {
    // Here you can check the response status
    if (response.status === 201) {
     // If the user is created successfully, you can redirect here
     window.location.href = "./user-profile.html";
    } else {
     // If there was an error, handle it here
     alert("Adding inmate failed. An error occurred.");
     console.error("Error during adding inmate:", response.statusText);
    }
    
    return response.json();  // This will pass the JSON response to the next then()
    })
    .then(data => {
    // Handle the response data
    console.log(data);
    })
    .catch(error => {
    // Handle the error
    alert("Adding inmate failed. An error occurred.");
    console.error("Error during adding inmate:", error);
    });









});