const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const filePath = path.join(__dirname, "data", "users.json");

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);
  users.reverse();

  let outputHTML = "<h1> Existing Users </h1>" + "<ul>";

  for (const userName of users) {
    outputHTML += "<li> " + userName + "</li>";
  }

  outputHTML += "</ul>";

  res.send(
    '<form action="/store-user" method="POST"> <label for="username">Your Name</label> <input type="text" id="username" name="username"></form>' +
      outputHTML
  );
});

app.post("/store-user", function (req, res) {
  const username = req.body.username;

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(username);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1> Username Saved: " + username + "</h1>");
});

app.get("/get-users", function (req, res) {
  res.send(outputHTML);
});

app.listen(5500);
