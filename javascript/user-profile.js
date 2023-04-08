const profile = document.querySelector('.profile');
const dropdown = document.querySelector('.dropdown');
const showVisitsBtn = document.querySelector('.show-visits');
const visitsList = document.querySelector('.visits-list');

const visitsData = [
    {
      date: '2023-04-06',
      name: 'John Doe',
      reason: 'Meeting',
      otherInfo: 'Discussion about project',
    },
    {
      date: '2023-04-07',
      name: 'Jane Smith',
      reason: 'Interview',
      otherInfo: 'Job interview for the position of Web Developer',
    },
    {
      date: '2023-04-08',
      name: 'Michael Brown',
      reason: 'Conference',
      otherInfo: 'Attending a conference about AI',
    },
    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },    {
        date: '2023-04-08',
        name: 'Michael Brown',
        reason: 'Conference',
        otherInfo: 'Attending a conference about AI',
      },
  ];
  
  // Update the renderVisits function
  function renderVisits() {
    visitsList.innerHTML = '';
    visitsData.forEach(visit => {
      const li = document.createElement('li');
  
      const visitInfo = document.createElement('div');
      visitInfo.className = 'visit-info';
  
      const visitDate = document.createElement('p');
      visitDate.textContent = `Date: ${visit.date}`;
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
  renderVisits();










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