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
  decision: Joi.string().valid("Aprobada", "Rechazada").messages({
    "any.only": "La decisión debe ser 'Aprobada' o 'Rechazada'.",
    "any.required": "La decisión es obligatoria.",
  }),
  formularioEvaluacion: Joi.object({
    puntajeMax: Joi.number().messages({
      "number.base": "El puntaje máximo debe ser un número.",
      "number.empty": "El puntaje máximo no puede estar vacío.",
      "number.min": "El puntaje máximo debe ser mayor o igual a 0.",
      "number.max": "El puntaje máximo debe ser menor o igual a 100.",
      "any.required": "El puntaje máximo es obligatorio.",
    }),
    observaciones: Joi.string(),
    puntajeAprobacion: Joi.number().messages({
      "number.base": "El puntaje de aprobacion debe ser un número.",
      "number.empty": "El puntaje de aprobacion no puede estar vacío.",
      "number.min": "El puntaje de aprobacion debe ser mayor o igual a 0.",
      "number.max": "El puntaje de aprobacion debe ser menor o igual a 100.",
      "any.required": "El puntaje de aprobacion es obligatorio.",
    }),
    criterios: Joi.array().items(
      Joi.object({
        nombre: Joi.string().required().messages({
          "string.empty": "El ID del nombre del criterio no puede estar vacío.",
          "any.required": "El ID del nombre del criterio es obligatorio.",
          "string.base": "El ID del nombre del criterio debe ser de tipo string.",
        }),
        puntuacion: Joi.number().required().min(0).max(10).messages({
          "number.base": "La puntuación del criterio debe ser un número.",
          "number.empty": "La puntuación del criterio no puede estar vacía.",
          "number.min": "La puntuación del criterio debe ser mayor o igual a 0.",
          "number.max": "La puntuación del criterio debe ser menor o igual a 10.",
          "any.required": "La puntuación del criterio es obligatoria.",
        }),
      })
    ),
  }),
  
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

module.exports = { evaluacionSchema, evaluacionIdSchema };
