const email = document.getElementById("email");
const phone = document.getElementById("phone");
const comment = document.getElementById("comment");
const submit = document.getElementById("submit");
const form = document.querySelector('form');


const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
        email: email.value,
        phone: phone.value,
        comment: comment.value
    };
  

    
        const response = await fetch("http://localhost:5000/users/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

      

       
        const data = await response.json()
       
        if(response.ok)
         {
          alert(data.message);
         
         }
         else{
             alert(data.error)
         }
     
  
       
      
    
};
form.addEventListener("submit", handleSubmit);