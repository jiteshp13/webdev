const express = require("express");
const userController = require("../controller/userController");

const router = express();

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.get("/getUser/:id", userController.getUser);

module.exports = router;
