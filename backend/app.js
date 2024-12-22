const express = require("express");
const mongoose = require("mongoose");
const projetRoutes= require("./routes/projets.js");
const userRoutes= require("./routes/users.js");
const cors= require('cors');
const path = require ("path");
const helmet= require("helmet");
const DATABASE= process.env.DATABASE

const app=express();

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.get('Host') + req.url);
    }
    return next();
  });
}


app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Permet l'accès à des ressources provenant d'autres origines
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'https://res.cloudinary.com', "data:", "blob:"], 
    },
  },
}));


mongoose.connect(DATABASE)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
app.use("/api/projets", projetRoutes);
app.use("/api/auth", userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}



module.exports=app;