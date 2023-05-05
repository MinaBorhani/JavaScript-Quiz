// console.log("hiii");
const question = document.getElementById("question");
const choice =Array.from(document.getElementsByClassName("choice-text"));
// console.log(choice);

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0; 
let questionCounter = 0;
let availableQuestion = [];



let questions = [
    {
        question : 'Inside wich HTML element do we put the JavavScript ?',
        choice1:"<script>",
        choice2:"<javascropt>",
        choice3:"<js>",
        choice4:"<scripting>",
        answer:1
    },
    {
        question : "what is the corrct syntax for referring to an external script called 'xxx.js'?",
        choice1:"<script href='xxx.js'>",
        choice2:"<script nmae='xxx.js'>",
        choice3:"<script src='xxx.js'>",
        choice4:"<script file='xxx.js'>",
        answer:3
    },
    {
        question : "How do you write 'Hello World' in an alert box",
        choice1:"msgBox('Hello World');",
        choice2:"alertBox('Hello World');",
        choice3:"msg('Hello World');",
        choice4:"alret('Hello World');",
        answer:4
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


straGame = () =>{
    questionCounter = 0;
    score= 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);

    getNewQuestion();
};

// straGame();

getNewQuestion = () =>{
    questionCounter++;
    let indexQuestion = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[indexQuestion];
    question.innerText = currentQuestion.question;

    choice.forEach(choices => {
        const number = choices.dataset["number"];
        // console.log(number);
        // console.log(choices);
        choices.innerText = currentQuestion["choice" + number]
    })
};

straGame();