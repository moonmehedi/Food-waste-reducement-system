

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
          method: 'GET',
          credentials: 'include' // Ensure cookies are sent with the request
      });
  
      if (response.ok) {
          const user = await response.json();
          document.querySelector('#profile-modal span.username').textContent = user.name;
          document.querySelector('#profile-modal span.email').textContent = user.email;
      } else {
          console.error('Failed to fetch user info');
      }
  } catch (error) {
      console.error('Error fetching user info:', error);
  }
  });



  document.getElementById('logoutButton').addEventListener('click', () => {
    // Make a request to the logout route
    fetch('http://127.0.0.1:5000/logout')
      .then(response => {
        if (response.ok) {
          //Redirect to the login page
         window.location.href = "/Sign Up/login.html";
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  });


