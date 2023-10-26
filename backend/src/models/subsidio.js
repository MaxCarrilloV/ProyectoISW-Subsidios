"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la colección 'subsidios'
const subsidioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mont: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    },
});

// Crea el modelo de datos 'Subsidio' a partir del esquema 'subsidioSchema'
const Subsidio = mongoose.model("Subsidio", subsidioSchema);

module.exports = Subsidio;
