const bcrypt = require("bcryptjs");
const { MongoCursorInUseError } = require("mongodb");
const db = require("../data/database");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async findUserByEmail(email) {
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ email: email });

    return existingUser;
  }

  async existsAlready() {
    const existingUser = await User.findUserByEmail(this.email);

    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  async getId() {
    if (!this._id) {
      this._id = (await User.findUserByEmail(this.email))._id;
    }

    return this._id;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    return db
      .getDb()
      .collection("users")
      .insertOne({ email: this.email, password: hashedPassword });
  }

  async comparePass() {
    const existingUser = await User.findUserByEmail(this.email);

    const passwordsAreEqual = await bcrypt.compare(
      this.password,
      existingUser.password
    );
    console.log(existingUser, passwordsAreEqual, this.password);

    return passwordsAreEqual;
  }
}

module.exports = User;
