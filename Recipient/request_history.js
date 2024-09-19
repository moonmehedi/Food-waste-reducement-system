document.addEventListener('DOMContentLoaded', async () => {
    const email = await getSessionManagerId() // Get email from localStorage

    if (!email) {
        console.error('No email found in localStorage.');
        return;
    }

    try {
        console.log('Email', email);
        const response = await fetch(`http://localhost:5000/users/request_history?email=${email}`);
        const requestData = await response.json();
        console.log(requestData);

        if (response.ok) {
            const historyData = document.querySelector('.history-data');
            historyData.innerHTML = `<div>
            <div>
            <span>Institution Name:</span> <span class="value">${requestData[0]}</div>   <div></span>
                            <span>Institution Type:</span> <span class="value">${requestData[1]}</span>
                            </div>
                            <div>
                            <span>Number of People:</span> <span class="value">${requestData[2]}</span>
                            </div>
                            <div>
                            <span>Date:</span> <span class="value">${requestData[3]}</span>
                            </div>
                              <div>
                            <span>Status</span> <span class="value">Pending</span>
                            </div>

                            </div>
                            `;

                // historyData.innerHTML = `
                //     <img src="" alt="Food Image" class="card-image">
                //     <div class="card-content">
                //         <div>
                //             <span>Institution Name:</span> <span class="value">${requestData.institutionName}</span><br>
                //             <span>Institution Type:</span> <span class="value">${requestData.institutionType}</span><br>
                //             <span>Number of People:</span> <span class="value">${requestData.numberOfPeople}</span><br>
                //             <span>Date:</span> <span class="value">${requestData.date}</span><br>

                //              <span>Status:</span> <span class="value">${request.status}</span>
                             
                //         </div>
                //     </div>
                // `;

            // Initialize Swiper after dynamic content is loaded
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
           console.log('the email address',user.email);
       } else {
           console.error('Failed to fetch user info');
       }
   } catch (error) {
       console.error('Error fetching user info:', error);
   }
}