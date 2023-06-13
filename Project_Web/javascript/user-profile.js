const profile = document.querySelector('.profile');
const dropdown = document.querySelector('.dropdown');
const showVisitorsBtn = document.querySelector('.show-visitors');
const visitorsList = document.querySelector('.visitors-list');
const visitsList = document.querySelector('.visits-list');
const changeInfoButton = document.querySelector('.change-info');
const changePasswordLink = document.querySelector('.change-password');

var userId;
var userRole;

var jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
console.log(jwt);
fetchUserInfo();

// Fetch user information and update the UI
function fetchUserInfo() {
  fetch('http://localhost:3000/api/getInfoByID', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
        'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => response.json())
    .then(data => {
      // Extract the necessary information from the response
      const { nume, prenume, cnp, email, telefon, rol } = data;

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

      const roleInfo = document.getElementById('roleInfo');
      if(rol == 'admin')
        {
            roleInfo.textContent = 'Administrator';
            const createVisit = document.getElementById('createVisit');
            createVisit.style.display = 'none';
            fetchVisitorsInfo();
        }
        else
        {
            roleInfo.textContent = 'Vizitator';
            const visitsAdmin = document.getElementById('visitorsAdmin');
            visitsAdmin.style.display = 'none';
            const v1 = document.getElementById('visitors1');
            v1.style.display = 'none';
            const v2 = document.getElementById('visitors2');
            v2.style.display = 'none';
       }
      userRole = rol;
      
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

  if(userRole == 'user'){

  fetch('http://localhost:3000/api/getVisitsByIDVizitator', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => response.json())
    .then(data => {
      // Update visitsData array with the fetched data
      const visitsData = data.map(visit => ({
        date: visit.data_vizitei,
        name: visit.nume_detinut,
        reason: visit.motiv_vizita,
        otherInfo: `Relatia: ${visit.relatia} <br> 
                    Natura: ${visit.natura_vizitei} <br>  
                    Obiecte aduse: ${visit.obiecte_de_livrat || 'Niciunul'} <br>
                    Martori: ${visit.nume_martor ? `${visit.nume_martor} ${visit.prenume_martor}` : 'Niciunul'}`
      }));

      renderVisits(visitsData);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occurred during the fetch request
    });
  }
  else{
  fetch('http://localhost:3000/api/getVisitsAsAdmin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => response.json())
    .then(data => {
      // Update visitsData array with the fetched data
      // data will contain motiv_vizita, dataa, nume AS detainee_name, nume AS visitor_name,
      // relatia, natura, obiecte_aduse, martori
      const visitsData = data.map(visit => ({
        date: visit.data_vizitei,
        name: visit.nume_detinut + " " + visit.prenume_detinut,
        reason: visit.natura_vizitei + ", " + visit.relatia,
        otherInfo: `Vizitator: ${visit.nume} ${visit.prenume} <br>
                    Relatia: ${visit.relatia} <br>
                    Obiecte aduse: ${visit.obiecte_de_livrat} <br>
                    Martori: ${visit.nume_martor || 'Niciunul'}`
      }));
      renderVisits(visitsData);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occurred during the fetch request
    });

  }
}

function fetchVisitorsInfo() {
  const url = `http://localhost:3000/api/getUsersAsAdmin`;
 
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update visitsorsData array with the fetched data
      // data will contain nume,prenume,email,numar_telefon,data_nasterii,cetatenie,role
      const visitorsData = data.map(visitor => ({
        id: visitor.id,
        nume: visitor.nume,
        prenume: visitor.prenume,
        email: visitor.email,
        numar_telefon: visitor.numar_telefon,
        data_nasterii: visitor.data_nasterii,
        cetatenie: visitor.cetatenie,
        rol: visitor.role
      }));
      renderVisitors(visitorsData);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occurred during the fetch request
    }
  );
}

// Update the user info on button click
function updateUserInfo() {
  const emailInput = document.querySelector('#emailInfo input');
  const phoneInput = document.querySelector('#phoneInfo input');

  const email = encodeURIComponent(emailInput.value);
  const phone = encodeURIComponent(phoneInput.value);

  const url = `http://localhost:3000/api/updateUserInfo?email=${email}&phone=${phone}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => response.json())
  .then(data => {
      console.log(data.message); // Log the response message
      //add a popup with the message
      alert(data.message);
    })
    .catch(error => {
      console.log('Error:', error);
      alert('Error updating user info!');
    });
}

changeInfoButton.addEventListener('click', updateUserInfo);

function renderVisits(visitsData) {
  visitsList.innerHTML = '';
  visitsData.forEach(visit => {
    const li = document.createElement('li');

    const visitInfo = document.createElement('div');
    visitInfo.className = 'visit-info';

    const visitDate = document.createElement('p');
    visitDate.textContent = `Data: ${new Date(visit.date).toLocaleDateString()}`;
    visitInfo.appendChild(visitDate);

    const visitName = document.createElement('p');
    visitName.textContent = `Numele: ${visit.name}`;
    visitInfo.appendChild(visitName);

    const visitReason = document.createElement('p');
    visitReason.textContent = `Motivul: ${visit.reason}`;
    visitInfo.appendChild(visitReason);

    const visitOtherInfo = document.createElement('p');
    visitOtherInfo.innerHTML = `${visit.otherInfo}`;
    visitInfo.appendChild(visitOtherInfo);

    li.appendChild(visitInfo);
    visitsList.appendChild(li);
  });
}

function renderVisitors(visitorsData) {
  visitorsList.innerHTML = '';
  visitorsData.forEach(visitor => {
    const li = document.createElement('li');

    const visitorID = visitor.id;

    const visitorInfo = document.createElement('div');
    visitorInfo.className = 'visitor-info';

    const visitorName = document.createElement('p');
    visitorName.textContent = `Nume: ${visitor.nume}`;
    visitorInfo.appendChild(visitorName);

    const visitorPrenume = document.createElement('p');
    visitorPrenume.textContent = `Prenume: ${visitor.prenume}`;
    visitorInfo.appendChild(visitorPrenume);

    const visitorEmail = document.createElement('p');
    visitorEmail.textContent = `Email: ${visitor.email}`;
    visitorInfo.appendChild(visitorEmail);

    const visitorPhone = document.createElement('p');
    visitorPhone.textContent = `Numar telefon: ${visitor.numar_telefon}`;
    visitorInfo.appendChild(visitorPhone);

    const visitorBirthDate = document.createElement('p');
    visitorBirthDate.textContent = `Data nasterii: ${visitor.data_nasterii}`;
    visitorInfo.appendChild(visitorBirthDate);

    const visitorCetatenie = document.createElement('p');
    visitorCetatenie.textContent = `Cetatenie: ${visitor.cetatenie}`;
    visitorInfo.appendChild(visitorCetatenie);

    const visitorRol = document.createElement('p');
    visitorRol.textContent = `Rol: ${visitor.rol}`;
    visitorInfo.appendChild(visitorRol);



    //add a button to delete the user, and one to make them an admin, when pressed, send a request to the server to update the user
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Sterge utilizator';
    //add the listener with delete method
    deleteButton.addEventListener('click', () => {
      const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwt // The JWT already includes 'Bearer' prefix
        }
        })
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
    visitorInfo.appendChild(deleteButton);

    const makeAdminButton = document.createElement('button');
    makeAdminButton.textContent = 'Promoveaza admin';

    deleteButton.classList.add('delete-button');
    makeAdminButton.classList.add('admin-button');

    makeAdminButton.addEventListener('click', () => {
      const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
      fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
    })
    .then(response => response.json())
        .then(data => {
          console.log(data.message); // Log the response message
          //add a popup with the message
          alert(data.message);
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error.message);
        });
    });
    visitorInfo.appendChild(makeAdminButton);

    li.appendChild(visitorInfo);
    visitorsList.appendChild(li);
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


showVisitorsBtn.addEventListener('click', () => {
  visitorsList.classList.toggle('hidden');
  showVisitorsBtn.classList.toggle('active');
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

// Toggle password popup
changePasswordLink.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent event propagation

  const passwordPopup = document.querySelector('.password-popup');
  passwordPopup.classList.toggle('hidden');
});


// Submit password change
function submitPasswordChange() {
  // Get password fields
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  const currentPasswordEncoded = encodeURIComponent(currentPassword);
  const newPasswordEncoded = encodeURIComponent(newPassword);

  fetch(`http://localhost:3000/api/changePassword?&currentPassword=${currentPasswordEncoded}&newPassword=${newPasswordEncoded}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt // The JWT already includes 'Bearer' prefix
    }
}).then(response => {
      if (!response.ok) {
        throw new Error('Failed to change password');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message); // Log the response message
      // Clear password fields
      document.getElementById('currentPassword').value = '';
      document.getElementById('newPassword').value = '';
      document.getElementById('confirmPassword').value = '';

      // Close password popup
      const passwordPopup = document.querySelector('.password-popup');
      passwordPopup.classList.add('hidden');

      // Display success message to the user
      alert(data.message);
    })
    .catch(error => {
      console.log('Error:', error);
      alert('Parola curenta nu este corecta!');
    });
}


const submitButton = document.querySelector('.submit-password');
submitButton.addEventListener('click', submitPasswordChange);

// Hide password change form
function hidePasswordForm() {
  const passwordPopup = document.querySelector('.password-popup');
  passwordPopup.classList.add('hidden');
}

const cancelBtn = document.querySelector('.cancel-password');
cancelBtn.addEventListener('click', hidePasswordForm);

