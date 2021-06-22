let timer = questions.length * 15;
let timerID;
let currQuestIndex = 0;
let count = 76;

let questEl = document.getElementById("questions");
let choicesEL = document.getElementById("choices");
let beginBtn = document.getElementById("begin");
let submitBtn = document.getElementById("submit");
let initalEL = document.getElementById("initials");
let feedEl = document.getElementById("feedback");
let timeEl = document.getElementById("time");

function startClock() {
  clock = setInterval(function() {
    count--;
    timeEl.textContent = count;
    if(count <= 0) {
      clearInterval(timerID);
      endQuiz();
    }
  }, 1000)
}


begin.addEventListener("click", startClock)

function beginQuiz() {
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questEl.removeAttribute("class");
  timerID = setInterval(startClock, 1000);
  timeEl.textContent = count;
  renderQuest();
}


function renderQuest() {
  let currQuest = questions[currQuestIndex];
  let titleEl = document.getElementById("questions-title");
  titleEl.textContent = currQuest.title;
  choicesEL.innerHTML = "";
  currQuest.choices.forEach(function(choices, x) {
    let choicesNode = document.createElement("button");
    choicesNode.setAttribute("class", "choices");
    choicesNode.setAttribute("value", choices);
    choicesNode.textContent = x + 1 + ". " + choices;
    choicesNode.onclick = questClick;
    choicesEL.appendChild(choicesNode);
  });
}



function questClick() {
  if (this.value !== questions[currQuestIndex].answer) {
    count -= 10;
    if (count < 0) {
      count = 0;
    }
    timeEl.textContent = count;
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


function savedHighscores() {
  let initals = initalEL.value.trim();
  if (initals !== "") {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    let score = {
      score: count,
      initals: initals
    };
    highscores.push(score);
    window.localStorage.setItem("highScores", JSON.stringify(highscores));
    window.location.href= "highscores.html";
  }
};

beginBtn.onclick = beginQuiz();

 
