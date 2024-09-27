document.addEventListener('DOMContentLoaded', function () {
    const checkoutButton = document.getElementById('checkout-button');
    console.log('Checkout Button:', checkoutButton); // Check if the button exists

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            console.log('Checkout button clicked'); // Verify button click works
            
            const cartItems = [];

            // Use querySelectorAll to find all cart-item elements
            document.querySelectorAll('.cart-item').forEach(item => {
                const foodId = item.getAttribute('data-food-id');  // Retrieve foodId
                console.log('Retrieved foodId:', foodId); 
                console.log('Cart Item:', item);
                const sellerName = item.querySelector('.seller-name').textContent;
                const quantity = item.querySelector('input[name="cart_quantity"]').value;

                cartItems.push({ foodId, sellerName, quantity });
            });

            const customerId = localStorage.getItem('NID'); // Ensure this is fetched again
            if (!customerId) {
                alert('You must be logged in to checkout.');
                return;
            }

            // Send checkout request to the backend
            fetch('http://localhost:5000/customer/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerId, cartItems })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(`Checkout failed: ${data.error}`);
                } else {
                    alert('Checkout successful!');
                }
            })
            .catch(error => console.error('Error during checkout:', error));
        });
    } else {
        console.error('Checkout button not found!');
    }
});