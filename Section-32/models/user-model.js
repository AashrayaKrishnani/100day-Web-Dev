const bcrypt = require("bcryptjs");

const db = require("../database/database");

class User {
  constructor(details) {
    this.name = {
      firstName: details["first-name"],
      lastName: details["last-name"],
    };
    this.password = details.password;
    this.email = details.email.trim().toLowerCase();
    this.address = {
      house: details.house,
      street: details.street,
      postal: details.postal,
      city: details.city,
      country: details.country,
    };
  }

  async isExistingInDb() {
    const isExisting = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });

    return isExisting ? true : false;
  }

  async signup() {
    await db
      .getDb()
      .collection("users")
      .insertOne({
        name: this.name,
        password: await bcrypt.hash(this.password, 12),
        email: this.email,
        address: this.address,
      });
  }
}

module.exports = User;
