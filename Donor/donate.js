document.getElementById('donate-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('food-image', document.getElementById('food-image').files[0]);
    formData.append('food-name', document.getElementById('food-name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('exp-date', document.getElementById('exp-date').value);

    try {
        console.log("unable to fetch");
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
