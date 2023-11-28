const { number } = require('joi');
const mongoose = require('mongoose');

const postulanteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    rut:{
        type: String,
        required: true,
    },
    fechaNacimiento:{
        type: Date,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('Postulante', postulanteSchema);