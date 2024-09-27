document.addEventListener('DOMContentLoaded', async () => {
    const sessionEmail = await getSessionManagerId();
    console.log(sessionEmail);

    if (!sessionEmail) {
        console.error('No email found in localStorage.');
        return;
    }

    try {
        console.log('Session Email', sessionEmail);
        const response = await fetch(`http://localhost:5000/users/history?email=${sessionEmail}`);
        const requestHistoryData = await response.json();
        console.log('Request History Data:', requestHistoryData);

        const historyContainer = document.querySelector('.history-data');

        // Check if the server responded with a message (no request for today)
        if (requestHistoryData.message) {
            historyContainer.innerHTML = `<div><span class="value">${requestHistoryData.message}</span></div>`;
        } else if (response.ok) {
            // Create a table to display request history
            const table = document.createElement('table');
            table.classList.add('history-table');
            
            // Create the header row
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
              
                <th>Number of People</th>
                <th>Date</th>
                
            `;
            table.appendChild(headerRow);

            // Populate the table with data
            requestHistoryData.forEach(request => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${request[0]}</td>
                    <td>${request[1]}</td>
                  
                  
                `;
                table.appendChild(row);
            });

            // Append the table to the history container
            historyContainer.appendChild(table);
        } else {
            console.error('Failed to fetch request history:', requestHistoryData.error);
        }
    } catch (error) {
        console.error('Error fetching request history:', error);
    }
});

// Function to get Session ID from session
async function getSessionManagerId() {
   try {
       const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
           method: 'GET',
           credentials: 'include' // Ensure cookies are sent with the request
       });
       if (response.ok) {
           const userInfo = await response.json();
           return userInfo.email;
       } else {
           console.error('Failed to fetch user info');
       }
   } catch (error) {
       console.error('Error fetching user info:', error);
   }
}
