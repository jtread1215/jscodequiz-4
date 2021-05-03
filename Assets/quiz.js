//Quiz variables
let questionsIndex = 0;
let time = questions.length * 15;
let timeId;
let score = 0;

//DOM variables
let startBtn = document.getElementById("start-screen");
let questionsEl = document.getElementById("questions");
let timeEl = document.getElementById("startTime");
let optionsEl = document.getElementById("options");
let submitBtn = document.getElementById("submit");
let fdbk = document.getElementById("feedback");
let initEl = document.getElementById("intials");



//Function to start the quiz
function startQuiz() {
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timeId = setInterval(clockTick, 1000)
  timeEl.textContent = time;
  renderQuestions();
}

//Function to display questions
function renderQuestions() {
  let runningQuestion = questions[questionsIndex];
  let questionEl = document.getElementById("question-questions");
  questionEl.textContent = runningQuestion[questionsIndex];
  optionsEl.innerHTML = " ";
  runningQuestion.options.forEach(function (option, i) {
    let optionNode = document.createElement("button");
    optionNode.setAttribute("class", "option");
    optionNode.setAttribute("value", option);
    optionNode.textContent = i + 1 + "." + option;
    optionNode.onclick = optionClick;
    optionsEl.appendChild(optionNode);
  });
}

//Function to choose an option to each question and to check if its correct or incorrect
function optionClick() {
  if (this.value !== questions - question[runningQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timeEl.textContent = time;

    fdbkEl.textContent = "Incorrect!";
  } else {
    fdbkEl.textContent = "Correct!";
  }

  runningQuestionIndex++;
  if (runningQuestionIndex === questions.length) {
    quizEnd();
  } else {
    renderQuestions();
  }
}

//Function for time
function clockTick() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

//Function for end of the quiz
function quizEnd() {
let lastScreenEl = document.getElementById("finished");
lastScreenEl.removeAttribute("class");

let finalEl = document.getElementById("finalScore");
  finalEl.textContent = time;

clearInterval(timeId);

questionEl.setAttribute("class", "hide");

}

//Button to start quiz
startBtn.onclick = startQuiz;




//function startQuiz
//display question, 
//function yes/no for user answer
//if else for next question or end
//end quiz function
//time function
//function to save scores
//function to check enteed initials
//submit btn and start quiz btn