// index.js
// Author: Jonas Enlund
// Date: 2025-11-04


document.addEventListener("DOMContentLoaded", () => {
  const CHECK = '✅';
  const CROSS = '❌';
  const raceOrder = ["5K", "10K"];


  const form = document.getElementById("registrationForm");
  const table = document.getElementById("contestantTable").querySelector("tbody");

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const birthDate = document.getElementById("dateOfBirth");
  const eMail = document.getElementById("eMail");
  const telNumber = document.getElementById("telNumber");
  const races = document.querySelectorAll('input[name="race"]');
  const terms = document.getElementById("terms");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //remove custom errors
    [firstNameInput, lastNameInput, birthDate, eMail, telNumber].forEach((input) =>
      input.setCustomValidity("")
    );

    const timestamp = document.getElementById("timestamp");
    timestamp.value = new Date();

    let valid = true;

    // validation process
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\-'\s]+$/;

    if (!nameRegex.test(firstName.value.trim())) {
      firstName.setCustomValidity("Too long or short, no special characters allowed.");
      valid = false;
    }
    if (!nameRegex.test(lastNameInput.value.trim())) {
      lastNameInput.setCustomValidity("Too long or short, no special characters allowed.");
      valid = false;
    }

    const dateOfBirth = new Date(birthDate.value);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();

    if (birthDate.value === "") {
      birthDate.setCustomValidity("Please select your birth date.");
      valid = false;
    }
    else if (dateOfBirth > today) {
      birthDate.setCustomValidity("Cannot be in the future");
      valid = false;
    }
    else if (age < 18) {
      birthDate.setCustomValidity("Minimum age to register is 18");
      valid = false;
    }
    else if (age > 60) {
      birthDate.setCustomValidity("Maximum age to register is 60");
      valid = false;
    }


    if (eMail.value.trim() === "") {
      eMail.setCustomValidity("Please enter your email address.");
      valid = false;
    }
    else if (!eMail.value.includes("@")) {
      eMail.setCustomValidity("Please enter a valid email address.");
      valid = false;
    }

    const numberRegex = /^\+358\d{4,10}$/;

    if (telNumber.value.trim() === "") {
      telNumber.setCustomValidity("Please enter your phone number.");
      valid = false;
    }
    else if (!numberRegex.test(telNumber.value)) {
      telNumber.setCustomValidity("Please enter number in the format +358 xxx xxx...")
      valid = false;
    }

    const raceSelected = Array.from(races).some(r => r.checked);
    if (!raceSelected) {
      alert("Please select at least one race distance.");
      valid = false;
    }

    if (!terms.checked) {
      alert("You must agree to the terms and conditions to register.");
      valid = false;
    }

    //pick races
    const selectedRaces = Array.from(races)
      .filter(r => r.checked)
      .map(r => r.value);

    if (!form.reportValidity() || !valid) return;

    // table creation
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = `${firstNameInput.value} ${lastNameInput.value}`;
    row.appendChild(nameCell);

    raceOrder.forEach(race => {
      const cell = document.createElement("td");
      cell.textContent = selectedRaces.includes(race) ? CHECK : CROSS;
      cell.dataset.race = race;
      cell.className = "day-cell";
      row.appendChild(cell);
    });


    table.appendChild(row);

    //reset form
    form.reset();
    firstNameInput.focus();
  });
});