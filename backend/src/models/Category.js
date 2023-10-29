"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la colección 'subsidios'
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Crea el modelo de datos 'Subsidio' a partir del esquema 'categorySchema'
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
