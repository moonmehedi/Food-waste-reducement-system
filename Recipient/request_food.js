const people = document.getElementById("number-of-people");
const date = document.getElementById("date");
const submit = document.getElementById("submit");
const form = document.querySelector('form');

// Retrieve email from localStorage
//const userEmail = localStorage.getItem('userEmail');
const handleSubmit = async (e) => {
    e.preventDefault();
    
    userEmail=await getSessionManagerId()
    const requestData = {
        people: people.value,
        date: date.value,
        email: userEmail // Include email in the request
    };

    console.log(requestData);

    const response = await fetch("http://localhost:5000/users/request_food", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
    } else {
        alert(data.error);
    }
};

form.addEventListener("submit", handleSubmit);



 // Function to get manager ID from session
 async function getSessionManagerId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/admin/current-user', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        if (response.ok) {
            const user = await response.json();
            return user.email;
            console.log('the email address',user.email);
        } else {
            console.error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}