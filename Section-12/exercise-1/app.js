const inputField = document.getElementById("prodName");
const p = document.getElementById("letterCount");
const span = p.firstElementChild;

let count = 0;
const maxCount = inputField.maxLength;

inputField.addEventListener("input", function (event) {
  count = event.target.value.length;

  if (count >= (maxCount-10)) {
    inputField.classList.add('warning');
    span.classList.add('warning');
  } else if (count < (maxCount-10)) {
    inputField.classList.remove('warning');
    span.classList.remove('warning');
  
  }

  span.textContent = maxCount - count;
});
