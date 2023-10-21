//Servicio para la tabla rechazo

const MotivoRechazo = require("../models/motivorechazo.model");
const evaluacionModel = require("../models/evaluacion.model");

const { handleError } = require("../utils/errorHandler");


async function createMotivoRechazo(motivorechazo) {
    try {
        const { postulacion, motivo } = motivorechazo;
        // Verificar si la postulación existe antes de crear la evaluación
        if(!evaluacionModel.findOne({postulacion})) return [null, "La postulación no existe"];

        //Verificar si la postulación fue rechazada
        if(!evaluacionModel.decision === "Rechazada") return [null, "La postulación no fue rechazada"];

        //Verificar si ya se ha creado el motivo de rechazo
        const motivoExistente = await motivorechazo.findOne({ postulacion });
        if (motivoExistente) return [null, "El motivo de rechazo ya existe"];

        const nuevaMotivoRechazo = new MotivoRechazo({
            postulacion,
            motivo,
        });
        
        await nuevaMotivoRechazo.save();
        return [nuevaMotivoRechazo, null];
    } catch (error) {
        handleError(error, "motivorechazo.service -> createMotivoRechazo");
    }
}

module.exports = { createMotivoRechazo };


