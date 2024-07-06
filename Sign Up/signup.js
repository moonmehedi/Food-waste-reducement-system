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
});

//just testing
