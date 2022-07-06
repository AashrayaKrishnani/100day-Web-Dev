// Sum Numbers

const sumBtn = document.querySelector("#calculator button");

sumBtn.addEventListener("click", function () {
  const inputNum = +document.getElementById("user-number").value;
  const pTag = document.getElementById("calculated-sum");
  var sum = 0;

  for (let i = 0; i <= inputNum; i++) sum += i;

  pTag.textContent = sum;
  pTag.style.display = "block";
});

// Highlight Links

const highlightBtn = document.querySelector("#highlight-links button");

highlightBtn.addEventListener("click", function () {
  const links = document.querySelectorAll("#highlight-links a");

  for (const link of links) {
    link.classList.add("highlight");
  }
});

// Display user data

const dummyData = {
  username: "LoverOfGod",
  age: "1/0",
};

const displayDataBtn = document.querySelector("#user-data button");

displayDataBtn.addEventListener("click", function () {
  const outUl = document.getElementById("output-user-data");
  if (outUl.innerHTML == "") {
    for (const key in dummyData) {
      const li = document.createElement("li");
      li.textContent = key.toUpperCase() + ": " + dummyData[key];
      outUl.append(li);
    }
  }
});

// Roll Dice

const rollDiceBtn = document.querySelector("#statistics button");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

rollDiceBtn.addEventListener("click", function () {
  const targetNum = +document.getElementById("user-target-number").value;
  const diceRollsUl = document.getElementById("dice-rolls");

  if (targetNum > 6 || targetNum < 1) {
    return;
  }

  let rollNum = rollDice();
  let rollsCount = 1;
  let rollStop = false;

  while (!rollStop) {
    const rollsDataLi = document.createElement("li");
    console.log("Roll Num=" + rollNum);
    console.log("targetNum=" + targetNum);
    rollsDataLi.textContent = "Roll " + rollsCount + ": " + rollNum;
    diceRollsUl.append(rollsDataLi);

    if (rollNum == targetNum) {
      rollStop = true;
    } else {
      rollsCount++;
    }
    rollNum = rollDice();
  }

  const totalRollsSpan = document.getElementById("output-total-rolls");
  const targetNumSpan = document.getElementById("output-target-number");

  totalRollsSpan.textContent = rollsCount;
  targetNumSpan.textContent = targetNum;
});
