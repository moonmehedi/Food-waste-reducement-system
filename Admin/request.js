let count = 0;
let task; // Declare task globally
let phone;
let food_id;
let requestId;
let food_res



document.addEventListener('DOMContentLoaded', async function() {
    // Handle collapsible elements
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
    }

    // Handle profile modal
    var profileIcon = document.getElementById('profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            var modal = document.getElementById('profile-modal');
            var overlay = document.getElementById('overlay');
            var isVisible = (modal.style.display === 'block');
            modal.style.display = isVisible ? 'none' : 'block';
            overlay.style.display = isVisible ? 'none' : 'block';
        });
    }

    // Function to debounce clicks
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const combinedRequestsTable = document.getElementById('combined-requests-table');
    const volunteersTable = document.getElementById('volunteers-table');
    const foodRequestsTable = document.getElementById('food-requests-table');

    // Function to attach event listeners to all .btn-assign buttons
    function attachAssignButtonListeners() {
        document.querySelectorAll('.btn-assign').forEach(function(button) {
            button.addEventListener('click', function() {
                requestId = this.getAttribute('data-request');
                console.log(requestId);
                const table = this.closest('table');

                if (table.id === 'combined-requests-table') {
                    // If the button is in the combined requests table, get the request type
                    task = this.closest('tr').querySelector('td:nth-child(2)').innerText; // Request Type
                    phone = this.closest('tr').querySelector('td:nth-child(5)').innerText; // Request Type
                    
                } else if (table.id === 'food-requests-table') {
                    // If the button is in the food requests table, get the food name
                    task = 'food';
                    phone=get_food_id();
                }
    
                console.log("Task: ", task);
                //event listener
                document.querySelectorAll('.btn-choose').forEach(function(button) {
                    button.removeEventListener('click', chooseButtonHandler); // Remove old listeners
                    button.addEventListener('click', chooseButtonHandler); // Add new listener
                });
                document.getElementById('volunteer-modal').style.display = 'flex';
                document.getElementById('overlay').style.display = 'block';
            });
        });
    }

    // Function to handle choose button click
    async function chooseButtonHandler() {
        const volunteerNumber = this.closest('tr').querySelector('td:nth-child(6)').innerText;
        const managerId = await getSessionManagerId(); // Fetch the manager ID from session

        console.log("got", managerId, volunteerNumber, task, phone);

        try {
            const response = await fetch('http://localhost:5000/admin/assign-volunteer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ managerId, volunteerNumber, task ,phone}),
            });

            const result = await response.json();
            if (result.success) {
                alert('Volunteer assigned successfully!');
                if (task === 'food') {
                    // If task is 'food', remove the row from the food requests table
                    removeRowFromTable(foodRequestsTable, requestId);
                } else {
                    // Otherwise, remove the row from the combined requests table
                    removeRowFromTable(combinedRequestsTable, requestId);
                }
                closeVolunteerModal();
            } else {
                console.log(result);
                if (result.err==1) {
                    alert(result.message);  // Display the err
                    
                const volunteerRow = this.closest('tr');
                volunteerRow.parentNode.removeChild(volunteerRow);
                } else {
                    alert('Failed to assign volunteer.');
                }
    
                closeVolunteerModal();
            }
        } catch (error) {
            console.error('Error assigning volunteer:', error);
        }
    }

    // Fetch and display combined requests
    try {
        const response = await fetch('http://localhost:5000/admin/combined-requests');
        const combinedRequests = await response.json();
        combinedRequests.forEach((request, index) => {
            const row = document.createElement('tr');
            row.innerHTML =
                `<td>${index + 1}</td>
                <td>${request[0]}</td>
                <td>${request[1]}</td>
                <td>${request[2]}</td>
                <td>${request[3]}</td>
                <td>${request[4]}</td>
                <td>${request[5]}</td>
                <td>${new Date(request[6]).toLocaleDateString()}</td>
                <td><button class="btn-assign" data-request="${index + 1}">Assign</button></td>`;
            combinedRequestsTable.appendChild(row);
        });
        attachAssignButtonListeners(); // Attach listeners after rows are added
    } catch (error) {
        console.error('Error fetching combined requests:', error);
    }

    // Fetch and display available volunteers
    try {
        const response = await fetch('http://localhost:5000/admin/available-volunteers');
        const availableVolunteers = await response.json();
        availableVolunteers.forEach(volunteer => {
            const row = document.createElement('tr');
            row.innerHTML =
                `<td>${volunteer[0]}</td>
                <td>${volunteer[1]}</td>
                <td>${volunteer[2]}</td>
                <td>${volunteer[3]}</td>
                <td>${volunteer[4]}</td>
                <td>${volunteer[5]}</td>
                <td><button class="btn-choose" data-volunteer="${volunteer[0]}">Choose</button></td>`;
            volunteersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching available volunteers:', error);
    }

    // Fetch and display food donation requests
    try {
        const response = await fetch('http://localhost:5000/admin/donor-food-donation-requests');
        const foodRequests = await response.json();
       // console.log(foodRequests[0][0]); 
       food_res=foodRequests;
        foodRequests.forEach((request, index) => {
            const row = document.createElement('tr');
            row.innerHTML =
                `<td>${index + 1}</td>
                <td>${request[1]}</td>
                <td>${request[2]}</td>
                <td><img src="Images/${request[3]}" alt="Food Image" width="50"></td>
                <td>${request[4]}</td>
                <td>${new Date(request[5]).toLocaleDateString()}</td>
                <td>${new Date(request[6]).toLocaleDateString()}</td>
                <td><button class="btn-assign" data-request="${index + 1}">Assign</button></td>`;
            foodRequestsTable.appendChild(row);
        });
        attachAssignButtonListeners(); // Attach listeners after rows are added
    } catch (error) {
        console.error('Error fetching food donation requests:', error);
    }

    // Handle close button in volunteer modal
    var closeVolunteerModalButton = document.getElementById('close-volunteer-modal');
    if (closeVolunteerModalButton) {
        closeVolunteerModalButton.addEventListener('click', function() {
            closeVolunteerModal();  // Call the function to hide the modal and overlay
        });
    }
    

    // Close the profile modal when clicking outside of it
    window.addEventListener('click', function(event) {
        var profileModal = document.getElementById('profile-modal');
        var overlay = document.getElementById('overlay');
        if (event.target === overlay && profileModal && profileModal.style.display === 'block') {
            profileModal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

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
});



function get_food_id(){
//req_id returns which row of table selected    
//index 0 of that row contains food id
return food_res[requestId-1][0];
}



function removeRowFromTable(table, requestId) {
    // Iterate through the table rows to find the matching request ID and remove the row
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (row.querySelector('.btn-assign')?.getAttribute('data-request') == requestId) {
            row.parentNode.removeChild(row); // Remove the row
            break;
        }
    }
}

// Helper function to close the volunteer modal
function closeVolunteerModal() {
    var volunteerModal = document.getElementById('volunteer-modal');
    var overlay = document.getElementById('overlay');
    if (volunteerModal && overlay) {
        volunteerModal.style.display = 'none';  // Hide modal
        overlay.style.display = 'none';  // Hide overlay
    }
}
