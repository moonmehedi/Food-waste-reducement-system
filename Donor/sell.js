document.querySelector('.sell-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('food-photo', document.getElementById('food-photo').files[0]);
    formData.append('food-name', document.getElementById('food-name').value);
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('exp-date', document.getElementById('date').value);
    formData.append('original-price', document.getElementById('original-price').value);
    formData.append('discounted-price', document.getElementById('discounted-price').value);

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
