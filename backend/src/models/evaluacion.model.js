const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
  postulacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Postulacion', // Referencia a la postulación evaluada
    required: true
  },
  evaluador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario para el evaluador
    required: true
  },
  decision: {
    type: String,
    enum: ['Aprobada', 'Rechazada'],
    required: true
  },
  observaciones: String,
});

module.exports = mongoose.model('Evaluacion', evaluacionSchema);