console.log("Connected");

// Consts
const scoreIndicator = document.getElementById("scoreIndicator");
const paperButton = document.getElementById("paperButton");
const rockButton = document.getElementById("rockButton");
const scissorsButton = document.getElementById("scissorsButton");
const loaderButton = document.getElementById("loaderButton");

const firstScreen = document.getElementById("firstScreen");
const secondScreen = document.getElementById("secondScreen");
const thirdScreen = document.querySelectorAll(".thirdScreen");

var playerSelection;
var computerSelection;
var playerSelectionButton;
var computerSelectionButton;

// Onload

window.onload = function () {
  setScore();
};

// Score
var score = 0;

function setScore() {
  scoreIndicator.innerText = score;
}

// Player Selection

const buttons = [paperButton, rockButton, scissorsButton];

if (!playerSelection) {
  buttons.forEach((button) => {
    button.addEventListener(
      "click",
      (event) => {
        playerSelection = button.getAttribute("id");
        playerSelects();
      },
      { once: true }
    );
  });
}

function playerSelects() {
  console.log("The player has selected " + playerSelection);
  setTimeout(switchToSecondScreen, 1000);
}

function switchToSecondScreen() {
  firstScreen.classList.add("d-none");
  secondScreen.classList.remove("d-none");
  setTimeout(
    printSelectedButton("userSelectionButtonPlaceholder", playerSelection),
    1000
  );
  setTimeout(computerSelects, 1000);
}

function printSelectedButton(buttonPlaceholder, selection) {
  buttonPlaceholder = document.getElementById(buttonPlaceholder);
  buttonPlaceholder.parentNode.innerHTML = `
  <div
    id="${selection}"
    class="d-flex align-items-center justify-content-center pulse"
  >
    <div class="button-inside"></div>
  </div>
`;
}

// Computer Selection
function computerSelects() {
  let randomNumber = Math.floor(Math.random() * 3);
  computerSelection = buttons[randomNumber].getAttribute("id");
  console.log("The computer has selected " + computerSelection);

  setTimeout(
    printSelectedButton(
      "computerSelectionButtonPlaceholder",
      computerSelection
    ),
    1000
  );

  compareSelections();
}

function compareSelections() {
  if (playerSelection === computerSelection) {
    console.log("Empate");
  } else if (
    (playerSelection === "rockButton" &&
      computerSelection === "scissorsButton") ||
    (playerSelection === "scissorsButton" &&
      computerSelection === "paperButton") ||
    (playerSelection === "paperButton" && computerSelection === "rockButton")
  ) {
    console.log("player wins");
    score++;
  } else {
    console.log("computer wins");
    score--;
  }
  setScore();
  switchToThirdScreen();
}

function switchToThirdScreen() {
  console.log(thirdScreen);

  thirdScreen.forEach((element) => {
    element.classList.remove("d-none");
  });

  playerSelectionButton = document.getElementById(playerSelection);
  computerSelectionButton = document.getElementById(computerSelection);
  console.log(playerSelectionButton.parentNode);
  console.log(computerSelectionButton.parentNode);

  playerSelectionButton.parentElement.classList.remove("col-md-6");
  playerSelectionButton.parentElement.classList.add("col-md-4");
  computerSelectionButton.parentElement.classList.remove("col-md-6");
  computerSelectionButton.parentElement.classList.add("col-md-4");
}
