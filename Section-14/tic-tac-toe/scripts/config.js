function openPlayerConfig(event) {
  editPlayer = +event.target.dataset.playerId;
  document.getElementById("playerName").value = players[editPlayer - 1].name;
  overlay.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  overlay.style.display = "none";
  backdropElement.style.display = "none";
  formErrorElement.textContent = "";
  formElement.firstElementChild.classList.remove("error");
  editPlayer = 0;
  formElement.reset();
}

function savePlayerConfig(event) {
  event.preventDefault(); // Will Prevent default behaviour of sending a form submission and keeps the page from reloading.

  const formData = new FormData(event.target);
  const enteredName = formData.get("playerName").toString().trim();

  var errorString = "";

  if (!enteredName) {
    errorString = "Please Enter a Valid Name!";
  } else if (enteredName.length < 3) {
    errorString = "Please Enter atleast 3 Characters!";
  } else if (enteredName.length > 20) {
    errorString = "Please Enter atmost 20 Characters.";
  }

  if (errorString) {
    event.target.firstElementChild.classList.add("error");
    formErrorElement.textContent = errorString;
    return;
  }

  // If Valid input is Provided

  if (editPlayer == 1 || editPlayer == 2) {
    const playerNameElement = document.getElementById(
      "player-" + editPlayer + "-name"
    );
    playerNameElement.textContent = enteredName;
    players[editPlayer - 1].name = enteredName;
  }

  closePlayerConfig();
}
