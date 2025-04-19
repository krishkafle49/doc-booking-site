// app.js

// Example function to handle form validation for booking appointments
function validateBookingForm() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("appointmentDate").value;

  if (!name || !date) {
    alert("Please fill in all fields before submitting!");
    return false;
  }
  return true;
}

// Example function to handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  if (validateBookingForm()) {
    alert("Appointment booked successfully!");
    // Add more code to handle saving data or displaying confirmation
  }
});
