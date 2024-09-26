document.addEventListener('DOMContentLoaded', function() {
    const orderContainer = document.querySelector('.order-container');
    const customerId = localStorage.getItem('NID'); // Retrieve customer ID from localStorage

    if (!customerId) {
        console.error('Customer ID not found in localStorage');
        orderContainer.innerHTML = '<p>Please log in to view your order history.</p>';
        return;
    }

    // Fetch order history for the customer
    fetchOrders(customerId);

    function fetchOrders(nid) {
        fetch(`http://localhost:5000/customer/orders?nid=${nid}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    orderContainer.innerHTML = '<p>No orders found.</p>';
                } else {
                    displayOrders(data);
                }
            })
            .catch(error => console.error('Error fetching order data:', error));
    }

    // Function to display order items
    function displayOrders(orders) {
        orderContainer.innerHTML = ''; // Clear existing content

        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');

            orderCard.innerHTML = `
                <h3>Order No: ${order.orderId}</h3>
                <p><strong>Food Name:</strong> ${order.foodName}</p>
                <p><strong>Order Quantity:</strong> ${order.orderQuantity}</p>
                <p><strong>Food Quantity Available:</strong> ${order.foodQuantity}</p>
                <p><strong>Order Status:</strong> <span class="status ${order.orderStatus.toLowerCase()}">${order.orderStatus}</span></p>
                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Seller Name:</strong> ${order.donorName}</p>
            `;

            orderContainer.appendChild(orderCard);
        });
    }
});
