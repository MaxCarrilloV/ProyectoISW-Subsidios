const Joi = require("joi");

const postulacionBodySchema = Joi.object({
    postulante: Joi.string()
        .required()
        .messages({
            "string.empty": "El postulante no puede estar vacío.",
            "any.required": "El postulante es obligatorio.",
            "string.base": "El postulante debe ser de tipo string.",
        }),

    subsidio: Joi.string()
        .required()
        .messages({
            "string.empty": "El subsidio no puede estar vacío.",
            "any.required": "El subsidio es obligatorio.",
            "string.base": "El subsidio debe ser de tipo string.",
        }),

    

        documentos: Joi.array().items(Joi.string()).required().messages({
            "array.empty": "Los documentos no pueden estar vacíos.",
            "any.required": "Los documentos son obligatorios.",
            "array.base": "Los documentos deben ser de tipo array.",
        }),

    // Otras propiedades del modelo Postulacion, si las tienes.
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});


const postulacionIdSchema = Joi.object({
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

module.exports = { postulacionBodySchema,postulacionIdSchema };


