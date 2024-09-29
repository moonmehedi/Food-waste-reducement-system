document.querySelector('.sell-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const donorId = await getSessionDonorId(); // Get the donor ID from the session

    const formData = new FormData();
    formData.append('food-photo', document.getElementById('food-photo').files[0]);
    formData.append('food-name', document.getElementById('food-name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('exp-date', document.getElementById('date').value);
    formData.append('original-price', document.getElementById('original-price').value);
    formData.append('discounted-price', document.getElementById('discounted-price').value);
    formData.append('donor-id', donorId); // Add donor ID to form data

    try {
        const response = await fetch('http://localhost:5000/sell/food', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to sell food.');
    }
});

async function getSessionDonorId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            return user.id; // Return the donor ID from the response
        } else {
            console.error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}
