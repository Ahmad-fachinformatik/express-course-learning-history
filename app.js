const http = require("http");
const server = http.createServer(function (request, response) {
  response.end("Hello from Node.js server");
});
server.listen(3000, function () { console.log("Server is running on port 3000"); });
