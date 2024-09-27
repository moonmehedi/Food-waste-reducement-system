document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById('VHtaskTableBody');

  try {
      const vid = await getSessionVolunteerId();  // Fetch the session volunteer ID
      console.log('volunteer',vid);
      const response = await fetch(`http://127.0.0.1:5000/volunteer/getHistory?volunteer_id=${vid}`);
      const tasks = await response.json();  // Parse response as JSON
      console.log(tasks);

      tasks.forEach(task => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${task.requestId}</td>
              <td>${task.requestType}</td>
              <td>${task.emailAddress}</td>
              <td>${task.requestAddress}</td>
              <td>${task.phone}</td>
              <td>${task.institutionType}</td>
              <td>${task.institutionName}</td>
              <td>${new Date(task.requestDate).toLocaleDateString()}</td>
              <td>${task.authenticity}</td>  <!-- authenticity status -->
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching verification history:', error);


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

