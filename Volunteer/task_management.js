document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('taskTableBody');
    
    try {
        const response = await fetch('http://localhost:5000/volunteer/getTasks'); // Request data from the backend
        const tasks = await response.json(); // Parse the response as JSON

        console.log(tasks);
        tasks.forEach(task => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${task.requestNo}</td>
                <td>${task.requestType}</td>
                <td>${task.emailAddress}</td>
                <td>${task.phone}</td>
                <td>${task.institutionType}</td>
                <td>${task.institutionName}</td>
                <td>${new Date(task.requestDate).toLocaleDateString()}</td>
                <td><button class="accept-btn" data-id="${task.requestNo}">Accept</button></td>
                <td><button class="reject-btn" data-id="${task.requestNo}">Reject</button></td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.accept-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const requestId = event.target.dataset.id;
                await fetch(`http://localhost:5000/acceptTask/${requestId}`, { method: 'POST' });
                alert('Task Accepted');
            });
        });

        document.querySelectorAll('.reject-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const requestId = event.target.dataset.id;
                await fetch(`http://localhost:5000/rejectTask/${requestId}`, { method: 'POST' });
                alert('Task Rejected');
            });
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
});