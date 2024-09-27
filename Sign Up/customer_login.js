const Userid = document.getElementById("nid");
const Password = document.getElementById("password");
const Role = document.getElementById("role");
const loginBtn = document.getElementById("submit");

loginBtn.addEventListener("click", handleLogin);

async function handleLogin(event) {
    event.preventDefault();
    console.log("Submitting login form");

    if (validateLoginForm()) {
        const loginData = {
            userid: Userid.value, // Updated here
            password: Password.value,
            role: Role.value,
        };

        console.log("Login data: ", loginData);

        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                // Storing the NID and Username in localStorage
                console.log(localStorage.getItem('Username'));
                console.log(localStorage.getItem('NID'));

                localStorage.setItem("NID", result.NID);
                localStorage.setItem("Username", result.Username);

                alert(result.message);  // Show login success message
                window.location.href = "/Customer/customer_home.html";
                // Handle further success (e.g., redirect to the dashboard)
            } else {
                throw new Error(result.message || "Login failed. Please try again.");
            }

            // Handle login success (e.g., redirect, update UI)
            // Implement redirection or UI update later when ready
        } catch (error) {
            console.error("Error occurred during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    } else {
        console.log("Validation failed. Please check your inputs.");
    }
}

function validateLoginForm() {
    if (Userid.value.trim() === "" || Password.value.trim() === "") {
        alert("Please fill in both username and password.");
        return false;
    }

    if (Role.value.trim() === "") {
        alert("Please select a role.");
        return false;
    }

    return true;
}