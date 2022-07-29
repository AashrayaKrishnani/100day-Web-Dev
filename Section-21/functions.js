function greetUser(userName = "Krishna") {
  //   console.log("Hi there " + userName + "!");
  console.log(`Hi there ${userName}!`);
  // Formatted Strings OP! :D
}

greetUser("Max");
greetUser();

function sumUp(...nums) {
  let sum = 0;

  for (const num of nums) {
    sum += num;
  }

  console.log(sum);
}

const numbers = [4, 5, 432, 2, 1];

sumUp(...numbers);

sumUp.purpose = "Adds numbers I guess ;p";
