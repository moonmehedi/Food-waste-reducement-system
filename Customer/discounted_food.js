document.addEventListener('DOMContentLoaded', function() {


    let allFoodData = [];  // To store all food data globally

    // Initially load all foods without search filter
    fetchAllFoods();

    function fetchAllFoods(searchTerm = '') {
        const url = searchTerm ? `http://localhost:5000/customer/discounted-food?search=${searchTerm}` : 'http://localhost:5000/customer/discounted-food';
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                allFoodData = data;  // Store all food data globally
                displayFoods(data);  // Display the food data
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display food items
    function displayFoods(data) {
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        if (!swiperWrapper) {
            console.error('swiper-wrapper element not found!');
            return;
        }

        swiperWrapper.innerHTML = ''; // Clear existing slides

        data.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide', 'box');

            const formattedDate = new Date(item.expDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            slide.innerHTML = `
                <div class="image">
                    <img src="data:/Images/jpg;base64,${item.foodImage}" alt="${item.foodName}">
                </div>
                <div class="content2">
                    <h3>${item.foodName}</h3>
                    <p><span>Quantity:</span>${item.quantity}</p>
                    <p><span>Expiration Date:</span> ${formattedDate}</p>
                    <p><span>Donor Name:</span> ${item.sellerName}</p>
                    <p><span>Original Price:</span> ${item.originalPrice}$</p>
                    <p><span>Discounted Price:</span>${item.discountedPrice}$</p>
                    <button class="btn-assign" data-food-id="${item.foodId}">Add to Cart</button>
                </div>
                <div class="swiper-lazy-preloader"></div>`;
            
            swiperWrapper.appendChild(slide);
        });

        var swiper = new Swiper(".featured-slider", {
            spaceBetween: 10,
            loop:true,
            lazy: true, 
            centeredSlides: true,
            autoplay:{
                delay:5000,
                disableOnInteraction: false,
            },
            navigation:{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              450:{
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            },
          });
        
        swiper.update();



        // Handle "Add to Cart" Button
        document.querySelectorAll('.btn-assign').forEach(button => {
            button.addEventListener('click', function() {
                const foodId = this.getAttribute('data-food-id');
                const customerId = localStorage.getItem('NID');
                
                console.log('Sending foodId:', foodId); 
                console.log('Sending customerId:', customerId); 

                if (!foodId || !customerId) {
                    alert('Missing foodId or customerId');
                    return;
                }

                // Add item to cart
                fetch('http://localhost:5000/customer/add-to-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ foodId, customerId })
                })
                .then(response => response.json())
                .then(result => {
                    alert(result.message); 
                })
                .catch(error => console.error('Error:', error));
            });
        });
    }

    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    searchBtn.addEventListener('click', function() {
        const searchBarContainer = document.getElementById('search-bar-container');
        searchBarContainer.style.display = searchBarContainer.style.display === 'none' ? 'flex' : 'none';
        
        // Clear previous search results when search bar is opened
        searchInput.value = '';
        fetchAllFoods();  // Load all foods when opening the search bar
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        fetchAllFoods(searchTerm);  // Fetch filtered foods when user types
    });
});
