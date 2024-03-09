// Consts
const scoreIndicator = document.getElementById("scoreIndicator");
const winnerText = document.getElementById("winnerText");

const paperButton = document.getElementsByClassName("paperButton")[0];
const rockButton = document.getElementsByClassName("rockButton")[0];
const scissorsButton = document.getElementsByClassName("scissorsButton")[0];

const playAgainButton = document.getElementsByClassName("playAgainButton")[0];

const firstScreen = document.getElementById("firstScreen");
const secondScreen = document.getElementById("secondScreen");

let thirdScreen = document.querySelectorAll(".thirdScreen");

let playerSelection;
let playAgainButtonIndicator = true;

// Delay

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Onload

window.onload = function () {
  setScore();
};

// Score
let score = 0;

function setScore() {
  scoreIndicator.innerText = score;
}

// Player Selection

const buttons = [paperButton, rockButton, scissorsButton];

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!playerSelection) {
      playerSelection = button.getAttribute("id");
      playerSelects();
    }
  });
});

async function playerSelects() {
  await delay(1000); // wait for 1 second

  switchToSecondScreen();
}

async function switchToSecondScreen() {
  firstScreen.classList.add("d-none");
  secondScreen.classList.remove("d-none");

  await delay(1000);
  printSelectedButton("userSelectionButtonPlaceholder", playerSelection);
  await delay(1500);
  computerSelects();
}

function printSelectedButton(buttonPlaceholder, selection) {
  buttonPlaceholder = document.getElementById(buttonPlaceholder);

  const button = document.createElement("div");
  button.id = buttonPlaceholder.getAttribute("id");
  button.className = `${selection} d-flex align-items-center justify-content-center`;

  const buttonInside = document.createElement("div");
  buttonInside.className = "button-inside pulse";

  button.appendChild(buttonInside);
  buttonPlaceholder.parentNode.replaceChild(button, buttonPlaceholder);
}

// Computer Selection
async function computerSelects() {
  let randomNumber = Math.floor(Math.random() * 3);
  computerSelection = buttons[randomNumber].getAttribute("id");

  await delay(1000);
  printSelectedButton("computerSelectionButtonPlaceholder", computerSelection);

  compareSelections();
}

async function compareSelections() {
  if (playerSelection === computerSelection) {
    winnerText.innerText = "It's a draw!";
  } else if (
    (playerSelection === "rockButton" &&
      computerSelection === "scissorsButton") ||
    (playerSelection === "scissorsButton" &&
      computerSelection === "paperButton") ||
    (playerSelection === "paperButton" && computerSelection === "rockButton")
  ) {
    winnerText.innerText = "You win!";
    score++;
  } else {
    winnerText.innerText = "Computer wins!";
    score--;
  }

  await delay(1500);
  setScore();
  toggleThirdScreen();
}

function toggleThirdScreen() {
  thirdScreen.forEach((element) => {
    element.classList.toggle("d-none");
  });

  let playerSelectionButton = document.getElementById(
    "userSelectionButtonPlaceholder"
  );
  let computerSelectionButton = document.getElementById(
    "computerSelectionButtonPlaceholder"
  );

  playerSelectionButton.parentElement.classList.toggle("col-md-6");
  playerSelectionButton.parentElement.classList.toggle("col-md-4");
  computerSelectionButton.parentElement.classList.toggle("col-md-6");
  computerSelectionButton.parentElement.classList.toggle("col-md-4");

  playAgainButton.addEventListener("click", () => playAgain());
}

function playAgain() {
  let playerSelectionButton = document.getElementById(
    "userSelectionButtonPlaceholder"
  );
  let computerSelectionButton = document.getElementById(
    "computerSelectionButtonPlaceholder"
  );
  playerSelectionButton.classList.remove(playerSelection);
  playerSelectionButton.firstElementChild.classList.remove("pulse");
  computerSelectionButton.classList.remove(computerSelection);
  computerSelectionButton.firstElementChild.classList.remove("pulse");

  toggleThirdScreen();

  secondScreen.classList.add("d-none");
  firstScreen.classList.remove("d-none");

  playerSelection = undefined;
  computerSelection = undefined;
  playAgainButtonIndicator = false;
}
