const mongoose = require('mongoose');

const postulacionSchema = new mongoose.Schema({
  postulante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  documentos: [String],
});

module.exports = mongoose.model('Postulacion', postulacionSchema);