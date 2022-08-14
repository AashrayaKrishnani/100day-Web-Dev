function postIsValid(enteredTitle, enteredContent) {
  return !(
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === "" ||
    enteredContent.trim() === ""
  );
}

function userIsValid(user) {
  return !(
    !user.email ||
    !user.password ||
    user.password.trim().length < 6 ||
    !user.email.includes("@")
  );
}

module.exports = { postIsValid: postIsValid, userIsValid: userIsValid };
