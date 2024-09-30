document.addEventListener('DOMContentLoaded', () => {
    // Fetch session donor ID and load sell history after the document is loaded
    getSessionDonorIDForSell();
});

async function getSessionDonorIDForSell() {
    try {
        console.log('Fetching session donor ID for sell history...');
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            const donorID = user.id;  // Use the donor ID
            console.log('Donor ID fetched for sell history:', donorID);
            fetchSellHistory(donorID);
        } else {
            console.error('Failed to fetch user info for sell history', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user info for sell history:', error);
    }
}

async function fetchSellHistory(donorID) {
    try {
        console.log(`Fetching sell history for donor ID: ${donorID}`);
        const response = await fetch(`http://127.0.0.1:5000/sell-history/${donorID}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const sellHistory = await response.json();
            console.log('Sell history fetched:', sellHistory);
            populateSellHistory(sellHistory);
        } else {
            console.error('Failed to fetch sell history', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching sell history:', error);
    }
}

function populateSellHistory(sellHistory) {
    console.log('Populating sell history...');
    const swiperWrapper = document.querySelector('.food-swiper .swiper-wrapper');
    
    if (!swiperWrapper) {
        console.error('Swiper wrapper not found in DOM for sell history');
        return;
    }

    swiperWrapper.innerHTML = ''; // Clear existing slides

    if (sellHistory.length === 0) {
        console.warn('No sell history found to populate');
    }

    sellHistory.forEach((sell, index) => {
        console.log(`Adding sell record ${index + 1}:`, sell);

        const formattedDate = new Date(sell.orderDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const slide = `
        <div class="swiper-slide">
            <img src="data:image/jpeg;base64,${sell.photo || 'default-image-url.jpg'}" alt="Food Image" class="card-image">
            <div class="card-content">
                <div>
                    <span>Food Name:</span> <span class="value">${sell.foodName}</span><br>
                    <span>Quantity:</span> <span class="value">${sell.quantity}</span><br>
                </div>
                <div>
                    <span>Sell Date:</span> <span class="value">${formattedDate}</span><br>
                </div>
                <div>
                    <span>Customer Name:</span> <span class="value">${sell.customerName}</span><br>
                    <span>Address:</span> 
                    <span class="value">
                        ${sell.streetno}, ${sell.district}, ${sell.city}, ${sell.division}
                    </span>
                </div>
            </div>
        </div>`;
        swiperWrapper.innerHTML += slide;
    });

    // Debug if slides are added to DOM before Swiper initialization
    const slides = swiperWrapper.querySelectorAll('.swiper-slide');
    console.log(`Total slides added for sell history: ${slides.length}`);

    // Initialize Swiper after the slides are populated
    new Swiper('.food-swiper', {
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

    console.log('Swiper initialized for sell history');
}
