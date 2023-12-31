const questions = [
    {
        question: "When did the construction of the Great Wall of China begin?",
        answers: [
            {text: "7th century BC", correct: true},
            {text: "1st century", correct: false},
            {text: "A few years ago", correct: false},
            {text: "15th century", correct: false}
        ]
    },
    {
        question: "Who sent Christopher Columbus to explore the New World?",
        answers: [
            {text: "King Charles VIII of France", correct: false},
            {text: "King Henry VII of England", correct: false},
            {text: "King Ferdinand of Spain", correct: true},
            {text: "Doge Agostino Barbarigo of Venice", correct: false}
        ]
    },
    {
        question: "What is considered the largest empire in history?",
        answers: [
            {text: "The Roman Empire", correct: false},
            {text: "The Ottoman Empire", correct: false},
            {text: "Qing Dynasty", correct: false},
            {text: "The Mongol Empire", correct: true}
        ]
    },
    {
        question: "What year did the French Revolution start?",
        answers: [
            {text: "1789", correct: true},
            {text: "1812", correct: false},
            {text: "1903", correct: false},
            {text: "1461", correct: false}
        ]
    },
    {
        question: "What event is commonly believed to have sparked World War I?",
        answers: [
            {text: "A game of Rock-Paper-Scissors gone wrong", correct: false},
            {text: "Marie Antoinetter didn't want to marry King Louis XVI", correct: false},
            {text: "The assassination of Archduke Franz Ferdinand of Austria", correct: true},
            {text: "A Serbian soldier was shot after crossing the border into Austria while chasing after his runaway dog.", correct: false}
        ]
    },
    {
        question: "Who was the last Tsar of Russia?",
        answers: [
            {text: "Vlad The Impaler", correct: false},
            {text: "Borat", correct: false},
            {text: "Grigori Rasputin", correct: false},
            {text: "Nicholas II", correct: true}
        ]
    },
    {
        question: "Where did Albert Einstein live before moving to the United States?",
        answers: [
            {text: "Margarittaville", correct: false},
            {text: "Germany", correct: true},
            {text: "Austria", correct: false},
            {text: "Switzerland", correct: false}
        ]
    },
    {
        question: "Who is commonly referred to as the person who created the first printing press?",
        answers: [
            {text: "Johannes Gutenberg", correct: true},
            {text: "Nikola Tesla", correct: false},
            {text: "Steve Jobs", correct: false},
            {text: "Benjamin Franklin", correct: false}
        ]
    },
    {
        question: "How old was Queen Elizabeth II when she was crowned the Queen of England?",
        answers: [
            {text: "40", correct: false},
            {text: "16", correct: false},
            {text: "27", correct: true},
            {text: "21", correct: false}
        ]
    },
    {
        question: "What was the capital city of the Inca Empire?",
        answers: [
            {text: "Yaxchilán", correct: false},
            {text: "Tenochtitlan", correct: false},
            {text: "Tijuana", correct: false},
            {text: "Cusco", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Got ${score} Out Of ${questions.length} Correct!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();