document.addEventListener('DOMContentLoaded', function () {
    const customerId = localStorage.getItem('NID');
    const cartItemsContainer = document.getElementById('cart-items');

    // Fetch cart data as you are already doing
    fetch('http://localhost:5000/customer/cart', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerId })
    })
    .then(response => response.json())
    .then(data => {
        cartItemsContainer.innerHTML = ''; // Clear previous items

        if (data.length === 0) {
            cartItemsContainer.innerHTML = `<p>Your cart is empty</p>`;
            return;
        }

        data.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-food-id', item.foodId);

            const originalPrice = item.originalPrice || 0;
            const discountAmount = item.discountAmount || 0;
            const discountPercentage = originalPrice > 0 ? ((discountAmount / originalPrice) * 100).toFixed(2) : 0;

            cartItem.innerHTML = `
                <div class="box">
                    <a href="#" class="fas fa-times delete-item" data-food-id="${item.foodId}"></a>
                    <img src="data:image/jpeg;base64,${item.foodImage}" alt="${item.foodName}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
                    <div class="name">${item.foodName}</div>
                    <div class="name">Seller: <p class="seller-name">${item.sellerName}</p></div>
                    <div class="price">Original Price: $${originalPrice}</div>
                    <div class="price">Discounted Price: $${item.discountedPrice}</div>
                    <div class="price">Discount: ${discountPercentage}%</div>
                    <form action="" method="post">
                        <input type="number" min="1" name="cart_quantity" value="1">
                    </form> 
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listener for delete buttons after items are rendered

        function removeFromCart(customerId, foodId, cartItemElement) {
            // Send a request to the server to update the SELLS table
            fetch('http://localhost:5000/customer/cart/remove', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerId, foodId })  // Send customerId and foodId to remove item
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Remove the item from the UI
                    cartItemElement.remove();
                } else {
                    console.error('Failed to remove item from cart:', result.message);
                }
            })
            .catch(error => console.error('Error removing item from cart:', error));
        }
        const deleteButtons = document.querySelectorAll('.delete-item');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent the default anchor behavior
                const foodId = this.getAttribute('data-food-id');

                // Call function to remove the item from the cart
                removeFromCart(customerId, foodId, this.closest('.cart-item'));
            });
        });
    })
    .catch(error => console.error('Error fetching cart data:', error));
    
});
