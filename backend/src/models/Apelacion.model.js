const mongoose = require("mongoose");

const apelacionSchema = new mongoose.Schema({
    postulacionrechazada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "motivorechazo", 
        required: true,
    },
    documentos: [
        {
            type: String,
            required: true,
        },
    ],
    comentario: {
        type: String,
        required: false,
    },
    fechaApelacion: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("Apelacion", apelacionSchema);
