const User = require("../models/User");
const bcrypt= require('bcryptjs');
const jwt = require("jsonwebtoken");
const TOKENSECRET=process.env.TOKENSECRET



/*** Cette route est utilisée pour connecter un utilisateur existant */

exports.login = (req, res, next) => {
  User.findOne({
    name: req.body.name,
  })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Informations eronnées" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Informations eronnées" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, TOKENSECRET, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
