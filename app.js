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

