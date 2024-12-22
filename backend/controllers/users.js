const User = require("../models/User");
const bcrypt= require('bcryptjs');
const jwt = require("jsonwebtoken");
const TOKENSECRET=process.env.TOKENSECRET



/*** Cette route est utilisée pour connecter un utilisateur existant */

exports.login = (req, res, next) => {
  console.log("Login request received:", req.body); // Log de la requête

  User.findOne({ name: req.body.name })
    .then((user) => {
      if (user === null) {
        console.log("User not found");
        return res.status(401).json({ message: "Informations erronées" });
      } else {
        console.log("User found, comparing password");

        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              console.log("Password is incorrect");
              return res.status(401).json({ message: "Informations erronées" });
            } else {
              console.log("Password is correct, generating token");
              return res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, TOKENSECRET, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            console.error("Error in bcrypt comparison:", error);
            return res.status(500).json({ error: error.message });
          });
      }
    })
    .catch((error) => {
      console.error("Error in finding user:", error);
      return res.status(500).json({ error: error.message });
    });
};