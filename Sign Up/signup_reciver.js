// Retrieve form elements by their IDs
const Username = document.getElementById("name");
const Email = document.getElementById("email");
const City = document.getElementById("city");
const District = document.getElementById("district");
const Division = document.getElementById("division");
const StreetNo = document.getElementById("street_no");
const Phone = document.getElementById("phone");
const InstitutionName = document.getElementById("institution_name");
const InstitutionType = document.getElementById("institution_type");
const NumberOfPeople = document.getElementById("number_of_people");
const Password = document.getElementById("password");
const PasswordConfirmation = document.getElementById("confirm_password");
const signinBtn = document.getElementById("submit");

// Attach event listener to submit button
signinBtn.addEventListener("click", handleSubmit);

// Handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  console.log("lisiting");
  // Validate form inputs
  if (validateForm()) {
    const user = {
      name: Username.value,
      email: Email.value,
      address: {
        city: City.value,
        district: District.value,
        division: Division.value,
        streetNo: StreetNo.value,
        phone: Phone.value,
      },
      institution: {
        name: InstitutionName.value,
        type: InstitutionType.value,
      },
      number_of_people: NumberOfPeople.value,
      password: Password.value,
      verified: null, // Example value for verified field
      volunteer_id: null, // Example value for volunteer_id field
    };
    console.log("front end ", user);

    try {
      const response = await fetch("http://localhost:5000/user/signup_rec", {
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
    Email.value.trim() === "" ||
    City.value.trim() === "" ||
    District.value.trim() === "" ||
    Division.value.trim() === "" ||
    StreetNo.value.trim() === "" ||
    Phone.value.trim() === "" ||
    InstitutionName.value.trim() === "" ||
    InstitutionType.value === "" ||
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
