const quizData = [
  {
    question: "What symptoms are you experiencing?",
    options: ["Chest Pain", "Skin Rash", "Headache", "Fever"],
    nextQuestion: "specialty"
  },
  {
    question: "Choose a specialty",
    options: ["Cardiologist", "Dermatologist", "Neurologist"],
    nextQuestion: null
  }
];

let currentQuestionIndex = 0;
let userAnswers = [];

function loadQuestion(questionIndex) {
  const questionData = quizData[questionIndex];
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `
    <div class="quiz-question">
      <h3>${questionData.question}</h3>
      <div class="options">
        ${questionData.options.map(option => `
          <button class="option-btn">${option}</button>
        `).join('')}
      </div>
    </div>
  `;

  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      userAnswers.push(questionData.options[index]);

      if (questionData.nextQuestion) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
      } else {
        showRecommendation();
      }
    });
  });
}

function showRecommendation() {
  const doctorRecommendation = document.getElementById('doctorRecommendation');
  doctorRecommendation.style.display = 'flex';
  doctorRecommendation.innerHTML = `
    <h3>Recommended Doctor(s):</h3>
    ${getDoctorRecommendation(userAnswers).map(doctor => `
      <div class="doctor-card">
        <img src="${doctor.image}" alt="${doctor.name}" />
        <h3>${doctor.name}</h3>
        <p>${doctor.specialty}</p>
      </div>
    `).join('')}
  `;
}

function getDoctorRecommendation(answers) {
  // Sample recommendation logic
  if (answers.includes("Chest Pain")) {
    return [
      { name: "Dr. Aayush Shrestha", specialty: "Cardiologist", image: "images/doctor1.jpg" },
    ];
  }
  if (answers.includes("Skin Rash")) {
    return [
      { name: "Dr. Nisha Karki", specialty: "Dermatologist", image: "images/doctor2.jpg" },
    ];
  }
  if (answers.includes("Headache")) {
    return [
      { name: "Dr. Pramila Thapa", specialty: "Neurologist", image: "images/doctor3.jpg" },
    ];
  }
  return [];
}

// Start the quiz
loadQuestion(currentQuestionIndex);
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
