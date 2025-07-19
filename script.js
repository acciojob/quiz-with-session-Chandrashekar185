// Step 1: Define quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter"
  },
  {
    question: "Which language runs in browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4"
  },
  {
    question: "Which one is not a frontend framework?",
    options: ["React", "Angular", "Vue", "Node.js"],
    answer: "Node.js"
  }
];

// Step 2: Access the elements from the HTML
const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Step 3: Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Step 4: Function to display all questions and pre-fill from sessionStorage
function displayQuestions() {
  questionsContainer.innerHTML = ""; // Clear any existing content

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div"); // Create container div
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    // Loop through options and create radio buttons
    q.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${index}`; // Group by question index
      input.value = option;

      // Pre-check the option if previously selected
      if (progress[index] === option) {
        input.checked = true;
      }

      // Save selected answer to sessionStorage on change
      input.addEventListener("change", () => {
        progress[index] = option;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br")); // Line break
    });

    questionsContainer.appendChild(questionDiv);
  });
}

// Step 5: Submit button logic
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = progress[index];
    if (selected && selected === q.answer) {
      score++;
    }
  });

  // Display and save score
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Step 6: On page load, show score if previously submitted
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDisplay.textContent = `Your score is ${lastScore} out of ${questions.length}.`;
}

// Step 7: Call function to display questions
displayQuestions();
