document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/verified-donors');
      const donors = await response.json();
  
      const tableBody = document.getElementById('donor-table-body');
      tableBody.innerHTML = ''; // Clear existing rows
      console.log(donors)
      donors.forEach((donor, index) => {
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${donor[0]}</td>
          <td>${donor[1]}</td>
          <td>${donor[2]}</td>
          <td>${donor[3]}</td>
          <td>${donor[4]}</td>
          <td>${new Date(donor[5]).toLocaleDateString()}</td>
          <td><button class="btn-assign">Distribute</button></td>
        `;
  
        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error('Error fetching verified donors:', err);
    }

  });
  