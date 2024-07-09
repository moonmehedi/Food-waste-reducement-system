document.getElementById('load-donation').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/admin/donation');
        const data = await response.json();

        const table = document.getElementById('donations-table');

        // Clear existing rows except for the header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        data.forEach(volunteer => {
            const row = table.insertRow();
            row.insertCell(0).innerText = volunteer[0]; // No
            row.insertCell(1).innerText = volunteer[1]; // donor Name
            row.insertCell(2).innerText = volunteer[2]; // food name
            row.insertCell(3).innerText = volunteer[3]; // Food Image
            row.insertCell(4).innerText = volunteer[4]; // food quantity
            row.insertCell(5).innerText = volunteer[5] ? new Date(volunteer[5]).toLocaleDateString() : ""; // date of donation
            row.insertCell(5).innerText = volunteer[6] ? new Date(volunteer[6]).toLocaleDateString() : ""; // exp date
        });
    } catch (error) {
        console.error('Error loading volunteers:', error);
    }
});
