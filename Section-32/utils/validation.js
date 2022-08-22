function validateSignupData(req) {
  if (
    !req["first-name"] ||
    !req["last-name"] ||
    !req["email"] ||
    !req["password"] ||
    !req["confirm-password"] ||
    !req["house"] ||
    !req["street"] ||
    !req["postal"] ||
    !req["city"] ||
    !req["country"]
  ) {
    return { isValid: false, message: "Missing Data" };
  }

  if (!req["password"] !== !req["confirm-password"]) {
    return { isValid: false, message: "Passwords Do Not Match" };
  }

  return { isValid: true };
}

module.exports = { validateSignupData: validateSignupData };
