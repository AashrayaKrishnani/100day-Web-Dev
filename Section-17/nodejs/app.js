// import http from "http";
const http = require("http");

function handleReq(request, response) {
  response.statusCode = 200;

  if (request.url == "/current-time") {
    response.end("<h1> " + new Date().toTimeString() + "</h1>");
  } else if (request.url == "/") {
    response.end("<h1> Hello NodeJS!! ^^</h1>");
  } else {
    response.end("Got Lost Eh? ;p");
  }
}

const server = http.createServer(handleReq);

server.listen(5500); // Access 127.0.0.1:5500
