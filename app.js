const express = require("express");
const app = express();
const port = 3000;
let customers = [{ id: 1, name: "Andi", city: "Dortmund" }, { id: 2, name: "Sara", city: "Berlin" }];
let products = [{ id: 1, name: "Laptop", price: 999 }, { id: 2, name: "Mouse", price: 25 }];
app.get("/", function (request, response) { response.status(200).json({ message: "Welcome to my API" }); });
app.listen(port, function () { console.log("Server is running on port " + port); });
