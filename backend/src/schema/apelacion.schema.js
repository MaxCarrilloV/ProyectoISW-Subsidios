//Schema de Apelacion

const Joi = require("joi");

const apelacionSchema = Joi.object({
    postulacionrechazada: Joi.string().required().messages({
        "string.empty": "La postulación no puede estar vacía.",
        "any.required": "La postulación es obligatoria.",
        "string.base": "La postulación debe ser de tipo string.",
    }),
    documentos: Joi.array().items(Joi.string()).required().messages({
        "array.empty": "Los documentos no pueden estar vacíos.",
        "any.required": "Los documentos son obligatorios.",
        "array.base": "Los documentos deben ser de tipo array.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { apelacionSchema };
