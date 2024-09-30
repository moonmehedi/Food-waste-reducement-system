// Add event listener for the Logout button
const logoutBtn = document.querySelector('.btn');

logoutBtn.addEventListener('click', handleLogout);

function handleLogout(event) {
    event.preventDefault();  // Prevent the default link behavior
    // Clear localStorage data
    localStorage.removeItem("NID");
    localStorage.removeItem("Username");

    // Redirect to login page
    window.location.href = "/Sign Up/login_customer.html";  // Update the URL path to your login page
}
