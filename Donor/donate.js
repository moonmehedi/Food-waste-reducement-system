async function getSessionDonorID() {
    try {
        console.log('Fetching current user session data...');
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            console.log('User info fetched:', user);
            return user.id; // Assuming the user ID is returned as 'id'
        } else {
            console.error('Failed to fetch user info. Response status:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

// Handle the form submission
document.getElementById('donate-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    console.log('Form submitted, preparing to gather form data...');

    // Get the donor ID from the session
    const donorID = await getSessionDonorID();
    console.log('Donor ID:', donorID);

    // Check if donorID is fetched properly
    if (!donorID) {
        console.error('Donor ID is not available.');
        alert('Could not get donor ID. Please try again.');
        return;
    }

    // Create form data object
    const formData = new FormData();
    formData.append('food-image', document.getElementById('food-image').files[0]);
    formData.append('food-name', document.getElementById('food-name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('exp-date', document.getElementById('exp-date').value);
    formData.append('donor-id', donorID); // Add donor ID to the form data

    console.log('Form data:', {
        'food-image': document.getElementById('food-image').files[0],
        'food-name': document.getElementById('food-name').value,
        quantity: document.getElementById('quantity').value,
        'exp-date': document.getElementById('exp-date').value,
        'donor-id': donorID
    });

    // Send the form data to the server via a POST request
    try {
        console.log('Sending data to server...');
        const response = await fetch('http://127.0.0.1:5000/donor/donation', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            alert(result.message); // Show success message
        } else {
            console.error('Server response error. Status:', response.status);
            alert('Failed to donate food.');
        }
    } catch (error) {
        console.error('Error while sending form data to the server:', error);
        alert('Failed to donate food.');
    }
});
