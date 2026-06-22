const express = require("express");
const router = express.Router();
let customers = require("../data/customers");
router.get("/", function (request, response) { response.status(200).json(customers); });
module.exports = router;
