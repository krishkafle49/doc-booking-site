document.addEventListener('DOMContentLoaded', function () {
  const doctorForm = document.getElementById('doctorForm');
  const doctorList = document.getElementById('doctorList');

  if (doctorForm && doctorList) {
    doctorForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('docName');
      const specialtyInput = document.getElementById('docSpecialty');
      const imageInput = document.getElementById('docImage');

      const name = nameInput.value.trim();
      const specialty = specialtyInput.value.trim();
      const imageFile = imageInput.files[0];

      if (!name || !specialty || !imageFile) {
        alert("Please fill in all fields!");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target.result;

        const doctorCard = document.createElement('div');
        doctorCard.classList.add('doctor-card');

        doctorCard.innerHTML = `
          <img src="${imageUrl}" alt="${name}">
          <h3>${name}</h3>
          <p>${specialty}</p>
        `;

        doctorList.appendChild(doctorCard);

        // Clear the form
        nameInput.value = '';
        specialtyInput.value = '';
        imageInput.value = '';
      };

      reader.readAsDataURL(imageFile);
    });
  }
});
