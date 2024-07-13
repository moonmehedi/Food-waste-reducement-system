document.getElementById('load-volunteers').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/admin/volunteers');
        const data = await response.json();

        const table = document.getElementById('volunteer-table');

        // Clear existing rows except for the header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        data.forEach(volunteer => {
            const row = table.insertRow();
            row.insertCell(0).innerText = volunteer[0]; // No
            row.insertCell(1).innerText = volunteer[1]; // Name
            row.insertCell(2).innerText = volunteer[2]; // Email
            row.insertCell(3).innerText = volunteer[3] ? new Date(volunteer[3]).toLocaleDateString() : ""; // Date of Birth
            row.insertCell(4).innerText = volunteer[4]; // Address
            row.insertCell(5).innerText = volunteer[5]; // Phone
        });
    } catch (error) {
        console.error('Error loading volunteers:', error);
    }
});
