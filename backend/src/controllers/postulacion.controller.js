"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const PostulacionService = require("../services/postulacion.service");
const { postulacionBodySchema, postulacionIdSchema } = require("../schema/postulacion.schema");
const { handleError } = require("../utils/errorHandler");
const subida = require("../config/Multer.config");
const Postulacion = require("../models/postulacion.model");
/**
 * Obtiene todas las postulaciones
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulaciones(req, res) {
  try {
    const [postulaciones, errorPostulaciones] = await PostulacionService.getPostulaciones();
    if (errorPostulaciones) return respondError(req, res, 404, errorPostulaciones);

    postulaciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, postulaciones);
  } catch (error) {
    handleError(error, "postulacion.controller -> getPostulaciones");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva postulación
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createPostulacion(req, res) {
    try {
        // Utiliza el middleware de subida de Multer antes de procesar la apelación
        subida(req, res, async (error) => {
            if (error) {
                return respondError(req, res, 400, "Error al subir archivos");
            }
            const { body } = req;
            const { postulante, subsidio, monto, documentos } =  req.body;

            const nuevaPostulacion = new Postulacion({
                postulante,
                subsidio,
                monto,
                documentos: req.files.map((file) => file.filename),
               
            });

            // Guarda la apelación en la base de datos
            await nuevaPostulacion.save();

            // Envía una respuesta exitosa
            respondSuccess(req, res, 201, nuevaPostulacion);
        });
    } catch (error) {
        handleError(error, "postulacion.controller -> createPostulacion");
        console.log(error);
        respondError(req, res, 500, "No se creo la Postulacion");
    }
}

/**
 * Obtiene una postulación por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulacionById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [postulacion, errorPostulacion] = await PostulacionService.getPostulacionById(params.id);

    if (errorPostulacion) return respondError(req, res, 404, errorPostulacion);

    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> getPostulacionById");
    respondError(req, res, 500, "No se pudo obtener la postulación");
  }
}

/**
 * Actualiza una postulación por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updatePostulacion(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = postulacionBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [postulacion, postulacionError] = await PostulacionService.updatePostulacion(params.id, body);

    if (postulacionError) return respondError(req, res, 400, postulacionError);

    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> updatePostulacion");
    respondError(req, res, 500, "No se pudo actualizar la postulación");
  }
}

/**
 * Elimina una postulación por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deletePostulacion(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const postulacion = await PostulacionService.deletePostulacion(params.id);
    !postulacion
      ? respondError(
          req,
          res,
          404,
          "No se encontró la postulación solicitada",
          "Verifique el ID ingresado",
        )
      : respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> deletePostulacion");
    respondError(req, res, 500, "No se pudo eliminar la postulación");
  }
}

module.exports = {
  getPostulaciones,
  createPostulacion,
  getPostulacionById,
  updatePostulacion,
  deletePostulacion,
};
