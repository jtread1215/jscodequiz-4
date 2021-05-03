function highScores() {
    let highScores = JSON.parse(window.localStorage.getItem("highScore")) || [];
    highScores.sort(function(a,b) {
        return a.score + b.score;
    });
}

function clearHighScores(){
    window.localStorage.removeItem("highScores");
    window.localStorage.reload();
}