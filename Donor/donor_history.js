async function fetchDonationHistory(donorId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/donor/history?donorId=${donorId}`);
        if (response.ok) {
            const historyData = await response.json();
            
            // Assuming you have a swiper element for dynamic content
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            swiperWrapper.innerHTML = '';  // Clear any existing content

            historyData.forEach((donation) => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `
                    <img src="${donation.food_photo}" alt="Food Image" class="card-image">
                    <div class="card-content">
                        <div>
                            <span>Food Name:</span> <span class="value">${donation.food_name}</span><br>
                            <span>Quantity:</span> <span class="value">${donation.food_quantity}</span><br>
                        </div>
                        <div>
                            <span>Recipient:</span> <span class="value">${donation.institution_name}</span><br>
                            <span>Type:</span> <span class="value">${donation.institution_type}</span><br>
                            <span>Date:</span> <span class="value">${donation.date_r}</span><br>
                            <span>Location:</span> <span class="value">${donation.city}, ${donation.division}, ${donation.district}, ${donation.streetno}</span>
                        </div>
                    </div>`;
                
                swiperWrapper.appendChild(slide);
            });

            // Initialize or update the swiper after adding the slides
            var donationSwiper = new Swiper('.donation-swiper', {
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
        

        } else {
            console.error('Failed to fetch donation history');
        }
    } catch (error) {
        console.error('Error fetching donation history:', error);
    }
}

async function init() {
    const donorId = await getSessionDonorID();  // Reuse the function you wrote
    if (donorId) {
        fetchDonationHistory(donorId);
    }
}

// Call init function when page loads
window.onload = init;


async function getSessionDonorID() {
    try {
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            return user.id;
        } else {
            console.error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}
