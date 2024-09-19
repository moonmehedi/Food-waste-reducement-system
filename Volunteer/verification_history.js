document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById('VHtaskTableBody');
  
  try {
    const response = await fetch('http://localhost:5000/volunteer/getHistory');  // Fetch from the correct route
    const tasks = await response.json();  // Parse response as JSON

    // Iterate over the tasks and create table rows dynamically
    tasks.forEach(task => {
      const row = document.createElement('tr');

      row.innerHTML = `
         <td>${task.requestNo}</td>
                <td>${task.requestType}</td>
                <td>${task.emailAddress}</td>
                  <td>${task.requestAddress}</td>
                <td>${task.phone}</td>
                <td>${task.institutionType}</td>
                <td>${task.institutionName}</td>
                <td>${new Date(task.requestDate).toLocaleDateString()}</td>
        <td>${task.authenticity}</td>  <!-- authenticity -->
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching history:', error);
  }
});
