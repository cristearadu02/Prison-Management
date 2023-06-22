// Get references to the search input and search results container
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
var jwt = document.cookie.replace(
  /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
// Add event listeners to the buttons
document
  .getElementById("numePrenumeButton")
  .addEventListener("click", searchByNumePrenume);
document.getElementById("cnpButton").addEventListener("click", searchByCNP);
document
  .getElementById("telefonButton")
  .addEventListener("click", searchByTelefon);
document.getElementById("allButton").addEventListener("click", searchAll);

// Function to search by Nume Prenume
// Function to search by Nume Prenume
function searchByNumePrenume() {
  const nume = searchInput.value.split(" ")[0];
  const prenume = searchInput.value.split(" ")[1];
  const url = `http://localhost:3000/api/findUserByNumePrenume?nume=${nume}&prenume=${prenume}`;

  // Make an HTTP request to the API endpoint
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt, // The JWT already includes 'Bearer' prefix
    },
  })
    .then((response) => response.json())
    .then((results) => {
      // Handle the response and display results in the searchResults container

      // Clear previous search results
      searchResults.innerHTML = "";

      if (results.length > 0) {
        // Display each user's information in the searchResults container
        results.forEach((user) => {
          let isAdmin = user.role;
          const userElement = document.createElement("div");
          userElement.classList.add("user");
          userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Sterge utilizator";

          const visitorID = user.id;
          //add the listener with delete method
          deleteButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Eliminați elementul utilizatorului din DOM fără a reîncărca pagina
                userElement.remove();
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error deleting user!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error deleting user!");
            };

            xhr.send();
          });

          searchResults.appendChild(deleteButton);

          const makeAdminButton = document.createElement("button");
          makeAdminButton.textContent = "Schimba rolul";

          deleteButton.classList.add("delete-button");
          makeAdminButton.classList.add("admin-button");

          makeAdminButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Updatati rolul(admin) utilizatorului din DOM fără a reîncărca pagina
                if(isAdmin === "admin"){
                
                userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: user</p>
                `;
                isAdmin = "user";
              }
                else{
                  userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: admin</p>
                `; 
                isAdmin = "admin";
                }
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error making user admin!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error making user admin!");
            };

            xhr.send();
          });

          searchResults.appendChild(makeAdminButton);
          searchResults.appendChild(userElement);
        });
      } else {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
            <h3>No users found</h3>
            `;
        searchResults.appendChild(userElement);
      }
    })
    .catch((error) => {
      console.error("Error searching users:", error);
    });
}

function searchAll() {
  const url = `http://localhost:3000/api/findAllUsers`;

  // Make an HTTP request to the API endpoint
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt, // The JWT already includes 'Bearer' prefix
    },
  })
    .then((response) => response.json())
    .then((results) => {
      // Handle the response and display results in the searchResults container

      // Clear previous search results
      searchResults.innerHTML = "";

      if (results.length > 0) {
        // Display each user's information in the searchResults container
        results.forEach((user) => {
          let isAdmin = user.role;
          const userElement = document.createElement("div");
          userElement.classList.add("user");
          userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Sterge utilizator";

          const visitorID = user.id;
          //add the listener with delete method
          deleteButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Eliminați elementul utilizatorului din DOM fără a reîncărca pagina
                userElement.remove();
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error deleting user!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error deleting user!");
            };

            xhr.send();
          });

          searchResults.appendChild(deleteButton);

          const makeAdminButton = document.createElement("button");
          makeAdminButton.textContent = "Schimba rolul";

          deleteButton.classList.add("delete-button");
          makeAdminButton.classList.add("admin-button");

          makeAdminButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Updatati rolul(admin) utilizatorului din DOM fără a reîncărca pagina
                if(isAdmin === "admin"){
                
                userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: user</p>
                `;
                isAdmin = "user";
              }
                else{
                  userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: admin</p>
                `; 
                isAdmin = "admin";
                }
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error making user admin!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error making user admin!");
            };

            xhr.send();
          });

          searchResults.appendChild(makeAdminButton);
          searchResults.appendChild(userElement);
        });
      } else {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
            <h3>No users found</h3>
            `;
        searchResults.appendChild(userElement);
      }
    })
    .catch((error) => {
      console.error("Error searching users:", error);
    });
}

// Function to search by CNP
function searchByCNP() {
  const cnp = searchInput.value;
  const url = `http://localhost:3000/api/findUserByCNP?cnp=${cnp}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt, // The JWT already includes 'Bearer' prefix
    },
  })
    .then((response) => response.json())
    .then((results) => {
      // Handle the response and display results in the searchResults container

      // Clear previous search results
      searchResults.innerHTML = "";

      if (results.length > 0) {
        // Display each user's information in the searchResults container
        results.forEach((user) => {
          let isAdmin = user.role;
          const userElement = document.createElement("div");
          userElement.classList.add("user");
          userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Sterge utilizator";

          const visitorID = user.id;
          //add the listener with delete method
          deleteButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Eliminați elementul utilizatorului din DOM fără a reîncărca pagina
                userElement.remove();
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error deleting user!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error deleting user!");
            };

            xhr.send();
          });

          searchResults.appendChild(deleteButton);

          const makeAdminButton = document.createElement("button");
          makeAdminButton.textContent = "Schimba rolul";

          deleteButton.classList.add("delete-button");
          makeAdminButton.classList.add("admin-button");

          makeAdminButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Updatati rolul(admin) utilizatorului din DOM fără a reîncărca pagina
                if(isAdmin === "admin"){
                
                userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: user</p>
                `;
                isAdmin = "user";
              }
                else{
                  userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: admin</p>
                `; 
                isAdmin = "admin";
                }
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error making user admin!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error making user admin!");
            };

            xhr.send();
          });

          searchResults.appendChild(makeAdminButton);
          searchResults.appendChild(userElement);
        });
      } else {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
            <h3>No users found</h3>
            `;
        searchResults.appendChild(userElement);
      }
    })
    .catch((error) => {
      console.error("Error searching users:", error);
    });
}

// Function to search by Telefon
function searchByTelefon() {
  const telefon = searchInput.value;
  const url = `http://localhost:3000/api/findUserByTelefon?numar_telefon=${telefon}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt, // The JWT already includes 'Bearer' prefix
    },
  })
    .then((response) => response.json())
    .then((results) => {
      // Handle the response and display results in the searchResults container

      // Clear previous search results
      searchResults.innerHTML = "";

      if (results.length > 0) {
        // Display each user's information in the searchResults container
        results.forEach((user) => {
          let isAdmin = user.role;
          const userElement = document.createElement("div");
          userElement.classList.add("user");
          userElement.innerHTML = `
              <h3>${user.nume} ${user.prenume}</h3>
              <p>Email: ${user.email}</p>
              <p>Telefon: ${user.numar_telefon}</p>
              <p>Data Nasterii: ${user.data_nasterii}</p>
              <p>Cetatenie: ${user.cetatenie}</p>
              <p>Rol: ${user.role}</p>
            `;
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Sterge utilizator";

          const visitorID = user.id;
          //add the listener with delete method
          deleteButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/deleteUser?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Eliminați elementul utilizatorului din DOM fără a reîncărca pagina
                userElement.remove();
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error deleting user!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error deleting user!");
            };

            xhr.send();
          });

          searchResults.appendChild(deleteButton);

          const makeAdminButton = document.createElement("button");
          makeAdminButton.textContent = "Schimba rolul";

          deleteButton.classList.add("delete-button");
          makeAdminButton.classList.add("admin-button");

          makeAdminButton.addEventListener("click", () => {
            const url = `http://localhost:3000/api/makeAdmin?id=${visitorID}`;
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", jwt);

            xhr.onload = function () {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message); // Log the response message
                // Adăugați o notificare cu mesajul
                alert(response.message);
                // Updatati rolul(admin) utilizatorului din DOM fără a reîncărca pagina
                if(isAdmin === "admin"){
                
                userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: user</p>
                `;
                isAdmin = "user";
              }
                else{
                  userElement.innerHTML = `
                  <h3>${user.nume} ${user.prenume}</h3>
                  <p>Email: ${user.email}</p>
                  <p>Telefon: ${user.numar_telefon}</p>
                  <p>Data Nasterii: ${user.data_nasterii}</p>
                  <p>Cetatenie: ${user.cetatenie}</p>
                  <p>Rol: admin</p>
                `; 
                isAdmin = "admin";
                }
              } else {
                console.error("Error:", xhr.statusText);
                alert("Error making user admin!");
              }
            };

            xhr.onerror = function () {
              console.error("Error:", xhr.statusText);
              alert("Error making user admin!");
            };

            xhr.send();
          });

          searchResults.appendChild(makeAdminButton);
          searchResults.appendChild(userElement);
        });
      } else {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
            <h3>No users found</h3>
            `;
        searchResults.appendChild(userElement);
      }
    })
    .catch((error) => {
      console.error("Error searching users:", error);
    });
}
