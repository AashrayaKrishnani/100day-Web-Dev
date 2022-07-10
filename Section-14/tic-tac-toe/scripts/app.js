let editPlayer = 0; // editPlayer is either 1 or 2, corresponding to players numbers.
let activePlayer = 0; // Active player can be 0 or 1, -> index for players array

const players = [
  {
    name: "",
    symbol: "X",
  },

  { name: "", symbol: "O" },
];

const gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const overlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const formErrorElement = document.getElementById("config-errors");
const activeGameElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverArticleElement = document.getElementById('game-over');
const winnerNameArticleElement = document.getElementById('winner-name');

const editP1BtnElement = document.getElementById("edit-p1-name-btn");
const editP2BtnElement = document.getElementById("edit-p2-name-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");
const confirmConfigBtnElement = document.getElementById("confirm-config-btn");
const startGameBtnElement = document.getElementById("start-game-btn");
const gameBoardElements = document.querySelectorAll("#game-board li");

editP1BtnElement.addEventListener("click", openPlayerConfig);
editP2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startGameBtnElement.addEventListener("click", startNewGame);

for (const gameBoardElement of gameBoardElements) {
  gameBoardElement.addEventListener("click", selectGameField);
}
