const username = document.getElementById("username");
const saveHightScore= document.getElementById("saveHightScore");
const finalScore = document.getElementById("finalScore");
const mostRecntScore = localStorage.getItem("mostRecntScore");
finalScore.innerText = mostRecntScore;

const highScore=JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);

username.addEventListener("keyup" , ()=>{
    // console.log(username.value);
    saveHightScore.disabled = !username.value;
})

saveHighScore = e =>{
    console.log('click button');
    e.preventDefault();
    
    const score = {
        name : username.value,
        // score : mostRecntScore
        score : Math.floor(Math.random() * 100)
    };
    highScore.push(score)
    highScore.sort((a,b) => b.score - a.score );
    highScore.splice(5);

    localStorage.setItem("highScore" , JSON.stringify(highScore))
    window.location.assign("/");
    // console.log(highScore);
}