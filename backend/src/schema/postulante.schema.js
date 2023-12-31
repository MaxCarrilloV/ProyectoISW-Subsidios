const joi = require("joi");

const postulanteBodySchema = joi.object({ 
    user: joi.string().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).required().messages({
        "string.empty": "El usuario no puede estar vacío.",
        "any.required": "El usuario es obligatorio.",
        "string.base": "El usuario debe ser de tipo string.",
        "string.pattern.base": "El usuario proporcionado no es un ObjectId válido.",
    }),
    nombre: joi.string().pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñüÜ\s']+$/).required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.pattern.base": "El nombre no puede contener números.",
    }),
    rut: joi.string().pattern(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/).required().messages({
        "string.empty": "El rut no puede estar vacío.",
        "any.required": "El rut es obligatorio.",
        "string.base": "El rut debe ser de tipo string.",
        "string.pattern.base": "El rut no es válido.",
    }),
    fechaNacimiento: joi.date().required().messages({
        "string.empty": "La fecha de nacimiento no puede estar vacía.",
        "any.required": "La fecha de nacimiento es obligatoria.",
        "string.base": "La fecha de nacimiento debe ser de tipo string.",
    }),
    direccion: joi.string().pattern(/^[a-zA-Z0-9ÁÉÍÓÚÑáéíóúñüÜ\s.,#-]+$/).required().messages({
        "string.empty": "La dirección no puede estar vacía.",
        "any.required": "La dirección es obligatoria.",
        "string.base": "La dirección debe ser de tipo string.",
        "string.pattern.base": "La dirección contiene caracteres inválidos.",
    }),

}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const postulanteIdSchema = joi.object({
    id: joi.string().required().pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/).messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});
module.exports = { postulanteBodySchema, postulanteIdSchema };
