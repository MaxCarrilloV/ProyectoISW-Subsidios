const mongoose = require('mongoose');
const ESTADOS = require('../constants/estado.constants');

const postulacionSchema = new mongoose.Schema({
  postulante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Postulante', 
    required: true,
  },
  subsidio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subsidio',
    required: true,
  },
  documentos: [
    {
        type: String,
        required: true,
    }
  ] ,
  fechaSolicitud: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ESTADOS,
    default: 'Pendiente',
  },
});

module.exports = mongoose.model('Postulacion', postulacionSchema);