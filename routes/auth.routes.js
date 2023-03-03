const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
// const authJwt = require("../middleware/verifySignedIn");

router.post("/add-user", controller.addUser);
router.post("/login-user", controller.loginUser);
router.get("/user-list", controller.getUsers);
module.exports = router;