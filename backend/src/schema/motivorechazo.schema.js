const Joi = require("joi");

//Validacion de datos de rechazo
const rechazoSchema = Joi.object({
    postulacion: Joi.string().required().messages({
        "string.empty": "El ID de la postulación no puede estar vacío.",
        "any.required": "El ID de la postulación es obligatorio.",
        "string.base": "El ID de la postulación debe ser de tipo string.",
    }),
    motivo: Joi.string().required().messages({
        "string.empty": "El motivo no puede estar vacío.",
        "any.required": "El motivo es obligatorio.",
        "string.base": "El motivo debe ser de tipo string.",
    }),
})

module.exports = { rechazoSchema};

