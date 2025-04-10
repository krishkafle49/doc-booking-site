document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const appointment = {
    name,
    phone,
    doctor,
    date,
    time
  };

  // Save to localStorage
  let bookings = JSON.parse(localStorage.getItem("appointments")) || [];
  bookings.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(bookings));

  // Show confirmation
  document.getElementById("confirmationMessage").style.display = "block";
  document.getElementById("bookingForm").reset();
});

