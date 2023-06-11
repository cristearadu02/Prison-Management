document.getElementById('programare-form').addEventListener('Submit', function(event) {
    event.preventDefault();
  
    let formData = {
      nume: document.getElementById('Nume_viz').value,
      prenume: document.getElementById('Prenume_viz').value,
      cnp: document.getElementById('CNP').value,
      nume_detinut: document.getElementById('Nume_det').value,
      prenume_detinut: document.getElementById('Prenume_det').value,
      relatia: document.getElementById('RelatieDetinut').value,
      natura_vizitei: document.getElementById('NaturaViz').value,
      data_vizitei: document.getElementById('DataViz').value,
      obiecte_de_livrat: document.getElementById('bring-something').value,
      nume_martor: document.getElementById('nume-martor').value,
      prenume_martor: document.getElementById('prenume-martor').value,
      relatia_detinut_martor: document.getElementById('Relatie-martor').value,
      acceptare_termeni: document.getElementById('acceptare-termeni').checked,
    };
  
    fetch('http://localhost:3000/api/getAppointment', {
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
      window.location.href = "./IndexLogat.html";
    } else {
      // If there was an error, handle it here
      alert("Appointment failed. An error occurred.");
      console.error("Error during Appointment:", response.statusText);
    }

    return response.json();  // This will pass the JSON response to the next then()
  })
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle the error
    alert("Appointment failed. An error occurred.");
    console.error("Error during Appointment:", error);
  });
});