// Database of Questions
const quiz = [
    {
        question: "Which keyword is used to define a function in Python?",
        choices: ["define", "func", "def", "function"],
        answer: "def"
    },
    {
        question: "What does the 'scanf' function do in C programming?",
        choices: ["Prints formatted output", "Reads formatted input", "Allocates memory", "Writes data to a file"],
        answer: "Reads formatted input"
    },
    {
        question: "In OOP, what is encapsulation?",
        choices: ["Hiding implementation details", "Creating multiple instances", "Connecting objects", "Handling exceptions"],
        answer: "Hiding implementation details"
    },
    {
        question: "What is a primary key in the context of databases?",
        choices: ["Encrypting sensitive data", "Connection between tables", "Unique identifier for a record", "Access key for DB"],
        answer: "Unique identifier for a record"
    },
    {
        question: "What does SQL stand for in the context of databases?",
        choices: ["Structured Query Language", "Sequential Query Language", "Structured Question Language", "Sequential Question Language"],
        answer: "Structured Query Language"
    },
    {
        question: "What is an example of cyberlaw related to internet privacy?",
        choices: ["Digital signatures", "Cookie policies", "Patents", "Trademark registration"],
        answer: "Cookie policies"
    },
    {
        question: "In Python, what is the 'self' keyword used for in classes?",
        choices: ["Refers to the current instance", "Conditional statements", "Abstract method", "Refers to parent class"],
        answer: "Refers to the current instance"
    },
    {
        question: "Which header file is used for input/output functions in C?",
        choices: ["<stdio.h>", "<stdlib.h>", "<conio.h>", "<math.h>"],
        answer: "<stdio.h>"
    },
    {
        question: "What is an example of a SQL DML command?",
        choices: ["SELECT", "CREATE", "ALTER", "DROP"],
        answer: "SELECT"
    },
    {
        question: "What does inheritance provide in OOP?",
        choices: ["Inherit properties from another class", "Creates instances", "Connects objects", "Private access to members"],
        answer: "Inherit properties from another class"
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const choicesGrid = document.getElementById('choices-grid');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const timeLeftDisplay = document.getElementById('time-left');

const finalScoreEl = document.getElementById('final-score');
const totalQuestionsEl = document.getElementById('total-questions');

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerID = null;

// Initialize App
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);

function startQuiz() {
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Reset Variables
    currentQuestionIndex = 0;
    score = 0;
    
    // Shuffle Questions
    quiz.sort(() => Math.random() - 0.5);
    totalQuestionsEl.textContent = quiz.length;
    
    loadNextQuestion();
}

function loadNextQuestion() {
    // Reset UI for next question
    nextBtn.classList.add('hidden');
    choicesGrid.innerHTML = '';
    
    // Update Progress Bar & Counter
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quiz.length}`;
    const progressPercentage = ((currentQuestionIndex) / quiz.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Load Question Data
    const currentQuestion = quiz[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Load Choices
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => selectAnswer(button, choice, currentQuestion.answer));
        choicesGrid.appendChild(button);
    });

    // Start Timer
    timeLeft = 15;
    timeLeftDisplay.textContent = timeLeft;
    clearInterval(timerID);
    timerID = setInterval(updateTimer, 1000);
}

function selectAnswer(selectedButton, selectedText, correctText) {
    clearInterval(timerID); // Stop timer when user answers
    const allButtons = document.querySelectorAll('.choice-btn');
    
    // Disable all buttons to prevent multiple clicks
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedText === correctText) {
        selectedButton.classList.add('correct');
        selectedButton.innerHTML += ` <i class="fas fa-check-circle" style="float:right;"></i>`;
        score++;
    } else {
        selectedButton.classList.add('wrong');
        selectedButton.innerHTML += ` <i class="fas fa-times-circle" style="float:right;"></i>`;
        
        // Highlight the actual correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === correctText) {
                btn.classList.add('correct');
            }
        });
    }

    // Show Next Button
    nextBtn.classList.remove('hidden');
}

function updateTimer() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        clearInterval(timerID);
        // Auto-fail the question if time runs out
        const allButtons = document.querySelectorAll('.choice-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === quiz[currentQuestionIndex].answer) {
                btn.classList.add('correct'); // Show the right answer
            }
        });
        nextBtn.classList.remove('hidden');
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        loadNextQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreEl.textContent = score;
    clearInterval(timerID);
}