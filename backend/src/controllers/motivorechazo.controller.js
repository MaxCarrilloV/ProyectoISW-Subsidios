//Controlador de rechazo
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { rechazoSchema } = require("../schema/motivorechazo.schema");
const MotivoRechazoService = require("../services/motivorechazo.service");

/**
 * Crea un nuevo motivo de rechazo
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function createMotivoRechazo(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = rechazoSchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newMotivoRechazo, motivoRechazoError] = await MotivoRechazoService.createMotivoRechazo(body);

        if (motivoRechazoError) return respondError(req, res, 400, motivoRechazoError);
        if (!newMotivoRechazo) {
            return respondError(req, res, 400, "No se creo el motivo de rechazo");
        }

        respondSuccess(req, res, 201, newMotivoRechazo);
    } catch (error) {
        handleError(error, "motivorechazo.controller -> createMotivoRechazo");
        respondError(req, res, 500, "No se creo el motivo de rechazo");
    }
}

async function getMotivoRechazo(req, res) {
    try {
        const { params } = req;
        const { id } = params;
        const [motivoRechazo, motivoRechazoError] = await MotivoRechazoService.getMotivoRechazo(id);
        if (motivoRechazoError) return respondError(req, res, 400, motivoRechazoError);
        if (!motivoRechazo) return respondError(req, res, 400, "El motivo de rechazo no existe");
        respondSuccess(req, res, 200, motivoRechazo);
    } catch (error) {
        handleError(error, "motivorechazo.controller -> getMotivoRechazo");
        respondError(req, res, 500, "No se obtuvo el motivo de rechazo");
    }
}

module.exports = { createMotivoRechazo, getMotivoRechazo };
