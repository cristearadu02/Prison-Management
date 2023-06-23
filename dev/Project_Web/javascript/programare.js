
var jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
console.log(jwt);

document.getElementById('programation-from').addEventListener('submit', function(event) {
  //Prevent the form from submitting normally



 event.preventDefault();


let formData2 = {
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
 relatia_detinut_martor: document.getElementById('Relatie-martor').value
 //acceptare_termeni: document.getElementById('acceptare-termeni').checked
};

fetch('http://localhost:3000/api/getAppointment', {
method: 'POST',
headers: {
 'Content-Type': 'application/json',
},
body: JSON.stringify(formData2),
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

const inputName = document.getElementById('Nume_viz');
const inputCNP = document.getElementById('CNP');
const inputPrenume = document.getElementById('Prenume_viz');
const autocompleteList = document.getElementById('autocomplete-list');
let timeoutName;
let timeoutCNP;

inputName.addEventListener('focusout', handleInputName);
inputCNP.addEventListener('focusout', handleInputCNP);

function handleInputName() {
  clearTimeout(timeoutName);
  const searchTermName = inputName.value;

  // Send a GET request to the server-side script for name suggestions
  fetch(`http://localhost:3000/api/autocomplete?term=${encodeURIComponent(searchTermName)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => response.json())
    .then(data => {
      clearAutocomplete();

      if (data.length > 0) {
        const bestMatch = data[0];
        inputName.value = bestMatch.nume;
        inputCNP.value = bestMatch.cnp;
        inputPrenume.value = bestMatch.prenume;
      }
    })
    .catch(error => {
      console.error('An error occurred during autocomplete:', error);
    });
}

function handleInputCNP() {
  clearTimeout(timeoutCNP);
  const searchTermCNP = inputCNP.value;

  // Send a GET request to the server-side script for CNP suggestions
  fetch(`http://localhost:3000/api/autocomplete?term=${encodeURIComponent(searchTermCNP)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
        'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => response.json())
    .then(data => {
      clearAutocomplete();

      if (data.length > 0) {
        const bestMatch = data[0];
        inputName.value = bestMatch.nume;
        inputCNP.value = bestMatch.cnp;
        inputPrenume.value = bestMatch.prenume;
      }
    })
    .catch(error => {
      console.error('An error occurred during autocomplete:', error);
    });
}

function clearAutocomplete() {
  if (autocompleteList) {
    while (autocompleteList.firstChild) {
      autocompleteList.removeChild(autocompleteList.firstChild);
    }
  }
}