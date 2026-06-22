const express = require("express");
const router = express.Router();
let products = require("../data/products");
router.get("/", function (request, response) { response.status(200).json(products); });
module.exports = router;
