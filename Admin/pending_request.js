document.addEventListener('DOMContentLoaded', async () => {
    // Fetch pending requests and populate the table
    await fetchAndPopulateRequests();
    // Fetch food requests and populate the table
    await fetchAndPopulateFoodRequests();

    // Attach event listeners to dynamically generated buttons
    attachButtonListeners();
});

// Function to fetch and populate the pending requests table
async function fetchAndPopulateRequests() {
    try {
        const response = await fetch('http://localhost:5000/admin/pending-requests');
        const data = await response.json();
        const table = document.getElementById('combined-requests-table');
        console.log('combined requests', data);

        // Clear existing rows (except the header)
        table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

        // Populate table rows with data
        data.forEach((request, index) => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${request[1]}</td>
                <td>${request[2]}</td>
                <td>${request[3]}</td>
                <td>${request[4]}</td>
                <td>${request[5]}</td>
                <td>${request[6]}</td>
                <td>${request[7]}</td>
                <td>${request[8]}</td>
                <td><button class="btn-assign" data-id="${request[0]}" data-table="combined">Accept</button></td>
                <td><button class="btn-reject" data-id="${request[0]}" data-table="combined">Reject</button></td>
            `;
        });

        // Attach event listeners to the new buttons
        attachButtonListeners();

    } catch (error) {
        console.error('Error fetching pending requests:', error);
    }
}

// Function to fetch and populate the food requests table
async function fetchAndPopulateFoodRequests() {
    try {
        const response = await fetch('http://localhost:5000/admin/donor-food-donation-pending-requests');
        const data = await response.json();
        const table = document.getElementById('food-request-table');
        console.log('food requests', data);

        // Clear existing rows (except the header)
        table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

        // Populate table rows with data
        data.forEach((request, index) => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${request[1]}</td>
                <td>${request[2]}</td>
                <td><img src="${request[3]}" alt="Food Image" width="50"></td>
                <td>${request[4]}</td>
                <td>${request[5]}</td>
                <td>${request[6]}</td>
                <td>${request[7]}</td>
                <td><button class="btn-assign" data-id="${request[0]}" data-table="food">Accept</button></td>
                <td><button class="btn-reject" data-id="${request[0]}" data-table="food">Reject</button></td>
            `;
        });

        // Attach event listeners to the new buttons
        attachButtonListeners();

    } catch (error) {
        console.error('Error fetching food requests:', error);
    }
}

// Function to attach event listeners to buttons
function attachButtonListeners() {
    // Remove existing event listeners to avoid duplicate events
    const acceptButtons = document.querySelectorAll('.btn-assign');
    const rejectButtons = document.querySelectorAll('.btn-reject');

    acceptButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClickWrapper); // Remove previous listener
        button.addEventListener('click', handleButtonClickWrapper); // Add new listener
    });

    rejectButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClickWrapper); // Remove previous listener
        button.addEventListener('click', handleButtonClickWrapper); // Add new listener
    });
}

// Wrapper function to pass the event and action type
function handleButtonClickWrapper(event) {
    const action = event.target.classList.contains('btn-assign') ? 'Accept' : 'Reject';
    handleButtonClick(event, action);
}

// Function to get row data for a clicked button
function getRowData(button) {
    const row = button.closest('tr');
    const rowData = {};
    row.querySelectorAll('td').forEach((td, index) => {
        const headers = [
            'Request No',
            'Request Type',
            'Email Address',
            'Request Address',
            'Phone',
            'Institution Type',
            'Institution Name',
            'Request Date',
            'Authenticity'
        ];
        rowData[headers[index]] = td.innerText;
    });
    return rowData;
}

async function handleButtonClick(event, action) {
    const button = event.target;
    const id = button.getAttribute('data-id'); // Get ID from data-id attribute
    const table = button.getAttribute('data-table'); // Get table type
    const requestType = getRowData(button)['Request Type']; // Get request type from the row data

    console.log(`ID: ${id}, Table Type: ${table}, Request Type: ${requestType}, Action: ${action}`);

    const requestData = {
        id: id,
        requestType: requestType.trim(), // Ensure there's no extra space
        tableType: table,
        action: action // "Accept" or "Reject"
    };

    console.log('Request Data:', requestData);

    try {
        const response = await fetch('http://localhost:5000/admin/update-request-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (data.success) {
            // Remove the row from the table if the request was successful
            const row = button.closest('tr'); // Get the closest row of the clicked button
            row.remove(); // Remove the row from the table

            alert(`Request ${action}ed successfully.`);

            // Optionally refresh the table data
            if (table === 'combined') {
                await fetchAndPopulateRequests();
            } else if (table === 'food') {
                await fetchAndPopulateFoodRequests();
            }

        } else {
            alert(`Failed to ${action} the request: ${data.message}`);
        }
    } catch (error) {
        console.error(`Error ${action}ing request:`, error);
        alert(`An error occurred: ${error.message}`);
    }
}
