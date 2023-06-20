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
           //here add three buttons for download as JSON, CSV and HTML
            const downloadJSON = document.createElement('button');
            downloadJSON.innerHTML = 'Download as JSON';
            downloadJSON.classList.add('download-button');
            downloadJSON.addEventListener('click', () => {
                downloadFile(data, 'json');
            });
            searchResults.appendChild(downloadJSON);

            const downloadCSV = document.createElement('button');
            downloadCSV.innerHTML = 'Download as CSV';
            downloadCSV.classList.add('download-button');
            downloadCSV.addEventListener('click', () => {
              downloadFile(data, 'csv');
            });
            searchResults.appendChild(downloadCSV);

            const downloadHTML = document.createElement('button');
            downloadHTML.innerHTML = 'Download as HTML';
            downloadHTML.classList.add('download-button');
            downloadHTML.addEventListener('click', () => {
              downloadFile(data, 'html');
            });
            searchResults.appendChild(downloadHTML);
            
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

// implement downloadFile function
function downloadFile(data, type) {
  let csvContent = 'data:text/csv;charset=utf-8,';
  let htmlContent = '<table><tr><th>Vizitator</th><th>Detinut</th><th>Data</th><th>Natura vizitei</th><th>Relatia</th><th>Obiecte de la vizitator</th><th>Martori</th><th>Status</th></tr>';
  data.forEach(visit => {
    csvContent += `${visit.nume},${visit.prenume},${visit.nume_detinut},${visit.prenume_detinut},${visit.data_vizitei},${visit.natura_vizitei},${visit.relatia},${visit.obiecte_de_livrat},${visit.nume_martor},${visit.prenume_martor},${visit.status}\n`;
    htmlContent += `<tr><td>${visit.nume} ${visit.prenume}</td><td>${visit.nume_detinut} ${visit.prenume_detinut}</td><td>${visit.data_vizitei}</td><td>${visit.natura_vizitei}</td><td>${visit.relatia}</td><td>${visit.obiecte_de_livrat}</td><td>${visit.nume_martor} ${visit.prenume_martor}</td><td>${visit.status}</td></tr>`;
  });
  htmlContent += '</table>';

  if (type === 'json') {
    const dataStr = JSON.stringify(data);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } else if (type === 'csv') {
    csvContent = 'data:text/csv;charset=utf-8, Nume vizitator, Prenume vizitator, Nume detinut, Prenume detinut, Data vizitei, Natura vizitei, Relatia, Obiecte de la vizitator, Nume martor, Prenume martor, Status\n' + csvContent;
    const dataUri = encodeURI(csvContent);
    const exportFileDefaultName = 'data.csv';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } else if (type === 'html') {
    const dataUri = encodeURI(htmlContent);
    const exportFileDefaultName = 'data.html';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
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
            // Add download buttons
            //here add three buttons for download as JSON, CSV and HTML
            const downloadJSON = document.createElement('button');
            downloadJSON.innerHTML = 'Download as JSON';
            downloadJSON.classList.add('download-button');
            downloadJSON.addEventListener('click', () => {
                downloadFile(data, 'json');
            });
            searchResults.appendChild(downloadJSON);

            const downloadCSV = document.createElement('button');
            downloadCSV.innerHTML = 'Download as CSV';
            downloadCSV.classList.add('download-button');
            downloadCSV.addEventListener('click', () => {
              downloadFile(data, 'csv');
            });
            searchResults.appendChild(downloadCSV);

            const downloadHTML = document.createElement('button');
            downloadHTML.innerHTML = 'Download as HTML';
            downloadHTML.classList.add('download-button');
            downloadHTML.addEventListener('click', () => {
              downloadFile(data, 'html');
            });
            searchResults.appendChild(downloadHTML);

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
            //here add three buttons for download as JSON, CSV and HTML
            const downloadJSON = document.createElement('button');
            downloadJSON.innerHTML = 'Download as JSON';
            downloadJSON.classList.add('download-button');
            downloadJSON.addEventListener('click', () => {
                downloadFile(data, 'json');
            });
            searchResults.appendChild(downloadJSON);

            const downloadCSV = document.createElement('button');
            downloadCSV.innerHTML = 'Download as CSV';
            downloadCSV.classList.add('download-button');
            downloadCSV.addEventListener('click', () => {
              downloadFile(data, 'csv');
            });
            searchResults.appendChild(downloadCSV);

            const downloadHTML = document.createElement('button');
            downloadHTML.innerHTML = 'Download as HTML';
            downloadHTML.classList.add('download-button');
            downloadHTML.addEventListener('click', () => {
              downloadFile(data, 'html');
            });
            searchResults.appendChild(downloadHTML);
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

            //here add three buttons for download as JSON, CSV and HTML
            const downloadJSON = document.createElement('button');
            downloadJSON.innerHTML = 'Download as JSON';
            downloadJSON.classList.add('download-button');
            downloadJSON.addEventListener('click', () => {
                downloadFile(data, 'json');
            });
            searchResults.appendChild(downloadJSON);

            const downloadCSV = document.createElement('button');
            downloadCSV.innerHTML = 'Download as CSV';
            downloadCSV.classList.add('download-button');
            downloadCSV.addEventListener('click', () => {
              downloadFile(data, 'csv');
            });
            searchResults.appendChild(downloadCSV);

            const downloadHTML = document.createElement('button');
            downloadHTML.innerHTML = 'Download as HTML';
            downloadHTML.classList.add('download-button');
            downloadHTML.addEventListener('click', () => {
              downloadFile(data, 'html');
            });
            searchResults.appendChild(downloadHTML);
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
