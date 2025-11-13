// index.js
// Author: Jonas Enlund
// Date: 2025-11-04


document.addEventListener("DOMContentLoaded", () => {
  const CHECK = '✅';
  const CROSS = '❌';
  const raceOrder = ["5K", "10K"];


  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#contestantTable tbody");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const birthDate = document.getElementById("birthDate");
  const eMail = document.getElementById("eMail");
  const telNumber = document.getElementById("telNumber");
  const races = document.querySelectorAll('input[name="race"]');
  const terms = document.getElementById("terms");
  const timestamp = document.getElementById("timestamp");


  // inline error elements
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const birthDateError = document.getElementById("birthDateError");
  const eMailError = document.getElementById("eMailError");
  const telNumberError = document.getElementById("telNumberError");
  const raceError = document.getElementById("raceError");
  const termsError = document.getElementById("termsError");

  //remove errors when typing
  [firstName, lastName, birthDate, eMail, telNumber].forEach((input) => {
    input.addEventListener("input", () => {
      const errorEl = document.getElementById(input.id + "Error");
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
      input.classList.remove("border-red-500");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    timestamp.value = new Date();

    // validation process(es)

    //first & last name:
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\-'\s]{2,15}$/;

    if (!nameRegex.test(firstName.value.trim())) {
      firstNameError.textContent =
        "First name must be 2-15 letters and no special characters.";
      firstNameError.classList.remove("hidden");
      firstName.classList.add("border-red-500");
      valid = false;
    }

    if (!nameRegex.test(lastName.value.trim())) {
      lastNameError.textContent =
        "Last name must be 2-15 letters and no special characters.";
      lastNameError.classList.remove("hidden");
      lastName.classList.add("border-red-500");
      valid = false;
    }
    // birthdate
    const dateOfBirth = new Date(birthDate.value);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();

    if (birthDate.value === "") {
      birthDateError.textContent = "Please select your birth date.";
      birthDateError.classList.remove("hidden");
      birthDate.classList.add("border-red-500");
      valid = false;
    }
    else if (dateOfBirth > today) {
      birthDateError.textContent = "Birth date cannot be in the future.";
      birthDateError.classList.remove("hidden");
      birthDate.classList.add("border-red-500");
      valid = false;
    }
    else if (age < 18) {
      birthDateError.textContent = "Minimum age is 18.";
      birthDateError.classList.remove("hidden");
      birthDate.classList.add("border-red-500");
      valid = false;
    }
    else if (age > 60) {
      birthDateError.textContent = "Maximum age is 60.";
      birthDateError.classList.remove("hidden");
      birthDate.classList.add("border-red-500");
      valid = false;
    }

    //email
    if (eMail.value.trim() === "") {
      eMailError.textContent = "Please enter your email address.";
      eMailError.classList.remove("hidden");
      eMail.classList.add("border-red-500");
      valid = false;
    }
    else if (!eMail.value.includes("@")) {
      eMailError.textContent = "Please enter a valid email address.";
      eMailError.classList.remove("hidden");
      eMail.classList.add("border-red-500");
      valid = false;
    }

    //telNumber
    const numberRegex = /^\+358\d{4,10}$/;
    if (!numberRegex.test(telNumber.value.trim())) {
      telNumberError.textContent =
        "Phone number must start with +358 and contain 4–10 digits after.";
      telNumberError.classList.remove("hidden");
      telNumber.classList.add("border-red-500");
      valid = false;
    }
    //races & terms
    const isRacesSelected = Array.from(races).some(r => r.checked);
    if (!isRacesSelected) {
      raceError.textContent = "Please select at least one race distance.";
      raceError.classList.remove("hidden");
      valid = false;
    }
    else {
      raceError.classList.add("hidden");
    }

    if (!terms.checked) {
      termsError.textContent = "You must agree to the terms and conditions to register.";
      termsError.classList.remove("hidden");
      valid = false;
    }
    else {
      termsError.classList.add("hidden");
    }

    //stop if not valid
    if (!valid) return;

    // if valid, proceed to 
    // table creation
    const tableBody = document.querySelector("#contestantTable tbody");
    //create row
    const row = document.createElement("tr");
    row.className = "odd:bg-white even:bg-blue-50 hover:bg-blue-100 transition-colors";
    //create name cell (first + last)
    const nameCell = document.createElement("td");
    nameCell.textContent = `${firstName.value} ${lastName.value}`;
    nameCell.className = "border border-gray-300 px-4 py-2";
    row.appendChild(nameCell);
    //show which race
    const selectedRaces = Array.from(races)
      .filter(r => r.checked)
      .map(r => r.value);
    raceOrder.forEach(race => {
      const cell = document.createElement("td");
      cell.textContent = selectedRaces.includes(race) ? CHECK : CROSS;
      cell.dataset.race = race;
      cell.className = "border border-gray-300 px-4 py-2 text-center align-middle";
      row.appendChild(cell);
    });

    //add the whole row to table body
    tableBody.appendChild(row);

    //reset form
    form.reset();
    firstName.focus();
  });
});