let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// if (score === null) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0,
//   };
// }
updateScoreElement();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  // If it's indeed auto-playing
  if (!isAutoPlaying) {
    // To stop setInterval later, we need to give a variable to store id of setInterval
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    const changeText = document.querySelector(".js-auto-play-btn");
    changeText.innerHTML = "Stop Auto Play";
    changeText.style.backgroundColor = "rgb(137, 26, 48)";

    // If it's not auto-playing
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    const changeText = document.querySelector(".js-auto-play-btn");
    changeText.innerHTML = "Auto Play";
    changeText.style.backgroundColor = "rgb(26, 160, 37)";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "It's a tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "It's a tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else {
    if (computerMove === "rock") {
      result = "It's a tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src = "Images/${playerMove}-emoji.png" class = "move-icon"> 
    <img src = "Images/${computerMove}-emoji.png" class = "move-icon"> Computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
