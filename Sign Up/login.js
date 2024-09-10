document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = event.target.role.value;
    const rememberMe = event.target['remember-me'].checked;
    console.log(role);

    const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify({ email, password, role, rememberMe })
    });

    console.log(response);
    const result = await response.json();

    if (response.ok) {
        alert('Login successful');
        // Redirect to the appropriate dashboard based on role
        if (role === 'manager') {
            window.location.href = '/Admin/Admin_home.html';
        } else if (role === 'volunteer') {
            window.location.href = '/Volunteer/Volunteer_home.html';
        } else if (role === 'donor') {
            window.location.href = '/Donor/Donor_home.html';
        } else if (role === 'recipient') {
            window.location.href = '/Recipient/Recipient_home.html';
        }
    } else {
        alert(result.message);
    }
});