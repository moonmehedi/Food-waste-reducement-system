document.addEventListener('DOMContentLoaded', () => {
    // Fetch session donor ID and load donation history after the document is loaded
    getSessionDonorID();
});
async function getSessionDonorID() {
    try {
        console.log('Fetching session donor ID...');
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            const donorID = user.id;  // Use the donor ID
            console.log('Donor ID fetched:', donorID);
            fetchDonationHistory(donorID);
        } else {
            console.error('Failed to fetch user info', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}


async function fetchDonationHistory(donorID) {
    try {
        console.log(`Fetching donation history for donor ID: ${donorID}`);
        const response = await fetch(`http://127.0.0.1:5000/donation-history/${donorID}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const donationHistory = await response.json();
            console.log('Donation history fetched:', donationHistory);
            populateDonationHistory(donationHistory);
        } else {
            console.error('Failed to fetch donation history', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching donation history:', error);
    }
}


function populateDonationHistory(donationHistory) {
    console.log('Populating donation history...');
    const swiperWrapper = document.querySelector('.donation-swiper .swiper-wrapper');
    
    if (!swiperWrapper) {
        console.error('Swiper wrapper not found in DOM');
        return;
    }

    swiperWrapper.innerHTML = ''; // Clear existing slides

    if (donationHistory.length === 0) {
        console.warn('No donation history found to populate');
    }

    donationHistory.forEach((donation, index) => {
        console.log(`Adding donation ${index + 1}:`, donation);

        const formattedDate = new Date(donation.donationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const slide = `
        <div class="swiper-slide">
            <img src="data:image/jpeg;base64,${donation.photo || 'default-image-url.jpg'}" alt="Food Image" class="card-image">
            <div class="card-content">
                <div>
                    <span>Food Name:</span> <span class="value">${donation.foodName}</span><br>
                    <span>Quantity:</span> <span class="value">${donation.quantity}</span><br>
                    <span>Date:</span> <span class="value">${formattedDate}</span><br>
                </div>
                <div>
                    <span>Institution Name:</span> <span class="value">${donation.institutionName}</span><br>
                    <span>Institution Type:</span> <span class="value">${donation.institutionType}</span><br>
                    <span>City:</span> <span class="value">${donation.city}</span><br>
                    <span>District:</span> <span class="value">${donation.district}</span><br>
                </div>
            </div>
        </div>`;
    swiperWrapper.innerHTML += slide;
    
    });

    // Debug if slides are added to DOM before Swiper initialization
    const slides = swiperWrapper.querySelectorAll('.swiper-slide');
    console.log(`Total slides added: ${slides.length}`);

    // Initialize Swiper after the slides are populated
    new Swiper('.donation-swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    console.log('Swiper initialized');
}