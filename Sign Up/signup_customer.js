// Retrieve form elements by their IDs
const Username = document.getElementById("name");
const NID = document.getElementById("nid");
const DOB = document.getElementById("dob");
const City = document.getElementById("city");
const District = document.getElementById("district");
const Division = document.getElementById("division");
const StreetNo = document.getElementById("street_no");
const Phone = document.getElementById("phone");
const Password = document.getElementById("password");
const PasswordConfirmation = document.getElementById("confirm_password");
const signinBtn = document.getElementById("submit");

// Attach event listener to submit button
signinBtn.addEventListener("click", handleSubmit);

// Handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  console.log("Submitting form");
  // Validate form inputs
  if (validateForm()) {
    const user = {
      name: Username.value,
      nid: NID.value,
      dob: DOB.value,
      address: {
        city: City.value,
        district: District.value,
        division: Division.value,
        streetNo: StreetNo.value,
        phone: Phone.value,
      },
      password: Password.value,
    };
    console.log("Form data: ", user);

    try {
      const response = await fetch("http://localhost:5000/user/signup_cus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error occurred during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  } else {
    console.log("Validation failed. Please check your inputs.");
  }
}

// Validate form inputs
function validateForm() {
  if (
    Username.value.trim() === "" ||
    NID.value.trim() === "" ||
    DOB.value.trim() === "" ||
    City.value.trim() === "" ||
    District.value.trim() === "" ||
    Division.value.trim() === "" ||
    StreetNo.value.trim() === "" ||
    Phone.value.trim() === "" ||
    Password.value.trim() === "" ||
    PasswordConfirmation.value.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return false;
  }

  if (Password.value !== PasswordConfirmation.value) {
    alert("Passwords do not match.");
    return false;
  }

  return true;
}
