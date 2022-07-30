const fs = require("fs/promises");

async function readFileAsync() {
  const fileData = await fs.readFile("data.txt");
  console.log("Parsing file done! :D");
  console.log(fileData.toString());

  console.log("Hello there! :D");
}

readFileAsync();
