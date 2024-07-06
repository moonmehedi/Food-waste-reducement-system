document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.intro-images img');
    const imageCount = images.length;

    setInterval(() => {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % imageCount;
        images[currentImageIndex].classList.add('active');
    }, 3000);
});
// Initialize Swiper
var swiper = new Swiper(".reviews-slider", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 9300,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});
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

    var foodSwiper = new Swiper('.food-swiper', {
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
  

