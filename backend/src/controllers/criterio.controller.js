"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CriterioService = require("../services/criterio.service");
const { handleError } = require("../utils/errorHandler");

/**
 * Crea un nuevo criterio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createCriterio(req, res) {
  try {
    const { body } = req;

    const [newCriterio, criterioError] =
      await CriterioService.createCriterio(body.nombre);

    if (criterioError) return respondError(req, res, 400, criterioError);
    if (!newCriterio) {
      return respondError(req, res, 400, "No se creó el criterio");
    }

    respondSuccess(req, res, 201, newCriterio);
  } catch (error) {
    handleError(error, "criterio.controller -> createCriterio");
    respondError(req, res, 500, "No se creó el criterio");
  }
}

/**
 * Obtiene todos los criterios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getCriterios(req, res) {
  try {
    const [criterios, criteriosError] = await CriterioService.getCriterios();

    if (criteriosError) return respondError(req, res, 400, criteriosError);
    if (!criterios) {
      return respondError(req, res, 400, "No hay criterios");
    }

    respondSuccess(req, res, 200, criterios);
  } catch (error) {
    handleError(error, "criterio.controller -> getCriterios");
    respondError(req, res, 500, "No se obtuvieron los criterios");
  }
}

/**
 * Actualiza un criterio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateCriterio(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = criterioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = criterioSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [criterio, criterioError] = await CriterioService.updateCriterio(params.id, body);

    if (criterioError) return respondError(req, res, 400, criterioError);

    respondSuccess(req, res, 200, criterio);
  } catch (error) {
    handleError(error, "criterio.controller -> updateCriterio");
    respondError(req, res, 500, "No se pudo actualizar el criterio");
  }
}

/**
 * Elimina un criterio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteCriterio(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = criterioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const criterio = await CriterioService.deleteCriterio(params.id);
    !criterio
      ? respondError(
          req,
          res,
          404,
          "No se encontró el criterio solicitado",
          "Verifique el ID ingresado",
        )
      : respondSuccess(req, res, 200, criterio);
  } catch (error) {
    handleError(error, "criterio.controller -> deleteCriterio");
    respondError(req, res, 500, "No se pudo eliminar el criterio");
  }
}

module.exports = {
  createCriterio,
  getCriterios,
  updateCriterio,
  deleteCriterio,
};
