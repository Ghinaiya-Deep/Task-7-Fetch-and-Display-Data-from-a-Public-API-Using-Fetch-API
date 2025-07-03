const userList = document.getElementById('userList');
const errorDiv = document.getElementById('error');
const reloadBtn = document.getElementById('reload');

async function fetchUserData() {
  userList.innerHTML = '';
  errorDiv.textContent = '';

  try {
    // Fetch 10 random users from the API
    const response = await fetch('https://randomuser.me/api/?results=10');

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    const users = data.results;

    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';

      card.innerHTML = `
        <h2>${user.name.first} ${user.name.last}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.location.street.name}, ${user.location.city}</p>
      `;

      userList.appendChild(card);
    });

  } catch (err) {
    errorDiv.textContent = `⚠️ Failed to load data: ${err.message}`;
  }
}

// Load data on page load
window.addEventListener('DOMContentLoaded', fetchUserData);

// Reload button functionality
reloadBtn.addEventListener('click', fetchUserData);
