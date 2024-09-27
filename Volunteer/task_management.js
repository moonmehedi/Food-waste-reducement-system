document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.getElementById('taskTableBody');

    try {
        const vid = await getSessionVolunteerId();  // Fetch session volunteer ID
        console.log('volunteer',vid);
        const response = await fetch(`http://127.0.0.1:5000/volunteer/getTasks?volunteer_id=${vid}`);
        const tasks = await response.json();  // Parse response as JSON
        console.log(tasks);
        
        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.requestId}</td>
                <td>${task.requestType}</td>
                <td>${task.emailAddress}</td>
                <td>${task.phone}</td>
                <td>${task.institutionType}</td>
                <td>${task.institutionName}</td>
                <td>${new Date(task.requestDate).toLocaleDateString()}</td>
                <td>
                    <button class="accept-btn" data-id="${task.requestId}" data-type="${task.requestType}">Accept</button>
                </td>
                <td>
                    <button class="reject-btn" data-id="${task.requestId}" data-type="${task.requestType}">Reject</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Handle Accept or Reject button click
        tableBody.addEventListener('click', async (event) => {
            if (event.target.classList.contains('accept-btn') || event.target.classList.contains('reject-btn')) {
                const requestId = event.target.getAttribute('data-id');
                const requestType = event.target.getAttribute('data-type');
                const status = event.target.classList.contains('accept-btn') ? 'Y' : 'N';  // Y for accepted, N for rejected
                
                console.log(`Request ID: ${requestId}, Request Type: ${requestType}, Status: ${status}`);

                await updateTaskStatus(requestId,requestType ,status);  // Update status in database
                removeTaskFromTable(event.target);  // Remove task from the table
            }
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
});

async function updateTaskStatus(requestId, requestType,status) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/volunteer/updateTaskStatus/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authenticity: status,reqType:requestType })
        });
        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        console.log(`Task ${requestId} status updated to ${status}`);
    } catch (error) {
        console.error('Error updating task status:', error);
    }
}

function removeTaskFromTable(button) {
    const row = button.closest('tr');
    row.remove();
}

async function getSessionVolunteerId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include'
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
