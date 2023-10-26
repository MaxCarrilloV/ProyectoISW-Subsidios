"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const subsidioService = require("../services/subsidio.service"); 
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los subsidios y responde con éxito o error.
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 */
async function getSubsidios(req, res) {
  try {
    const [subsidios, errorSubsidios] = await subsidioService.getSubsidios(); 
    if (errorSubsidios) return respondError(req, res, 404, errorSubsidios); 
  
    subsidios.length === 0
    ? respondSuccess(req, res, 204)
    : respondSuccess(req, res, 200, subsidios);
} catch (error) {
    handleError(error, "subsidio.controller -> getSubsidios");
    respondError(res, "Error al obtener los subsidios");
  }
}
/**
 * 
*/
async function createSubsidio(req, res) {
  try {
    const { body } = req;

    const [newSubsidio, subsidioError] =
      await subsidioService.createSubsidio(body);

    if (subsidioError) return respondError(req, res, 400, subsidioError);
    if (!newSubsidio) {
      return respondError(req, res, 400, "No se creo el subsidio");
    }

    respondSuccess(req, res, 201, newSubsidio);
  } catch (error) {
    handleError(error, "subsidio.controller -> createSubsidio");
    respondError(req, res, 500, "No se creo subsidio");
  }
}
/**
 * 
*/
async function getSubsidioscategory(req, res) {
  try {
    const [subsidios, errorSubsidios] = await subsidioService.getSubsidios(); 
    if (errorSubsidios) return respondError(req, res, 404, errorSubsidios); 
  
    subsidios.length === 0
    ? respondSuccess(req, res, 204)
    : respondSuccess(req, res, 200, subsidios);
} catch (error) {
    handleError(error, "subsidio.controller -> getSubsidioscategory");
    respondError(res, "Error al obtener los subsidios por categoria");
  }
}


module.exports = {
  getSubsidios,
  createSubsidio,
  getSubsidioscategory,
};
