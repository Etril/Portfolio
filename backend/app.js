const express = require("express");
const mongoose = require("mongoose");
const projetRoutes= require("./routes/projets.js");
const userRoutes= require("./routes/users.js");
const cors= require('cors');
const path = require ("path");
const helmet= require("helmet");
const DATABASE= process.env.DATABASE


const app=express();
app.use(cors());
app.use(helmet(
  {crossOriginResourcePolicy: false}));


mongoose.connect(DATABASE)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use("/api/projets", projetRoutes);
app.use("/api/auth", userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports=app;