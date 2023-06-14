var jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// Get references to the search input and search results container
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
// Add event listeners to the buttons
document.getElementById('DataStartFinal').addEventListener('click', searchByDate);
document.getElementById('NumePrenumeDetinut').addEventListener('click', searchByDetinut);
document.getElementById('NumePrenumeVizitator').addEventListener('click', searchByVizitator);
document.getElementById('NotVerifiedVisits').addEventListener('click', searchByStatus);
// Function to search by Nume Prenume
// Function to search by Nume Prenume
function searchByDate() {

  const dataStart = searchInput.value.split(' ')[0];
  const dataEnd = searchInput.value.split(' ')[1];

  const url = `http://localhost:3000/api/findVisitsByDate?dataStart=${dataStart}&dataEnd=${dataEnd}`;

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
          data.forEach(visit => {
              const visitElement = document.createElement('div');
              visitElement.classList.add('user');
              visitElement.innerHTML = `
                  <h3>Vizitator: ${visit.nume} ${visit.prenume}</h3>
                  <p>Detinut: ${visit.nume_detinut} ${visit.prenume_detinut}</p>
                  <p>Data: ${visit.data_vizitei}</p>
                  <p>Natura vizitei: ${visit.natura_vizitei}</p>
                  <p>Relatia: ${visit.relatia}</p>
                  <p>Obiecte de la vizitator: ${visit.obiecte_de_livrat}</p>
                  <p>Martori: ${visit.nume_martor} ${visit.prenume_martor}</p>
                  <p>Status: ${visit.status}</p>
                  `;
              searchResults.appendChild(visitElement);
          });
      } else {
          const visitElement = document.createElement('div');
          visitElement.classList.add('user');
          visitElement.innerHTML = `
              <h3>No visits found</h3>
              `;
          searchResults.appendChild(visitElement);
      }     
    })
    .catch(error => {
      console.error('Error searching visits:', error);
    });
  }
  

// Function to search by CNP
function searchByDetinut() {
    const nume = searchInput.value.split(' ')[0];
    const prenume = searchInput.value.split(' ')[1];

    const url = `http://localhost:3000/api/findVisitsByDeteineeName?nume=${nume}&prenume=${prenume}`;

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
            data.forEach(visit => {
                const visitElement = document.createElement('div');
                visitElement.classList.add('user');
                visitElement.innerHTML = `
                    <h3>Vizitator: ${visit.nume} ${visit.prenume}</h3>
                    <p>Detinut: ${visit.nume_detinut} ${visit.prenume_detinut}</p>
                    <p>Data: ${visit.data_vizitei}</p>
                    <p>Natura vizitei: ${visit.natura_vizitei}</p>
                    <p>Relatia: ${visit.relatia}</p>
                    <p>Obiecte de la vizitator: ${visit.obiecte_de_livrat}</p>
                    <p>Martori: ${visit.nume_martor} ${visit.prenume_martor}</p>
                    <p>Status: ${visit.status}</p>
                    `;
                searchResults.appendChild(visitElement);
            });
        } else {
            const visitElement = document.createElement('div');
            visitElement.classList.add('user');
            visitElement.innerHTML = `
                <h3>No visits found</h3>
                `;
            searchResults.appendChild(visitElement);
        }     
      })
      .catch(error => {
        console.error('Error searching visits:', error);
      });
}

// Function to search by Telefon
function searchByVizitator() {  
    const nume = searchInput.value.split(' ')[0];
    const prenume = searchInput.value.split(' ')[1];

    const url = `http://localhost:3000/api/findVisitsByVisitorName?nume=${nume}&prenume=${prenume}`;

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
            data.forEach(visit => {
                const visitElement = document.createElement('div');
                visitElement.classList.add('user');
                visitElement.innerHTML = `
                    <h3>Vizitator: ${visit.nume} ${visit.prenume}</h3>
                    <p>Detinut: ${visit.nume_detinut} ${visit.prenume_detinut}</p>
                    <p>Data: ${visit.data_vizitei}</p>
                    <p>Natura vizitei: ${visit.natura_vizitei}</p>
                    <p>Relatia: ${visit.relatia}</p>
                    <p>Obiecte de la vizitator: ${visit.obiecte_de_livrat}</p>
                    <p>Martori: ${visit.nume_martor} ${visit.prenume_martor}</p>
                    <p>Status: ${visit.status}</p>
                    `;
                searchResults.appendChild(visitElement);
            });
        } else {
            const visitElement = document.createElement('div');
            visitElement.classList.add('user');
            visitElement.innerHTML = `
                <h3>No visits found</h3>
                `;
            searchResults.appendChild(visitElement);
        }     
      })
      .catch(error => {
        console.error('Error searching visits:', error);
      });
}

function searchByStatus()
{
  const url = `http://localhost:3000/api/getNotVerifiedVisitsAsAdmin`;

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
            data.forEach(visit => {
                const visitElement = document.createElement('div');
                visitElement.classList.add('user');
                visitElement.innerHTML = `
                    <h3>Vizitator: ${visit.nume} ${visit.prenume}</h3>
                    <p>Detinut: ${visit.nume_detinut} ${visit.prenume_detinut}</p>
                    <p>Data: ${visit.data_vizitei}</p>
                    <p>Natura vizitei: ${visit.natura_vizitei}</p>
                    <p>Relatia: ${visit.relatia}</p>
                    <p>Obiecte de la vizitator: ${visit.obiecte_de_livrat}</p>
                    <p>Martori: ${visit.nume_martor} ${visit.prenume_martor}</p>
                    <p>Status: ${visit.status}</p>
                    `;

                const verifyButton = document.createElement('button');
                verifyButton.classList.add('verifyButton');
                verifyButton.innerHTML = 'Verify';
                verifyButton.addEventListener('click', () => {
                  
                    // Send a request to the server to verify the visit
                    const url = `http://localhost:3000/api/changeVisitStatus?id=${visit.id}`;

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt // The JWT already includes 'Bearer' prefix
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Visit verified:', data);
                        alert('Visit verified!');
                        window.location.reload();
                    }
                    )
                    .catch(error => {
                        console.error('Error verifying visit:', error);
                    }
                    );
                });
            
                const rejectButton = document.createElement('button');
                rejectButton.classList.add('rejectButton');
                rejectButton.innerHTML = 'Reject';
                rejectButton.addEventListener('click', () => {

                    // Send a request to the server to verify the visit 

                    const url = `http://localhost:3000/api/changeVisitStatusRejected?id=${visit.id}`;

                    fetch(url, {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt // The JWT already includes 'Bearer' prefix
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Visit rejected:', data);
                        alert('Visit rejected!');
                        window.location.reload();
                    }
                    )
                    .catch(error => {
                        console.error('Error rejecting visit:', error);
                    }
                    );
                });

                visitElement.appendChild(verifyButton);
                visitElement.appendChild(rejectButton);
                searchResults.appendChild(visitElement);
            });
        } else {
            const visitElement = document.createElement('div');
            visitElement.classList.add('user');
            visitElement.innerHTML = `
                <h3>No visits found</h3>
                `;
            searchResults.appendChild(visitElement);
        }     
      })
      .catch(error => {
        console.error('Error searching visits:', error);
      });
}
