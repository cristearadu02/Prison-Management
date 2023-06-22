var jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// Get references to the search input and search results container
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
// Add event listeners to the buttons
document.getElementById('NumePrenumeDetinut').addEventListener('click',searchByNumeDetinut);
document.getElementById('CnpDetinut').addEventListener('click', searchByCNP);
document.getElementById('GradulDeSeveritate').addEventListener('click', searchByGrad);
document.getElementById('TotiDetinutii').addEventListener('click', printAll);
//Function to search by Nume Prenume
function searchByNumeDetinut() {
    const nume = searchInput.value.split(' ')[0];
    const prenume = searchInput.value.split(' ')[1];

    const url = `http://localhost:3000/api/findDeteineeByName?nume=${nume}&prenume=${prenume}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
    })
    .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';

        if (data.length > 0) {
            //Display each visit's information in the searchResults container
            //Todo data inceperii sentintei si data finalizarii
            data.forEach(deteinee => {
                const deteineeElement = document.createElement('div');
                deteineeElement.classList.add('user');
                deteineeElement.innerHTML = `
                    <h3>Detinut: ${deteinee.nume} ${deteinee.prenume}</h3>
                    <p>CNP: ${deteinee.cnp}</p>
                    <p>Motivul: ${deteinee.motivul_detinerii}</p>
                    <p>Gradul: ${deteinee.gradul}</p>
                    <p>InceputulSentintei: ${deteinee.data_inceperii_sentintei}</p>
                    <p>SfarsitulSentintei: ${deteinee.data_sfarsirii_sentintei}</p>
                    `;
                searchResults.appendChild(deteineeElement);
            });
        } else {
            const deteineeElement = document.createElement('div');
            deteineeElement.classList.add('user');
            deteineeElement.innerHTML = `
                <h3>No deteinee found</h3>
                `;
            searchResults.appendChild(deteineeElement);
        }     
      })
      .catch(error => {
        console.error('Error searching deteinees:', error);
      });
}

function searchByCNP() {
    const cnp = searchInput.value;

    const url = `http://localhost:3000/api/findDeteineeByCNP?cnp=${cnp}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
    })
    .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';

        if (data.length > 0) {
            //Display each visit's information in the searchResults container
            //Todo data inceperii sentintei si data finalizarii
            data.forEach(deteinee => {
                const deteineeElement = document.createElement('div');
                deteineeElement.classList.add('user');
                deteineeElement.innerHTML = `
                    <h3>Detinut: ${deteinee.nume} ${deteinee.prenume}</h3>
                    <p>CNP: ${deteinee.cnp}</p>
                    <p>Motivul: ${deteinee.motivul_detinerii}</p>
                    <p>Gradul: ${deteinee.gradul}</p>
                    <p>InceputulSentintei: ${deteinee.data_inceperii_sentintei}</p>
                    <p>SfarsitulSentintei: ${deteinee.data_sfarsirii_sentintei}</p>
                    `;
                searchResults.appendChild(deteineeElement);
            });
        } else {
            const deteineeElement = document.createElement('div');
            deteineeElement.classList.add('user');
            deteineeElement.innerHTML = `
                <h3>No deteinee found</h3>
                `;
            searchResults.appendChild(deteineeElement);
        }     
      })
      .catch(error => {
        console.error('Error searching deteinees:', error);
      });
}

function searchByGrad() {
    const gradul = searchInput.value;

    const url = `http://localhost:3000/api/findDeteineeByGrad?gradul=${gradul}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
    })
    .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';

        if (data.length > 0) {
            //Display each visit's information in the searchResults container
            //Todo data inceperii sentintei si data finalizarii
            data.forEach(deteinee => {
                const deteineeElement = document.createElement('div');
                deteineeElement.classList.add('user');
                deteineeElement.innerHTML = `
                    <h3>Detinut: ${deteinee.nume} ${deteinee.prenume}</h3>
                    <p>CNP: ${deteinee.cnp}</p>
                    <p>Motivul: ${deteinee.motivul_detinerii}</p>
                    <p>Gradul: ${deteinee.gradul}</p>
                    `;
                searchResults.appendChild(deteineeElement);
            });
        } else {
            const deteineeElement = document.createElement('div');
            deteineeElement.classList.add('user');
            deteineeElement.innerHTML = `
                <h3>No deteinee found</h3>
                `;
            searchResults.appendChild(deteineeElement);
        }     
      })
      .catch(error => {
        console.error('Error searching deteinees:', error);
      });
}

function printAll() {
    const url = `http://localhost:3000/api/findAllDeteinee`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
    })
    .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';

        if (data.length > 0) {
            //Display each visit's information in the searchResults container
            //Todo data inceperii sentintei si data finalizarii
            data.forEach(deteinee => {
                const deteineeElement = document.createElement('div');
                deteineeElement.classList.add('user');
                deteineeElement.innerHTML = `
                    <h3>Detinut: ${deteinee.nume} ${deteinee.prenume}</h3>
                    <p>CNP: ${deteinee.cnp}</p>
                    <p>Motivul: ${deteinee.motivul_detinerii}</p>
                    <p>Gradul: ${deteinee.gradul}</p>
                    <p>InceputulSentintei: ${deteinee.data_inceperii_sentintei}</p>
                    <p>SfarsitulSentintei: ${deteinee.data_sfarsirii_sentintei}</p>
                    `;

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-button');
                    deleteButton.innerHTML = 'DELETE';
                    deleteButton.addEventListener('click', () => {

                    const deteineeId= deteinee.id;
                    // Send a request to the server to verify the visit
                    const url = `http://localhost:3000/api/deleteInmate?id=${deteineeId}`;

                    fetch(url, {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt // The JWT already includes 'Bearer' prefix
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Inmate deleted succesfully:', data);
                        alert('Inmate deleted succesfully!');
                        window.location.reload();
                    }
                    )
                    .catch(error => {
                        console.error('Error deleting inmate:', error);
                    }
                    );
                });
                deteineeElement.appendChild(deleteButton)
                searchResults.appendChild(deteineeElement);
            });
        } else {
            const deteineeElement = document.createElement('div');
            deteineeElement.classList.add('user');
            deteineeElement.innerHTML = `
                <h3>No deteinee found</h3>
                `;
            searchResults.appendChild(deteineeElement);
        }     
      })
      .catch(error => {
        console.error('Error searching deteinees:', error);
      });
}