//crea un modelo de estado de postulacion utilizando estado.constant.js
const ESTADOS = require("../constants/estado.constants.js");
const mongoose = require("mongoose");
const estadoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ESTADOS,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
const Estado = mongoose.model("Estado", estadoSchema);
module.exports = Estado;

