let timer = questions.length * 15;
let timerID;
let currQuestIndex = 0;

let questEl = document.getElementById("questions");
let optionEL = document.getElementById("options");
let beginBtn = document.getElementById("begin");
let submitBtn = document.getElementById("submit");
let initalEL = document.getElementById("initials");
let feedEl = document.getElementById("feedback");
let timeEl = document.getElementById("time");


function beginQuiz() {
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questEl.removeAttribute("class");
  timerID = setInterval(clockTick, 1000);
  timeEl.textContent = time;
  renderQuest();
}

function renderQuest() {
  let currQuest = questions[currQuestIndex];
  let titleEl = document.getElementById("questions-title");
  titleEl.textContent = currQuest.title;
  optionEL.innerHTML = "";
  currQuest.options.forEach(function(option, x) {
    let optionNode = document.createElement("button");
    optionNode.setAttribute("class", "option");
    optionNode.setAttribute("value", option);
    optionNode.textContent = x + 1 + ". " + option;
    optionNode.onclick = questClick;
    optionEL.appendChild(optionNode);
  });
}

function questClick() {
  if (this.value !== questions[currQuestIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timeEl.textContent = time;
    feedEl.textContent = "Incorrect!";
  }
    else {
      feedEl.textContent = "Correct!";
    }
    feedEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedEl.setAttribute("class", "feedback hide");
    }, 1000);
    currQuestIndex++;
    if (currQuestIndex === questions.length) {
      endQuiz();
    }
    else {
      renderQuest();
    }
  }

function endQuiz() {
  clearInterval(timerID);
  let finished = document.getElementById("finished");
  finished.removeAttribute("class");
  let finalEl = document.getElementById("score");
  finalEl.textContent = time;
  questEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function savedHighScores() {
  let initals = initalEL.value.trim();
  if (initals !== "") {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    let score = {
      score: time,
      initals: initals
    };
    highscores.push(score);
    window.localStorage.setItem("highScores", JSON.stringify(highscores));
    window.location.href= "highscores.html";
  }
}

submitBtn.onclick= savedHighScores();
beginBtn.onclick= beginQuiz();


//function beginQuiz
//render question, 
//function yes/no for user answer
//if else for next question or end
//endQuiz function
//time function
//function to save scores
//function to check entered initials
//submit btn and start quiz btn