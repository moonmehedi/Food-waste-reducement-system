document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("table tbody");  // Select the <tbody>

  try {
    const response = await fetch("http://localhost:5000/verification_history");
    if (!response.ok) throw new Error("Failed to fetch data");
    console.log(response);
    const data = await response.json();
    tableBody.innerHTML = ""; // Clear previous rows

    data.forEach((row, index) => {
      const tableRow = `
        <tr>
          <td>${index + 1}</td>
          <td>${row[0]}</td> <!-- Request Type -->
          <td>${row[1]}</td> <!-- Username -->
          <td>${row[2]}</td> <!-- Email Address -->
          <td>${row[3]}</td> <!-- Request Address -->
          <td>${row[4]}</td> <!-- Phone -->
          <td>${row[5]}</td> <!-- Institution Type -->
          <td>${row[6]}</td> <!-- Institution Name -->
          <td>${new Date(row[7]).toLocaleDateString()}</td> <!-- Request Date -->
          <td>${row[8]}</td> <!-- Authenticity -->
        </tr>
      `;
      tableBody.innerHTML += tableRow;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
