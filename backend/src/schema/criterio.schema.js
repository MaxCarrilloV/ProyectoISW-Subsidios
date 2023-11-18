const Joi = require("joi");

const criterioSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del criterio no puede estar vacío.",
    "any.required": "El nombre del criterio es obligatorio.",
    "string.base": "El nombre del criterio debe ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

const criterioIdSchema = Joi.object({
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

module.exports = { criterioSchema, criterioIdSchema };
