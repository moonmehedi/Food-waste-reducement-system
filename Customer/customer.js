searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = ()=>{
    searchForm.classList.toggle('active');
}
window.onscroll = () =>{
    searchForm.classList.remove('active');
}
window.onscroll = () =>{
    if(window.scrollY > 80)
    {
        document.querySelector('.header .header-2').classList.add('active');
    }
    else
    {
        document.querySelector('.header .header-2').classList.remove('active');
    }
}
window.onload = () =>{
    if(window.scrollY > 80)
    {
        document.querySelector('.header .header-2').classList.add('active');
    }
    else
    {
        document.querySelector('.header .header-2').classList.remove('active');
    }
}

var profileIcon = document.getElementById('profile-icon');
if (profileIcon) {
    profileIcon.addEventListener('click', function() {

        console.log('listening');
        var modal = document.getElementById('profile-modal');
        var overlay = document.getElementById('overlay');

        // Retrieve NID and Username from localStorage
        var nid = localStorage.getItem('NID');
        var username = localStorage.getItem('Username');

        // Update the modal with the retrieved values
        document.getElementById('profile-nid').textContent = nid ? nid : 'N/A';
        document.getElementById('profile-username').textContent = username ? username : 'N/A';

        // Show the modal and overlay
        if (modal.style.display === 'none' || modal.style.display === '') {
            modal.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
}

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


  /*const sr = ScrollReveal(
    {
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
    }
  )

  sr.reveal(`.home .content, .Featured , .arrivals, .reviews, .footer`)
  sr.reveal(`.home .books-slider`, {delay:600})
  sr.reveal(`.icons-container .icons`, {interval: 100})
  sr.reveal(`.discount__data`, {origin: 'left'})
  sr.reveal(`.discount__images`, {origin: 'right'})*/



  