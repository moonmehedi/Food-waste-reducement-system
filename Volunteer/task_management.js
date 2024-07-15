
document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("table tbody");
  
    try {
      const response = await fetch("http://localhost:5000/assigned_tasks/1"); // Replace with your volunteer ID
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
  
      // Clear existing table rows
      tableBody.innerHTML = "";
  
      // Populate table with fetched data
      data.forEach((task, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${task.REQUEST_TYPE}</td>
            <td>${task.EMAIL_ADDRESS}</td>
            <td>${task.REQUEST_ADDRESS}</td>
            <td>${task.PHONE}</td>
            <td>${task.INSTITUTION_TYPE}</td>
            <td>${task.INSTITUTION_NAME}</td>
            <td>${new Date(task.REQUEST_DATE).toLocaleDateString()}</td>
            <td><button class="btn-assign" data-request="${index + 1}">Accept</button></td>
            <td><button class="btn-reject" data-request="${index + 1}">Reject</button></td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error - show a message or retry logic
    }
  });
  