const express = require("express");
const adminController = require("../controller/adminController");

const router = express();

router.post("/signup", adminController.signup);

module.exports = router;
