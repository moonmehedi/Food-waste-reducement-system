document.getElementById('donate-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const donorId = await getSessionDonorId(); // Get the donor ID from session

    const formData = new FormData();
    formData.append('food-image', document.getElementById('food-image').files[0]);
    formData.append('food-name', document.getElementById('food-name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('exp-date', document.getElementById('exp-date').value);
    formData.append('donor-id', donorId); // Add the donor ID to the form data

    try {
        const response = await fetch('http://localhost:5000/donor/donation', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to donate food.');
    }
});

// Function to get donor ID from session (already implemented)
async function getSessionDonorId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            return user.id;
        } else {
            console.error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}
