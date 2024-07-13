document.addEventListener('DOMContentLoaded', function() {
    // Handle address dropdown
    var addressDropdown = document.getElementById('address-dropdown');
    if (addressDropdown) {
        addressDropdown.addEventListener('click', function() {
            var addressFields = document.querySelector('.address-fields');
            if (addressFields.style.display === 'none' || addressFields.style.display === '') {
                addressFields.style.display = 'block';
            } else {
                addressFields.style.display = 'none';
            }
        });
    }

    // Handle collapsible elements
    var coll = document.getElementsByClassName('collapsible');
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }

    // Handle profile modal
    var profileIcon = document.getElementById('profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            var modal = document.getElementById('profile-modal');
            var overlay = document.getElementById('overlay');
            if (modal.style.display === 'none' || modal.style.display === '') {
                modal.style.display = 'block';
                overlay.style.display = 'block';
            } else {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }

    // Show volunteer modal
    document.querySelectorAll('.btn-assign').forEach(function(button) {
        button.addEventListener('click', function() {
            var requestId = this.getAttribute('data-request');
            document.querySelectorAll('.btn-choose').forEach(function(chooseButton) {
                chooseButton.setAttribute('data-request', requestId);
            });
            document.getElementById('volunteer-modal').style.display = 'flex';
            document.getElementById('overlay').style.display = 'block';
        });
    });

    // Close the profile modal when clicking outside of it
    window.addEventListener('click', function(event) {
        var profileModal = document.getElementById('profile-modal');
        var overlay = document.getElementById('overlay');
        if (event.target === overlay) {
            if (profileModal && profileModal.style.display === 'block') {
                profileModal.style.display = 'none';
                overlay.style.display = 'none';
            }
        }
    });
    // Handle close button in volunteer modal
    var closeVolunteerModal = document.getElementById('close-volunteer-modal');
    if (closeVolunteerModal) {
        closeVolunteerModal.addEventListener('click', function() {
            var volunteerModal = document.getElementById('volunteer-modal');
            var overlay = document.getElementById('overlay');
            if (volunteerModal.style.display === 'flex') {
                volunteerModal.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }
});


