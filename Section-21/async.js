const fs = require("fs");

function readFileAsync() {
  fs.readFile("data.txt", function (error, fileData) {
    console.log("Parsing file done! :D");
    console.log(fileData.toString());
  });

  console.log("Hello there! :D");
}

readFileAsync();
