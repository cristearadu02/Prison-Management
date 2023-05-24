const profile = document.querySelector('.profile');
const dropdown = document.querySelector('.dropdown');
const showVisitsBtn = document.querySelector('.show-visits');
const visitsList = document.querySelector('.visits-list');

// Update the renderVisits function
function renderVisits(visitsData) {
  visitsList.innerHTML = '';
  visitsData.forEach(visit => {
    const li = document.createElement('li');

    const visitInfo = document.createElement('div');
    visitInfo.className = 'visit-info';

    const visitDate = document.createElement('p');
    visitDate.textContent = `Date: ${new Date(visit.date).toLocaleDateString()}`;
    visitInfo.appendChild(visitDate);

    const visitName = document.createElement('p');
    visitName.textContent = `Name: ${visit.name}`;
    visitInfo.appendChild(visitName);

    const visitReason = document.createElement('p');
    visitReason.textContent = `Reason: ${visit.reason}`;
    visitInfo.appendChild(visitReason);

    const visitOtherInfo = document.createElement('p');
    visitOtherInfo.textContent = `Other Info: ${visit.otherInfo}`;
    visitInfo.appendChild(visitOtherInfo);

    li.appendChild(visitInfo);
    visitsList.appendChild(li);
  });
}

// Fetch the logged user from the server
fetch('http://localhost:3005/api/getLoggedUser')
  .then(response => response.json())
  .then(loggedUser => {
    // Use the logged user value in the API call to fetch user information
    fetch(`http://localhost:3000/api/getInfoByID?id=${loggedUser}`)
      .then(response => response.json())
      .then(data => {
        // Extract the necessary information from the response
        const { nume, prenume, cnp, email, telefon } = data;

        // Update the profile name element
        const profileName = document.getElementById('profileName');
        profileName.textContent = `${nume} ${prenume}`;

        // Update the CNP info element
        const cnpInfo = document.getElementById('cnpInfo');
        cnpInfo.textContent = cnp;

        // Update the email info element
        const emailInfo = document.getElementById('emailInfo');
        emailInfo.textContent = email;
        
        //Update the phone info element
        const phoneInfo = document.getElementById('phoneInfo');
        phoneInfo.textContent = telefon;
        
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occurred during the fetch request
      });

    // Update the renderVisits function with the new logged user value
    function renderVisits(visitsData) {
      visitsList.innerHTML = '';
      visitsData.forEach(visit => {
        const li = document.createElement('li');

        const visitInfo = document.createElement('div');
        visitInfo.className = 'visit-info';

        const visitDate = document.createElement('p');
        visitDate.textContent = `Date: ${new Date(visit.date).toLocaleDateString()}`;
        visitInfo.appendChild(visitDate);

        const visitName = document.createElement('p');
        visitName.textContent = `Name: ${visit.name}`;
        visitInfo.appendChild(visitName);

        const visitReason = document.createElement('p');
        visitReason.textContent = `Reason: ${visit.reason}`;
        visitInfo.appendChild(visitReason);

        const visitOtherInfo = document.createElement('p');
        visitOtherInfo.textContent = `Other Info: ${visit.otherInfo}`;
        visitInfo.appendChild(visitOtherInfo);

        li.appendChild(visitInfo);
        visitsList.appendChild(li);
      });
    }

    // Fetch visit information for the logged user
    fetch(`http://localhost:3000/api/getVisitsByIDVizitator?id=${loggedUser}`)
      .then(response => response.json())
      .then(data => {
        // Update visitsData array with the fetched data
        const visitsData = data.map(visit => ({
          date: visit.dataa,
          name: visit.detainee_name,
          reason: visit.motiv_vizita,
          otherInfo: `Visitor: ${visit.visitor_name}`
        }));

        // Call the renderVisits function to update the visits list
        renderVisits(visitsData);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occurred during the fetch request
      });
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle any errors that occurred during the fetch request
  });

const showVisitsButton = document.querySelector('.show-visits');
const goTopButton = document.querySelector('.go-top');

profile.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

showVisitsButton.addEventListener('click', () => {
  visitsList.classList.toggle('hidden');
  showVisitsButton.classList.toggle('active');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    goTopButton.style.display = 'block';
  } else {
    goTopButton.style.display = 'none';
  }
});

goTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

function navigateToLink(path) {
  window.location.href = path;
}
