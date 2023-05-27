const profile = document.querySelector('.profile');
const dropdown = document.querySelector('.dropdown');
const showVisitsBtn = document.querySelector('.show-visits');
const visitsList = document.querySelector('.visits-list');
const changeInfoButton = document.querySelector('.change-info');
let userId;

// Fetch the logged user and store the value of userId
fetch('http://localhost:3005/api/getLoggedUser')
  .then(response => response.json())
  .then(loggedUser => {
    userId = encodeURIComponent(loggedUser);

    // Fetch user information and update the UI
    fetchUserInfo();
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle any errors that occurred during the fetch request
  });

// Fetch user information and update the UI
function fetchUserInfo() {
  const url = `http://localhost:3000/api/getInfoByID?id=${userId}`;

  fetch(url)
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

      // Create input fields for email and telefon
      const emailInfo = document.getElementById('emailInfo');
      const emailInput = document.createElement('input');
      emailInput.value = email;
      emailInput.classList.add('editable-input');
      emailInput.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event propagation
      });
      emailInfo.appendChild(emailInput);

      const phoneInfo = document.getElementById('phoneInfo');
      const phoneInput = document.createElement('input');
      phoneInput.value = telefon;
      phoneInput.classList.add('editable-input');
      phoneInput.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event propagation
      });
      phoneInfo.appendChild(phoneInput);

      // Fetch visit information for the logged user
      fetchVisitsInfo();
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occurred during the fetch request
    });
}

// Fetch visit information for the logged user and update the visits list
function fetchVisitsInfo() {
  const url = `http://localhost:3000/api/getVisitsByIDVizitator?id=${userId}`;

  fetch(url)
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
}

// Update the user info on button click
function updateUserInfo() {
  const emailInput = document.querySelector('#emailInfo input');
  const phoneInput = document.querySelector('#phoneInfo input');

  const email = encodeURIComponent(emailInput.value);
  const phone = encodeURIComponent(phoneInput.value);

  const url = `http://localhost:3000/api/updateUserInfo?id=${userId}&email=${email}&phone=${phone}`;

  fetch(url, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Log the response message
      //add a popup with the message
      alert(data.message);

    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error updating user info!');
    });
}

changeInfoButton.addEventListener('click', updateUserInfo);

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
