const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which keyword is used to define a function in Python?",
        choices: ["define", "func", "def", "function"],
        answer: "def"
    },
    {
        question: "Q. What does the 'scanf' function do in C programming?",
        choices: [
            "Prints formatted output",
            "Reads formatted input",
            "Allocates memory",
            "Writes data to a file"
        ],
        answer: "Reads formatted input"
    },
    {
        question: "Q. In OOP, what is encapsulation?",
        choices: [
            "A mechanism to hide the implementation details of a class.",
            "A process of creating multiple instances of a class.",
            "A way to connect different objects together.",
            "A method to handle exceptions."
        ],
        answer: "A mechanism to hide the implementation details of a class."
    },
    {
        question: "Q. What is a primary key in the context of databases?",
        choices: [
            "A key used for encrypting sensitive data.",
            "A key used to establish a connection between tables.",
            "A unique identifier for a record in a table.",
            "A key that allows access to the database."
        ],
        answer: "A unique identifier for a record in a table."
    },
    {
        question: "Q. What does SQL stand for in the context of databases?",
        choices: [
            "Structured Query Language",
            "Sequential Query Language",
            "Structured Question Language",
            "Sequential Question Language"
        ],
        answer: "Structured Query Language"
    },
    {
        question: "Q. What is an example of cyberlaw related to internet privacy?",
        choices: [
            "Digital signatures",
            "Cookie policies",
            "Patents",
            "Trademark registration"
        ],
        answer: "Cookie policies"
    },
    {
        question: "Q. In Python, what is the 'self' keyword used for in classes?",
        choices: [
            "Refers to the current instance of the class",
            "Used for conditional statements",
            "Indicates an abstract method",
            "Refers to the parent class"
        ],
        answer: "Refers to the current instance of the class"
    },
    {
        question: "Q. Which header file is used to input and output functions in C?",
        choices: [
            "<stdio.h>",
            "<stdlib.h>",
            "<conio.h>",
            "<math.h>"
        ],
        answer: "<stdio.h>"
    },
    {
        question: "Q. What is an example of a SQL data manipulation language (DML) command?",
        choices: [
            "SELECT",
            "CREATE",
            "ALTER",
            "DROP"
        ],
        answer: "SELECT"
    },
    {
        question: "Q. What does inheritance provide in OOP?",
        choices: [
            "It allows a class to inherit properties and behavior from another class.",
            "It creates instances of classes.",
            "It connects different objects together.",
            "It allows private access to class members."
        ],
        answer: "It allows a class to inherit properties and behavior from another class."
    }
];

// script.js

// Add event listener to the window for loading the content
window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.startBtn');
    const quizContainer = document.querySelector('.container');
    const alertDiv = document.querySelector('.alert');

    // Hide the quiz container initially
    quizContainer.style.display = 'none';

    // Functionality for the start button
    startBtn.addEventListener('click', () => {
        // Show the quiz container when the start button is clicked
        quizContainer.style.display = 'block';
        alertDiv.style.display = 'none'; // Hide the alert div
        startBtn.style.display = 'none'; // Hide the start button

        // Call functions related to quiz and timer here
        // For example:
        // startQuiz();
        // startTimer();
    });

    // Functionality for the quiz goes here
    // ...

    // Functionality for login can be added here or in separate functions
    // ...

    // Additional functionality such as handling next question, scoring, etc.
    // ...
});



// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
}); 