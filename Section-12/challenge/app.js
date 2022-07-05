let inputField = document.getElementById("prodName");
let p = document.getElementById("letterCount");
let span = p.firstElementChild;

let count = 0;

let errorColor = "rgb(228, 157, 128)";
let focusColor = "rgba(240, 238, 116, 0.836)";
let bodyBgColor = "linear-gradient(90deg, rgb(40, 40, 40), rgb(47, 47, 47))";

inputField.addEventListener("input", function (event) {
  count = event.target.value.length;

  if (count >= 60) {
    count = 60;
    inputField.value = inputField.value.substring(0, 60);
  } else if (count >= 50) {
    inputField.style.backgroundColor = errorColor;
    document.body.style.background = 'rgb(245, 20, 1)';
  } else if (count < 50 && inputField.style.backgroundColor == errorColor) {
    inputField.style.backgroundColor = focusColor;
    document.body.style.background = bodyBgColor;
  }

  span.textContent = 60-count;
});
