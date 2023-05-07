// console.log("hiii");
const question = document.getElementById("question");
const choice =Array.from(document.getElementsByClassName("choice-text"));
// console.log(choice);
const prograssBarText =document.getElementById("progressText");
const scoretext = document.getElementById("score");
const prograssBarFull = document.getElementById("prograssBarFull");
const loader = document.getElementById("loder");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0; 
let questionCounter = 0;
let availableQuestion = [];



let questions = [];

// fetch("question.json")
// fetch API
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res =>{
    // console.log(res.json());
    return res.json()
})
.then(loadQuestion =>{
    // console.log(loadQuestion.results);

    questions = loadQuestion.results.map(loadQuestion =>{
        const formatQuestion = {
            question : loadQuestion.question
        };
        const answerChoice = [ ...loadQuestion.incorrect_answers];
        formatQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoice.splice(formatQuestion.answer -1 , 0, loadQuestion.incorrect_answers);

        answerChoice.forEach((choice , index) => {
            formatQuestion["choice" + (index+1)] = choice;
        })
        return formatQuestion;
    })
    // questions = loadQuestion;
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    
    straGame();
}).catch( err =>{
    console.error(err);
})

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

    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecntScore" , score);
        //go to the end home
        return window.location.assign("./end.html");
    }
    questionCounter++;
    prograssBarText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    prograssBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    let indexQuestion = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[indexQuestion];
    question.innerText = currentQuestion.question;

    choice.forEach(choices => {
        const number = choices.dataset["number"];
        // console.log(number);
        // console.log(choices);
        choices.innerText = currentQuestion["choice" + number]
    })

    availableQuestion.splice(indexQuestion, 1);
    acceptingAnswers = true
};

choice.forEach(choices =>{
    choices.addEventListener("click" , e =>{
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectChoice = e.target;
        const selectAnswer = selectChoice.dataset["number"];
        // console.log(selectAnswer  == currentQuestion.answer);

        const classToAplly = selectAnswer == currentQuestion.answer ? "correct" : "Incorrect";
        // console.log(classToAplly);

        if(classToAplly == "correct"){
            incrementScore(CORRECT_BONUS)
        }

        selectChoice.parentElement.classList.add(classToAplly)
        setTimeout(()=>{
            selectChoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        }, 1000);
        
    })
})

incrementScore = num =>{
    score += num;
    scoretext.innerText = score;
}

