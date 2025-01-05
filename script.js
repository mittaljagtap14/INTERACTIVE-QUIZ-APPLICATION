// Sample question data
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
    answer: "Oxygen",
  },
  {
    question: "In which country is the Great Barrier Reef located?",
    options: ["Australia", "USA", "Brazil", "Canada"],
    answer: "Australia",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which programming language is used for web development?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "15"],
    answer: "8",
  },
  {
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Marie Curie"],
    answer: "Isaac Newton",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  
];

const totalQuestions = questions.length;  // Total number of questions in the quiz
let currentScore = 0;  // Variable to track the user's score

let currentQuestionIndex = 0;

// HTML elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");

// Sound effects
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("incorrect.mp3");

// Load a question
function loadQuestion() {
  optionsElement.innerHTML = "";
  feedbackElement.textContent = "🤔 Answer the question to see feedback! 💡";
  nextButton.style.display = "none";

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button");
    button.onclick = () => checkAnswer(option, button);
    optionsElement.appendChild(button);
  });

  // Update progress bar
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Check the selected answer
function checkAnswer(selectedOption, button) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackElement.textContent = "🎉 Correct! Great job! 🎉";
    feedbackElement.style.color = "green";
    currentScore++;
    correctSound.play();
    button.style.backgroundColor = "green";
  } else {
    feedbackElement.textContent = `❌ Wrong! The correct answer is: ${currentQuestion.answer}`;
    feedbackElement.style.color = "red";
    incorrectSound.play();
    button.style.backgroundColor = "red";
  }

  scoreElement.textContent = `🌟 Score: ${currentScore}`;
  nextButton.style.display = "block";

  // Disable all buttons after an answer is selected
  Array.from(optionsElement.children).forEach((btn) => (btn.disabled = true));
}

// Load the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// End the quiz
function endQuiz() {
  // Save both the final score and total score in localStorage
  localStorage.setItem("finalScore", currentScore);
  localStorage.setItem("totalScore", totalQuestions);

  // Redirect to the results page
  window.location.href = "results.html";
}

// Initialize the quiz
loadQuestion();
nextButton.addEventListener("click", nextQuestion);
