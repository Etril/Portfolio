const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const rateLimiter = require("../middlewares/rateLimiter");

router.post("/login", rateLimiter, usersCtrl.login);

module.exports = router;
