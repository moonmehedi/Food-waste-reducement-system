document.addEventListener('DOMContentLoaded', async () => {
    const email = await getSessionManagerId(); 
    console.log(email);

    if (!email) {
        console.error('No email found in localStorage.');
        return;
    }

    try {
        console.log('Email', email);
        const response = await fetch(`http://localhost:5000/users/request_history?email=${email}`);
        const requestData = await response.json();
        console.log('Request data:', requestData);

        const historyData = document.querySelector('.history-data');

        // Check if the server responded with a message (no request for today)
        if (requestData.message) {
            historyData.innerHTML = `<div><span class="value">${requestData.message}</span></div>`;
        } else if (response.ok) {
            let currentIndex = 0;  // Start with the first entry

            // Create a container for the request details
            const requestDetails = document.createElement('div');
            historyData.appendChild(requestDetails);

            // Function to update the display for a given index
           // Function to update the display for a given index
const updateDisplay = (index) => {
    const request = requestData[index]; 
    console.log('Current request:', request);


    requestDetails.classList.add('fade-out');

    
    setTimeout(() => {
        requestDetails.innerHTML = `
            <div><span>Number of People:</span> <span class="value">${request[0]}</span></div>
            <div><span>Date:</span> <span class="value">${request[1]}</span></div>
            <div><span>Status:</span> <span class="value">${request[2]}</span></div>
        `;

      
        requestDetails.classList.remove('fade-out');
        requestDetails.classList.add('fade-in');
        setTimeout(() => {
            requestDetails.classList.remove('fade-in');
        }, 500); 
    }, 500); 
};


            // Initial display
            updateDisplay(currentIndex);

            // Add "Next" and "Previous" buttons to navigate through the data
            const navigationButtons = document.createElement('div');
            navigationButtons.classList.add('navigation-buttons'); // Adding a class for styling
            navigationButtons.innerHTML = `
                <button id="prevRequest" class="nav-btn" disabled>Previous</button>
                <button id="nextRequest" class="nav-btn" ${currentIndex === requestData.length - 1 ? 'disabled' : ''}>Next</button>
            `;
            historyData.appendChild(navigationButtons);

            // Event listeners for the buttons
            document.getElementById('nextRequest').addEventListener('click', () => {
                if (currentIndex < requestData.length - 1) {
                    currentIndex++;
                    updateDisplay(currentIndex);
                    document.getElementById('prevRequest').disabled = false; // Enable the Previous button
                    if (currentIndex === requestData.length - 1) {
                        document.getElementById('nextRequest').disabled = true; // Disable Next if it's the last one
                    }
                }
            });

            document.getElementById('prevRequest').addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateDisplay(currentIndex);
                    document.getElementById('nextRequest').disabled = false; // Enable the Next button
                    if (currentIndex === 0) {
                        document.getElementById('prevRequest').disabled = true; // Disable Previous if it's the first one
                    }
                }
            });

        } else {
            console.error('Failed to fetch request history:', requestData.error);
        }
    } catch (error) {
        console.error('Error fetching request history:', error);
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
           return user.email;
       } else {
           console.error('Failed to fetch user info');
       }
   } catch (error) {
       console.error('Error fetching user info:', error);
   }
}
