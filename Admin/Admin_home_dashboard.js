document.addEventListener('DOMContentLoaded', async () => {
    try {
        
      console.log('listing') ;
      const response = await fetch('http://localhost:5000/admin/dashboard-info');
      const data = await response.json();
    console.log(data);
      document.getElementById('total-requests').textContent = data[0];
      document.getElementById('present-volunteers').textContent = data[1];
      document.getElementById('total-verified-donors').textContent = data[2];
      document.getElementById('total-verified-recipients').textContent = data[3];
      document.getElementById('number-of-available-foods').textContent = data[4];
      // Leaving pending requests as is, since you specified it's not required for now
    } catch (err) {
      console.error('Error fetching dashboard info:', err);
    }


  });

 
  