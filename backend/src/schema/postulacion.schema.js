//Schema de postulacion

const Joi = require("joi");

const postulacionSchema = Joi.object({
    postulante: Joi.string().required().messages({
        "string.empty": "El postulante no puede estar vacío.",
        "any.required": "El postulante es obligatorio.",
        "string.base": "El postulante debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
 });

module.exports = { postulacionSchema };

