//crea un modelo de estado de postulacion utilizando estado.constant.js

const mongoose = require("mongoose");
const criterioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
const Criterio = mongoose.model("Criterio", criterioSchema);
module.exports = Criterio;

