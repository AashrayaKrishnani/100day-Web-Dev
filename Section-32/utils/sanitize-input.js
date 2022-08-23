function removeWhiteSpaces(input) {
  if (!input) {
    return "";
  }
  return input.trim();
}

module.exports = { removeWhiteSpaces: removeWhiteSpaces };
