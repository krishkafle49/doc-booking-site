// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the form from reloading the page

    // Grab the values from the form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;

    // Basic validation
    if (!name || !email || !doctor || !date) {
      alert('Please fill in all the fields!');
      return;
    }

    // You could send this data to a backend here (or store it)
    // For now, just confirm
    alert(`🎉 Appointment confirmed!\n\nName: ${name}\nEmail: ${email}\nDoctor: ${doctor}\nDate: ${date}`);

    // Clear form
    form.reset();
  });
});

// Optional: Button on hero section
function bookNow() {
  // Scroll to form
  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const appointmentsList = document.getElementById('appointmentsList'); // new

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;

    if (!name || !email || !doctor || !date) {
      alert('Please fill in all the fields!');
      return;
    }

    const appointment = { name, email, doctor, date };
    
    // Store in localStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert(`🎉 Appointment confirmed for ${name} with ${doctor} on ${date}`);
    form.reset();
    displayAppointments(); // Show updated list
  });

  // Function to display appointments
  function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointmentsList.innerHTML = '';

    if (appointments.length === 0) {
      appointmentsList.innerHTML = '<p>No appointments yet.</p>';
      return;
    }

    appointments.forEach((appt, index) => {
      const div = document.createElement('div');
      div.classList.add('appointment-card');
      div.innerHTML = `
        <p><strong>Name:</strong> ${appt.name}</p>
        <p><strong>Doctor:</strong> ${appt.doctor}</p>
        <p><strong>Date:</strong> ${appt.date}</p>
        <button onclick="deleteAppointment(${index})">Cancel</button>
      `;
      appointmentsList.appendChild(div);
    });
  }

  displayAppointments(); // Initial load
});

function deleteAppointment(index) {
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.splice(index, 1);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  location.reload(); // Refresh to update the list
}

