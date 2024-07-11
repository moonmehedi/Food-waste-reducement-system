document.addEventListener('DOMContentLoaded', function() {
    fetchDonations();
    fetchRecipients();

    document.querySelectorAll('.btn-assign').forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-donation');
            showRecipientModal(donationId);
        });
    });

    document.getElementById('close-volunteer-modal').addEventListener('click', function() {
        closeRecipientModal();
    });
});

function fetchDonations() {
    fetch('/admin/food_dist_donation')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('donation-table');
            data.forEach(donation => {
                const row = table.insertRow();
                row.insertCell(0).innerText = donation['Donation No'];
                row.insertCell(1).innerText = donation['Donor Name'];
                row.insertCell(2).innerText = donation['Food Name'];
                row.insertCell(3).innerHTML = `<img src="${donation['Food Image']}" alt="Food Image" width="50">`;
                row.insertCell(4).innerText = donation['Food Quantity'];
                row.insertCell(5).innerText = donation['Expiration Date'];
                row.insertCell(6).innerText = donation['Date'];
                row.insertCell(7).innerHTML = `<button class="btn-assign" data-donation="${donation['Donation No']}">Distribute</button>`;
            });
        })
        .catch(error => console.error('Error fetching donations:', error));
}

function fetchRecipients() {
    fetch('/admin/food_dist_recipient')
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('#volunteer-modal table');
            data.forEach(recipient => {
                const row = table.insertRow();
                row.insertCell(0).innerText = recipient['Institution Name'];
                row.insertCell(1).innerText = recipient['Institution Type'];
                row.insertCell(2).innerText = recipient['Email'];
                row.insertCell(3).innerText = recipient['Number of People'];
                row.insertCell(4).innerText = recipient['Address'];
                row.insertCell(5).innerText = recipient['Date'];
                row.insertCell(6).innerHTML = `<button class="btn-choose" data-recipient="${recipient['Recipient ID']}">Choose</button>`;
            });
        })
        .catch(error => console.error('Error fetching recipients:', error));
}

function showRecipientModal(donationId) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('volunteer-modal').style.display = 'block';

    document.querySelectorAll('.btn-choose').forEach(button => {
        button.addEventListener('click', function() {
            const recipientId = this.getAttribute('data-recipient');
            assignDonation(donationId, recipientId);
        });
    });
}

function closeRecipientModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('volunteer-modal').style.display = 'none';
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

