function validateSignupData(data) {
  if (
    _isEmpty(data["first-name"]) ||
    _isEmpty(data["last-name"]) ||
    _isEmpty(data["email"]) ||
    _isEmpty(data["password"]) ||
    _isEmpty(data["confirm-password"]) ||
    _isEmpty(data["house"]) ||
    _isEmpty(data["street"]) ||
    _isEmpty(data["postal"]) ||
    _isEmpty(data["city"]) ||
    _isEmpty(data["country"])
  ) {
    return { result: false, message: "Please Fill All Fields :)", ...data };
  }

  if (data["password"] !== data["confirm-password"]) {
    return {
      result: false,
      message: "Passwords Do Not Match. Kindly Recheck :)",
      ...data,
    };
  }

  return { result: true };
}

function validateLoginData(data) {
  if (_isEmpty(data["email"]) || _isEmpty(data["password"])) {
    return { result: false, message: "Please Fill All Fields :)", ...data };
  }
  return { result: true };
}

function _isEmpty(string) {
  return !string.trim();
}

module.exports = {
  validateSignupData: validateSignupData,
  validateLoginData: validateLoginData,
};
