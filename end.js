const username = document.getElementById("username");
const saveHightScore= document.getElementById("saveHightScore");
const finalScore = document.getElementById("finalScore");
const mostRecntScore = localStorage.getItem("mostRecntScore");
finalScore.innerText = mostRecntScore;

username.addEventListener("keyup" , ()=>{
    // console.log(username.value);
    saveHightScore.disabled = !username.value;
})

saveHighScore = e =>{
    console.log('click button');
    e.preventDefault();
}