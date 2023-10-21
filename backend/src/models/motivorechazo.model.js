//Motivo rechazo postulacion
"use strict";

const mongoose = require('mongoose');

const rechazoSchema = new mongoose.Schema({
    postulacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Postulacion', 
        required: true
    },
    motivo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('MotivoRechazo', rechazoSchema);

