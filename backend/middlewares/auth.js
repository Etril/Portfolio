const jwt = require("jsonwebtoken");
const TOKENSECRET=process.env.TOKENSECRET

/*** Ce middleware récupère le token de l'utilisateur à chaque requête à autoriser, le vérifie et rajoute à la requête le userId correspondant */

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken= jwt.verify(token, TOKENSECRET );
        const userId= decodedToken.userId;
        req.auth={
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({error});
    }
}