const Joi = require("joi");


const evaluacionSchema = Joi.object({
  postulacion: Joi.string().required().messages({
    "string.empty": "El ID de la postulación no puede estar vacío.",
    "any.required": "El ID de la postulación es obligatorio.",
    "string.base": "El ID de la postulación debe ser de tipo string.",
  }),
  evaluador: Joi.string().required().messages({
    "string.empty": "El ID del evaluador no puede estar vacío.",
    "any.required": "El ID del evaluador es obligatorio.",
    "string.base": "El ID del evaluador debe ser de tipo string.",
  }),
  decision: Joi.string().valid("Aprobada", "Rechazada").required().messages({
    "any.only": "La decisión debe ser 'Aprobada' o 'Rechazada'.",
    "any.required": "La decisión es obligatoria.",
  }),
  observaciones: Joi.string(),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const evaluacionIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { evaluacionSchema ,evaluacionIdSchema };