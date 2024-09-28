document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.getElementById('taskTableBody');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchBarContainer = document.getElementById('search-bar-container');

    // Fetch and display tasks, optionally based on a search term
    async function fetchTasks(searchTerm = '') {
        try {
            const vid = await getSessionVolunteerId();
            console.log('volunteer', vid);

            const url = searchTerm 
                ? `http://127.0.0.1:5000/volunteer/getTasks?volunteer_id=${vid}&search=${encodeURIComponent(searchTerm)}` 
                : `http://127.0.0.1:5000/volunteer/getTasks?volunteer_id=${vid}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching tasks');
            }

            const tasks = await response.json();
            console.log(tasks);

            displayTasks(tasks);  // Call a function to render tasks in the table

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    // Function to display tasks in the table
    function displayTasks(tasks) {
        tableBody.innerHTML = ''; // Clear previous rows
        if (tasks.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="9">No tasks found</td>`;
            tableBody.appendChild(emptyRow);
            return;
        }

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
    }

    // Initially load all tasks
    fetchTasks();

    // Add event listener to search button
    searchBtn.addEventListener('click', function() {
        searchBarContainer.style.display = searchBarContainer.style.display === 'none' ? 'flex' : 'none';
        
        // Clear previous search results when search bar is opened
        searchInput.value = '';
        fetchTasks();  // Load all tasks when opening the search bar
    });

    // Add event listener for search input field to trigger search as the user types
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        fetchTasks(searchTerm);  // Fetch filtered tasks based on the user's input
    });

    // Add event listener to accept/reject buttons
    tableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('accept-btn') || event.target.classList.contains('reject-btn')) {
            const requestId = event.target.getAttribute('data-id');
            const requestType = event.target.getAttribute('data-type');
            const status = event.target.classList.contains('accept-btn') ? 'Y' : 'N';

            console.log(`Request ID: ${requestId}, Request Type: ${requestType}, Status: ${status}`);

            await updateTaskStatus(requestId, requestType, status);  // Update status in the database
            removeTaskFromTable(event.target);  // Remove task from the table
        }
    });
});

// Helper function to update task status in the database
async function updateTaskStatus(requestId, requestType, status) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/volunteer/updateTaskStatus/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authenticity: status, reqType: requestType })
        });
        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        console.log(`Task ${requestId} status updated to ${status}`);
    } catch (error) {
        console.error('Error updating task status:', error);
    }
}

// Function to remove task from the table after updating status
function removeTaskFromTable(button) {
    const row = button.closest('tr');
    row.remove();
}

// Fetch session volunteer ID
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
