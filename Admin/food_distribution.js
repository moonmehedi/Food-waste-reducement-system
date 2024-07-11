document.addEventListener('DOMContentLoaded', function() {
    fetchDonations();
    fetchRecipients();


});

function fetchDonations() {
    fetch('http://localhost:5000/admin/verified-food')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('donation-table');
            data.forEach((donation, index) => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${donation[0]}</td>
                    <td>${donation[1]}</td>
                    <td><img src="data:image/jpeg;base64,${donation[2]}" alt="${donation[1]}" class="food-image" width="50"></td>
                    <td>${donation[3]}</td>
                    <td>${new Date(donation[4]).toLocaleDateString()}</td>
                    <td>${new Date(donation[5]).toLocaleDateString()}</td>
                    <td><button class="btn-assign" data-donation="${index + 1}">Distribute</button></td>
                `;
            });
        })
        .catch(error => console.error('Error fetching donations:', error));
}

function fetchRecipients() {
    fetch('http://localhost:5000/admin/recipients')
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('#volunteer-modal table');
            data.forEach(recipient => {
                const row = table.insertRow();
                row.insertCell(0).innerText = recipient[0];
                row.insertCell(1).innerText = recipient[2];
                row.insertCell(2).innerText = recipient[3];
                row.insertCell(3).innerText = recipient[4];
                row.insertCell(4).innerText = recipient[5];
                row.insertCell(5).innerText = recipient[6] ? new Date(recipient[6]).toLocaleDateString() : ""; // Date
                row.insertCell(6).innerHTML = `<button class="btn-choose" data-recipient="${recipient['Recipient ID']}">Choose</button>`;
            });
        })
        .catch(error => console.error('Error fetching recipients:', error));
}

function assignDonation(donationId, recipientId) {
    fetch('/admin/food_dist_rec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donationId, recipientId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Donation assigned successfully!');
            location.reload();
        } else {
            alert('Failed to assign donation.');
        }
    })
    .catch(error => console.error('Error assigning donation:', error));
}
