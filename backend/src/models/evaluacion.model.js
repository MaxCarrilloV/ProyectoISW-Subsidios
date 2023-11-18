const mongoose = require('mongoose');


const evaluacionSchema = new mongoose.Schema({
  postulacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Postulacion', 
    required: true,
    unique: true,
  },
  evaluador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  decision: {
    type: String,
    enum: ['Aprobada', 'Rechazada'],
    required: true
  },
  fechaEvaluacion: {
    type: Date,
    default: Date.now,
  },
  formularioEvaluacion: {
    puntajeMax: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    observaciones: String,
    puntajeAprobacion: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    criterios: [
      {
        nombre: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Criterio',
          unique: true,
        },
        puntuacion: {
          type: Number,
          min: 0,
          max: 10,
        },
      },
    ],
  },
  
});

module.exports = mongoose.model('Evaluacion', evaluacionSchema);