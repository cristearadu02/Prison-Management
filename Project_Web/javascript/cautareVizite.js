var jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// Get references to the search input and search results container
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
// Add event listeners to the buttons
document.getElementById('DataStartFinal').addEventListener('click', searchByDate);
document.getElementById('NumePrenumeDetinut').addEventListener('click', searchByDetinut);
document.getElementById('NumePrenumeVizitator').addEventListener('click', searchByVizitator);
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

