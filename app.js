const http = require("http");
const customers = [{ id: 1, name: "Andi", city: "Dortmund" }, { id: 2, name: "Sara", city: "Berlin" }];
const products = [{ id: 1, name: "Laptop", price: 999 }, { id: 2, name: "Mouse", price: 25 }];
const server = http.createServer(function (request, response) {
  response.setHeader("Content-Type", "application/json");
  if (request.url === "/") { response.end(JSON.stringify({ message: "Welcome to my API" })); return; }
  if (request.url === "/customers") { response.end(JSON.stringify(customers)); return; }
  if (request.url === "/products") { response.end(JSON.stringify(products)); return; }
  response.statusCode = 404;
  response.end(JSON.stringify({ error: "Route not found" }));
});
server.listen(3000, function () { console.log("Server is running on port 3000"); });
