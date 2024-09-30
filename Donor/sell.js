// Function to get the current donor's ID from the session
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

// Handle the form submission for selling food
document.querySelector('.sell-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    console.log('Sell form submitted, preparing to gather form data...');

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
    formData.append('food-photo', document.getElementById('food-photo').files[0]);
    formData.append('food-name', document.getElementById('food-name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('original-price', document.getElementById('original-price').value);
    formData.append('discounted-price', document.getElementById('discounted-price').value);
    formData.append('exp-date', document.getElementById('date').value);
    formData.append('donor-id', donorID); // Add donor ID to the form data

    console.log('Form data:', {
        'food-photo': document.getElementById('food-photo').files[0],
        'food-name': document.getElementById('food-name').value,
        quantity: document.getElementById('quantity').value,
        'original-price': document.getElementById('original-price').value,
        'discounted-price': document.getElementById('discounted-price').value,
        date: document.getElementById('date').value,
        'donor-id': donorID
    });

    // Send the form data to the server via a POST request
    try {
        console.log('Sending data to server...');
        const response = await fetch('http://127.0.0.1:5000/sell/food', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            alert(result.message); // Show success message
        } else {
            console.error('Server response error. Status:', response.status);
            alert('Failed to sell food.');
        }
    } catch (error) {
        console.error('Error while sending form data to the server:', error);
        alert('Failed to sell food.');
    }
});
