const fs = require("fs/promises");

function readFileAsync() {
  fs.readFile("data.txt")
    .then(function (fileData) {
      console.log("Parsing file done! :D");
      console.log(fileData.toString());
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("Hello there! :D");
}

readFileAsync();
