// Get references to the search input and search results container
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Add event listeners to the buttons
document.getElementById('numePrenumeButton').addEventListener('click', searchByNumePrenume);
document.getElementById('cnpButton').addEventListener('click', searchByCNP);
document.getElementById('telefonButton').addEventListener('click', searchByTelefon);

// Function to search by Nume Prenume
// Function to search by Nume Prenume
function searchByNumePrenume() {
    const nume = searchInput.value.split(' ')[0];
    const prenume = searchInput.value.split(' ')[1];
    const url = `http://localhost:3000/api/findUserByNumePrenume?nume=${nume}&prenume=${prenume}`;
  
    // Make an HTTP request to the API endpoint
    fetch(url)
      .then(response => response.json())
      .then(results => {
        // Handle the response and display results in the searchResults container
  
        // Clear previous search results
        searchResults.innerHTML = '';
  
        if (results.length > 0) {
          // Display each user's information in the searchResults container
          results.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('user');
            userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Sterge utilizator';

                    const visitorID = user.id;
                    //add the listener with delete method
                    deleteButton.addEventListener('click', () => {
                    const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
                    fetch(url, { method: 'DELETE' })
                        .then(response => response.json())
                        .then(data => {
                        console.log(data.message); // Log the response message
                        //add a popup with the message
                        alert(data.message);
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        alert('Error deleting user!');
                        });
                    });
                    searchResults.appendChild(deleteButton);

                    const makeAdminButton = document.createElement('button');
                    makeAdminButton.textContent = 'Promoveaza admin';

                    deleteButton.classList.add('delete-button');
                    makeAdminButton.classList.add('admin-button');

                    makeAdminButton.addEventListener('click', () => {
                    const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
                    fetch(url, { method: 'PUT' })
                        .then(response => response.json())
                        .then(data => {
                        console.log(data.message); // Log the response message
                        //add a popup with the message
                        alert(data.message);
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        alert('Error making user admin!');
                        });
                    });
                            searchResults.appendChild(makeAdminButton);
                            searchResults.appendChild(userElement);
          });
        } else {
          const userElement = document.createElement('div');
          userElement.classList.add('user');
          userElement.innerHTML = `
            <h3>No users found</h3>
            `;
          searchResults.appendChild(userElement);
        }
      })
      .catch(error => {
        console.error('Error searching users:', error);
      });
  }
  

// Function to search by CNP
function searchByCNP() {
  const cnp = searchInput.value;
  const url = `http://localhost:3000/api/findUserByCNP?cnp=${cnp}`;

  fetch(url)
      .then(response => response.json())
      .then(results => {
        // Handle the response and display results in the searchResults container
  
        // Clear previous search results
        searchResults.innerHTML = '';
  
        if (results.length > 0) {
          // Display each user's information in the searchResults container
          results.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('user');
            userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Sterge utilizator';

            const visitorID = user.id;
            //add the listener with delete method
            deleteButton.addEventListener('click', () => {
            const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
            fetch(url, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                console.log(data.message); // Log the response message
                //add a popup with the message
                alert(data.message);
                })
                .catch(error => {
                console.error('Error:', error);
                alert('Error deleting user!');
                });
            });
            searchResults.appendChild(deleteButton);

            const makeAdminButton = document.createElement('button');
            makeAdminButton.textContent = 'Promoveaza admin';

            deleteButton.classList.add('delete-button');
            makeAdminButton.classList.add('admin-button');

            makeAdminButton.addEventListener('click', () => {
            const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
            fetch(url, { method: 'PUT' })
                .then(response => response.json())
                .then(data => {
                console.log(data.message); // Log the response message
                //add a popup with the message
                alert(data.message);
                })
                .catch(error => {
                console.error('Error:', error);
                alert('Error making user admin!');
                });
            });
                    searchResults.appendChild(makeAdminButton);
                            searchResults.appendChild(userElement);
          });
        } else {
          const userElement = document.createElement('div');
          userElement.classList.add('user');
          userElement.innerHTML = `
            <h3>No users found</h3>
            `;
          searchResults.appendChild(userElement);
        }
      })
      .catch(error => {
        console.error('Error searching users:', error);
      });
}

// Function to search by Telefon
function searchByTelefon() {
  const telefon = searchInput.value;
  const url = `http://localhost:3000/api/findUserByTelefon?numar_telefon=${telefon}`;

  fetch(url)
      .then(response => response.json())
      .then(results => {
        // Handle the response and display results in the searchResults container
  
        // Clear previous search results
        searchResults.innerHTML = '';
  
        if (results.length > 0) {
          // Display each user's information in the searchResults container
          results.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('user');
            userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;

            const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Sterge utilizator';

                    const visitorID = user.id;
                    //add the listener with delete method
                    deleteButton.addEventListener('click', () => {
                    const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
                    fetch(url, { method: 'DELETE' })
                        .then(response => response.json())
                        .then(data => {
                        console.log(data.message); // Log the response message
                        //add a popup with the message
                        alert(data.message);
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        alert('Error deleting user!');
                        });
                    });
                    searchResults.appendChild(deleteButton);

                    const makeAdminButton = document.createElement('button');
                    makeAdminButton.textContent = 'Promoveaza admin';

                    deleteButton.classList.add('delete-button');
                    makeAdminButton.classList.add('admin-button');

                    makeAdminButton.addEventListener('click', () => {
                    const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
                    fetch(url, { method: 'PUT' })
                        .then(response => response.json())
                        .then(data => {
                        console.log(data.message); // Log the response message
                        //add a popup with the message
                        alert(data.message);
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        alert('Error making user admin!');
                        });
                    });
                            searchResults.appendChild(makeAdminButton);
            searchResults.appendChild(userElement);
          });
        } else {
          const userElement = document.createElement('div');
          userElement.classList.add('user');
          userElement.innerHTML = `
            <h3>No users found</h3>
            `;
          searchResults.appendChild(userElement);
        }
      })
      .catch(error => {
        console.error('Error searching users:', error);
      });
}
