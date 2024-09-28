document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.getElementById('VHtaskTableBody');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchBarContainer = document.getElementById('search-bar-container');

    async function fetchTasks(searchTerm = '') {
        try {
            const vid = await getSessionVolunteerId();
            console.log('volunteer', vid);

            const url = searchTerm 
                ? `http://127.0.0.1:5000/volunteer/getHistory?volunteer_id=${vid}&search=${encodeURIComponent(searchTerm)}` 
                : `http://127.0.0.1:5000/volunteer/getHistory?volunteer_id=${vid}`;  // Fixed `==` to `=`

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
                <td>${task.requestAddress}</td>  <!-- Added requestAddress here -->
                <td>${task.phone}</td>
                <td>${task.institutionType}</td>
                <td>${task.institutionName}</td>
                <td>${new Date(task.requestDate).toLocaleDateString()}</td>
                <td>${task.authenticity}</td>  <!-- authenticity status -->
            `;
            tableBody.appendChild(row);
        });
    }

    // Initially load all tasks
    fetchTasks();

    searchBtn.addEventListener('click', function() {
        searchBarContainer.style.display = searchBarContainer.style.display === 'none' ? 'flex' : 'none';
        
        // Clear previous search results when search bar is opened
        searchInput.value = '';
        fetchTasks();  // Load all tasks when opening the search bar
    });

    // Add event listener for search input field to trigger search as the user types
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        fetchTasks(searchTerm);  // Fetch filtered tasks based on the user's input
    });

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
});
