document.addEventListener('DOMContentLoaded', function() {
    // Handle collapsible elements
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
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
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            var modal = document.getElementById('profile-modal');
            var overlay = document.getElementById('overlay');
            if (modal.style.display === 'none' || modal.style.display === '') {
                modal.style.display = 'block';
                overlay.style.display = 'block';
            } else {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }

});

document.addEventListener('DOMContentLoaded', async () => {
    const combinedRequestsTable = document.getElementById('combined-requests-table');
    const volunteersTable = document.getElementById('volunteers-table');
    const foodRequestsTable = document.getElementById('food-requests-table');

    // Function to attach event listeners to all .btn-assign buttons
    function attachAssignButtonListeners() {
        document.querySelectorAll('.btn-assign').forEach(function(button) {
            button.addEventListener('click', function() {
                var requestId = this.getAttribute('data-request');
                document.querySelectorAll('.btn-choose').forEach(function(chooseButton) {
                    chooseButton.setAttribute('data-request', requestId);
                });
                document.getElementById('volunteer-modal').style.display = 'flex';
                document.getElementById('overlay').style.display = 'block';
            });
        });
    }

    // Fetch and display combined requests
    try {
        const response = await fetch('http://localhost:5000/admin/combined-requests');
        const combinedRequests = await response.json();
        console.log(combinedRequests);
        combinedRequests.forEach((request, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${request[0]}</td>
                <td>${request[1]}</td>
                <td>${request[2]}</td>
                <td>${request[3]}</td>
                <td>${request[4]}</td>
                <td>${request[5]}</td>
                <td>${new Date(request[6]).toLocaleDateString()}</td>
                <td><button class="btn-assign" data-request="${index + 1}">Assign</button></td>
            `;
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
            row.innerHTML = `
                <td>${volunteer[0]}</td>
                <td>${volunteer[1]}</td>
                <td>${volunteer[2]}</td>
                <td>${volunteer[3]}</td>
                <td>${volunteer[4]}</td>
                <td>${volunteer[5]}</td>
                <td><button class="btn-choose" data-volunteer="${volunteer[0]}">Choose</button></td>
            `;
            volunteersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching available volunteers:', error);
    }

    // Fetch and display food donation requests
    try {
        const response = await fetch('http://localhost:5000/admin/donor-food-donation-requests');
        const foodRequests = await response.json();
        foodRequests.forEach((request, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${request[1]}</td>
                <td>${request[2]}</td>
                <td><img src="Images/${request[3]}" alt="Food Image" width="50"></td>
                <td>${request[4]}</td>
                <td>${new Date(request[5]).toLocaleDateString()}</td>
                <td>${new Date(request[6]).toLocaleDateString()}</td>
                <td><button class="btn-assign" data-request="${index + 1}">Assign</button></td>
            `;
            foodRequestsTable.appendChild(row);
        });
        attachAssignButtonListeners(); // Attach listeners after rows are added
    } catch (error) {
        console.error('Error fetching food donation requests:', error);
    }
    



    // Handle close button in volunteer modal
    var closeVolunteerModal = document.getElementById('close-volunteer-modal');
    if (closeVolunteerModal) {
        closeVolunteerModal.addEventListener('click', function() {
            var volunteerModal = document.getElementById('volunteer-modal');
            var overlay = document.getElementById('overlay');
            if (volunteerModal.style.display === 'flex') {
                volunteerModal.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }

    // Close the profile modal when clicking outside of it
    window.addEventListener('click', function(event) {
        var profileModal = document.getElementById('profile-modal');
        var overlay = document.getElementById('overlay');
        if (event.target === overlay) {
            if (profileModal && profileModal.style.display === 'block') {
                profileModal.style.display = 'none';
                overlay.style.display = 'none';
            }
        }
    });
});


