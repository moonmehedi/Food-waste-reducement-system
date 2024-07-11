document.getElementById('collapsible-button').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/admin/recipients');
        const data = await response.json();
        console.log(data);
        const table = document.getElementById('recipient-table');

        // Clear existing rows except for the header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        data.forEach(recipient => {
            const row = table.insertRow();
            row.insertCell(0).innerText = recipient[0]; // No
            row.insertCell(1).innerText = recipient[1]; // Email
            row.insertCell(2).innerText = recipient[2]; // Institution Name
            row.insertCell(3).innerText = recipient[3]; // Institution Type
            row.insertCell(4).innerText = recipient[4]; // Number of People
            row.insertCell(5).innerText = recipient[5];
            row.insertCell(6).innerText = recipient[6] ? new Date(recipient[6]).toLocaleDateString() : ""; // Date
        });
    } catch (error) {
        console.error('Error loading recipients:', error);
    }
});
