document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btn-assign').forEach(button => {
        button.addEventListener('click', () => handleRequest(button, 'accept'));
    });

    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', () => handleRequest(button, 'reject'));
    });
});

function handleRequest(button, action) {
    const requestId = button.dataset.request;

    fetch(`/api/requests/${requestId}/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requestId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const row = button.closest('tr');
            if (action === 'accept') {
                row.querySelector('td:nth-child(10)').innerText = 'Accepted';
                row.querySelector('td:nth-child(11)').innerText = ''; // Clear reject button
            } else if (action === 'reject') {
                row.querySelector('td:nth-child(10)').innerText = ''; // Clear accept button
                row.querySelector('td:nth-child(11)').innerText = 'Rejected';
            }
        } else {
            alert('Failed to update request: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the request.');
    });
}
