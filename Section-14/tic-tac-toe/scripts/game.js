function startNewGame() {
  //   if (!players[0].name || !players[1].name) {
  //     alert("Please Set Player Names for Both Players");
  //     return;
  //   }
    
  // Reset Board.
  for(const gameBoardElement of gameBoardElements){
        gameBoardElement.classList.remove('disabled');
        gameBoardElement.textContent = '';
    }

  // Hide Winner Banner.
  gameOverArticleElement.style.display = 'none';
  // Reset Game Array.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j]=0;
    }
  }

  activePlayerNameElement.parentElement.style.display = "block";
  activePlayerNameElement.textContent = players[activePlayer].name;
  activeGameElement.style.display = "block";
}

function _switchPlayer() {
  if (activePlayer == 1) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
}

function _getWinner() {
  let winner = -1;

  // Horizontal Checks
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] == gameBoard[i][1] &&
      gameBoard[i][0] == gameBoard[i][2] &&
      gameBoard[i][0] != 0
    ) {
      winner = gameBoard[i][0];
      break;
    }
  }

  // Vertical Checks
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[0][i] == gameBoard[1][i] &&
      gameBoard[1][i] == gameBoard[2][i] &&
      gameBoard[2][i] != 0
    ) {
      winner = gameBoard[0][i];
      break;
    }
  }

  // Diagonal Checks
  if (
    gameBoard[1][1] == gameBoard[0][0] &&
    gameBoard[1][1] == gameBoard[2][2] &&
    gameBoard[1][1] != 0
  ) {
    winner = gameBoard[1][1];
  } else if (
    gameBoard[1][1] == gameBoard[0][2] &&
    gameBoard[1][1] == gameBoard[2][0] &&
    gameBoard[1][1] != 0
  ) {
    winner = gameBoard[1][1];
  }

  // Draw Check
  if (winner == -1) {
    winner = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[i][j] == 0) {
          winner = -1;
          break;
        }
      }
    }
  }

  // Verdict.
  return winner;
}

function _showWinnerEndGame(winner) {
  gameOverArticleElement.style.display = "block";
  if (winner == 0) {
    winnerNameArticleElement.textContent = "Oh! It's a Draw! ^^";
  } else {
    winnerNameArticleElement.textContent = players[winner - 1].name;
  }
  activePlayerNameElement.parentElement.style.display = "none";
}

function selectGameField(event) {
  if (event.target.classList.contains("disabled")) {
    return;
  }
  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");
  gameBoard[event.target.dataset.row][event.target.dataset.col] =
    activePlayer + 1;

  let winner = _getWinner();
  if (winner != -1) {
    _showWinnerEndGame(winner);
    for (const listElement of gameBoardElements) {
      if (!listElement.classList.contains("disabled")) {
        listElement.classList.add("disabled");
      }
    }
    return;
  }

  _switchPlayer();
  activePlayerNameElement.textContent = players[activePlayer].name;
}
