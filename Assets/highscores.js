function showHighscores() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
    highscores.forEach(function(score) {
        let liEl = document.createElement("li");
        liEl.textContent = score.initials + " - " + score.score;
        let olEl = document.getElementById("highscores");
        olEl.appendChild(liEl);
    });
}

function removeHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("remove").onclick= removeHighscores;

showHighscores();