const mongoose = require('mongoose');

const apelacionSchema = new mongoose.Schema({
    postulacionrechazada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'motivorechazo', 
        required: true
    },
    documentos: [
        {
            type: String,
            required: true,
        }
    ],
    comentario: {
        type: String,
        required: false,
    },
});

const Apelacion = mongoose.model('Apelacion', apelacionSchema);

module.exports = Apelacion;
