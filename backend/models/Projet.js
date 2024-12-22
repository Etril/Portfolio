const mongoose = require("mongoose");

const ProjetSchema = mongoose.Schema({

  title: { type: String, required: true },
  snippet: { type: String, require: true },
  cover: { type: String, required: true },
  description: {type: String, required: true},
  lien: { type: String, required: true },
  tags: {type: [String], required: true},
  tools: {type: [String], required: true},
  pictures: {type: [String], required: true},
});

module.exports = mongoose.model("Projet", ProjetSchema);
