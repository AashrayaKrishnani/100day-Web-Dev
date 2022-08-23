const bcrypt = require("bcryptjs");

const db = require("../database/database");

const sanitizeInputUtil = require("../utils/sanitize-input");
const removeWhiteSpaces = sanitizeInputUtil.removeWhiteSpaces;

class User {
  constructor(details) {
    this.name = {
      firstName: removeWhiteSpaces(details["first-name"]),
      lastName: removeWhiteSpaces(details["last-name"]),
    };
    this.password = removeWhiteSpaces(details.password);
    this.email = removeWhiteSpaces(details.email.toLowerCase());
    this.address = {
      house: removeWhiteSpaces(details.house),
      street: removeWhiteSpaces(details.street),
      postal: removeWhiteSpaces(details.postal),
      city: removeWhiteSpaces(details.city),
      country: removeWhiteSpaces(details.country),
    };
  }

  async isExistingInDb() {
    const isExisting = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });

    return isExisting;
  }

  async signup() {
    // Checks for account in DB
    // Signs up user if not already present :)

    const user = await this.isExistingInDb();

    if (user) {
      return {
        result: false,
        message: "We already know that email. Please Login :)",
      };
    }

    // Finally Signing up the user.
    await db
      .getDb()
      .collection("users")
      .insertOne({
        name: this.name,
        password: await bcrypt.hash(this.password, 12),
        email: this.email,
        address: this.address,
      });

    return { result: true, message: "Singup Successful :)" };
  }

  async tryLogin() {
    // Checks for account in DB
    // Verifies password
    // Finally updates current user Data from DB if all goes well :)

    const user = await this.isExistingInDb();

    if (!user) {
      return {
        result: false,
        message: "It's our first time seeing that email - kindly Signup :)",
      }; // Not in DB :p
    }

    // Verifying Password
    const isPassValid = await bcrypt.compare(this.password, user.password);

    if (!isPassValid) {
      return { result: false, message: "Invalid Password, please try again." };
    }

    // Finally updating data :)

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.address = user.address;
    this._id = user._id.toString();

    return { result: true, message: "Login Successful :)" };
  }
}

module.exports = User;
