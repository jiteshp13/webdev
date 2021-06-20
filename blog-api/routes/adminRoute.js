const express = require("express");
const adminController = require("../controller/adminController");

const router = express();

router.post("/signup", adminController.signup);
router.get("/login", adminController.login);

module.exports = router;
