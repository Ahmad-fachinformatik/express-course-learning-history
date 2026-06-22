const http = require("http");
const server = http.createServer(function (request, response) {
  console.log(request.method);
  console.log(request.url);
  response.statusCode = 200;
  response.end("Request received");
});
server.listen(3000, function () { console.log("Server is running on port 3000"); });
