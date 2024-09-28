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

    try {
        // Disable the button while the request is processing
        submit.disabled = true;
        submit.innerText = "Sending...";

        const response = await fetch("http://localhost:5000/volunteer/contact_admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Clear form on success
            form.reset();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert("An error occurred. Please try again later.");
    } finally {
        // Re-enable the button after request completes
        submit.disabled = false;
        submit.innerText = "Send Message";
    }
};

form.addEventListener("submit", handleSubmit);
