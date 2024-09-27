document.addEventListener('DOMContentLoaded', function () {
    // Handle collapsible elements
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function () {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }

    // Handle profile modal
    var profileIcon = document.getElementById('profile-icon');
    var profileModal = document.getElementById('profile-modal');
    var volunteerModal = document.getElementById('volunteer-modal');
    var overlay = document.getElementById('overlay');

    if (profileIcon) {
        profileIcon.addEventListener('click', function () {
            if (profileModal.style.display === 'none' || profileModal.style.display === '') {
                profileModal.style.display = 'block';
                overlay.style.display = 'block';
            } else {
                profileModal.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }

    // Close modals when clicking outside of them
    window.addEventListener('click', function (event) {
        if (event.target === overlay) {
            if (profileModal && profileModal.style.display === 'block') {
                profileModal.style.display = 'none';
            }
            if (volunteerModal && volunteerModal.style.display === 'flex') {
                volunteerModal.style.display = 'none';
            }
            overlay.style.display = 'none';
        }
    });

    // Handle close button in volunteer modal
    var closeVolunteerModal = document.getElementById('close-volunteer-modal');
    if (closeVolunteerModal) {
        closeVolunteerModal.addEventListener('click', function () {
            volunteerModal.style.display = 'none';
            overlay.style.display = 'none';
        });
    }

    // Fetch and display data
    fetchAndDisplayData();
});

// Global variables to store selected values
let selectedFoodId = null; // Renamed to clarify that this represents the food_id
let selectedRecipientId = null;
let selectedReqId = null;

// Function to fetch and display combined requests
async function fetchAndDisplayCombinedRequests() {
    const combinedRequestsTable = document.getElementById('donation-table');
    try {
        const response = await fetch('http://localhost:5000/admin/verified-food');
        const combinedRequests = await response.json();
        console.log(combinedRequests);
        combinedRequests.forEach((request, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${request[0]}</td>
            <td>${request[1]}</td>
            <td><img src="data:image/jpeg;base64,${request[2]}" alt="${request[1]}" class="food-image" width="50"></td>
            <td>${request[3]}</td>
            <td>${new Date(request[4]).toLocaleDateString()}</td>
            <td>${new Date(request[5]).toLocaleDateString()}</td>
            <td><button class="btn-assign" data-food-id="${request[6]}" data-req-id="${request[7]}">Distribute</button></td>
            `;
            combinedRequestsTable.appendChild(row);
        });
        attachAssignButtonListeners(); // Attach listeners after rows are added
    } catch (error) {
        console.error('Error fetching combined requests:', error);
    }
}

// Function to fetch and display available recipients
async function fetchAndDisplayAvailableRecipients() {
    const volunteersTable = document.getElementById('volunteers-table');
    try {
        const response = await fetch('http://localhost:5000/admin/requested-recipients');
        const availableVolunteers = await response.json();
        console.log(availableVolunteers);
        availableVolunteers.forEach(recipient => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${recipient[0]}</td>
            <td>${recipient[1]}</td>
            <td>${recipient[2]}</td>
            <td>${recipient[3]}</td>
            <td>${recipient[4]}</td>
            <td>${recipient[5] ? new Date(recipient[5]).toLocaleDateString() : ''}</td>
            <td><button class="btn-choose" data-recipient="${recipient[6]}" data-req-id="${recipient[7]}">Choose</button></td>
            `;
            volunteersTable.appendChild(row);
        });

        // Attach event listeners to all .btn-choose buttons
        document.querySelectorAll('.btn-choose').forEach(function (button) {
            button.addEventListener('click', function () {
                selectedRecipientId = this.getAttribute('data-recipient');
                selectedReqId = this.getAttribute('data-req-id'); // Store REQ_ID from data attribute
                console.log('Selected Recipient ID:', selectedRecipientId);
                console.log('Selected Request ID:', selectedReqId);
                // After selecting a recipient, send the data to backend
                assignFoodToRecipient();
            });
        });
    } catch (error) {
        console.error('Error fetching available volunteers:', error);
    }
}

// Function to attach event listeners to all .btn-assign buttons
function attachAssignButtonListeners() {
    document.querySelectorAll('.btn-assign').forEach(function (button) {
        button.addEventListener('click', function () {
            selectedFoodId = this.getAttribute('data-food-id'); // Use 'selectedFoodId' instead of 'selectedRequestId'
            console.log('Selected Food ID:', selectedFoodId);
            document.getElementById('volunteer-modal').style.display = 'flex';
            document.getElementById('overlay').style.display = 'block';
        });
    });
}

// Function to fetch and display data
async function fetchAndDisplayData() {
    await fetchAndDisplayCombinedRequests();
    await fetchAndDisplayAvailableRecipients();
}

// Function to get manager ID from session
async function getSessionManagerId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
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

// Function to send food assignment details to the backend
async function assignFoodToRecipient() {
    if (!selectedFoodId || !selectedRecipientId || !selectedReqId) { // Check for all values
        console.error('Food, recipient, and REQ ID must be selected.');
        return;
    }

    try {
        const managerId = await getSessionManagerId();
        if (!managerId) {
            console.error('Manager ID could not be retrieved.');
            return;
        }

        // Fetching food quantity and number of people from their respective tables
        const selectedRequestRow = document.querySelector(`.btn-assign[data-food-id="${selectedFoodId}"]`).closest('tr');
        const foodQuantity = selectedRequestRow.querySelector('td:nth-child(5)').textContent; // Assuming quantity is in column 5
        const selectedRecipientRow = document.querySelector(`.btn-choose[data-recipient="${selectedRecipientId}"]`).closest('tr');
        const numberOfPeople = selectedRecipientRow.querySelector('td:nth-child(4)').textContent; // Assuming number of people is in column 4

        const payload = {
            manager_id: managerId,
            food_id: selectedFoodId,
            recipient_id: selectedRecipientId,
            req_id: selectedReqId, // Include the REQ_ID in the payload
            food_quantity: foodQuantity,
            number_of_people: numberOfPeople
        };

        // Log the payload for verification
        console.log('Payload being sent to backend:', payload);

        const response = await fetch('http://127.0.0.1:5000/admin/assign-food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Food assignment successful.');
            // Optionally close modal and provide feedback to user
            document.getElementById('volunteer-modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        } else {
            console.error('Failed to assign food.');
        }
    } catch (error) {
        console.error('Error assigning food:', error);
    }
}
