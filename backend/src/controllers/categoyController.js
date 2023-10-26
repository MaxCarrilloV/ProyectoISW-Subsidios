git"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const CategoryService = require("../services/category.service");
const { handleError } = require("../utils/errorHandler");

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createCategory(req, res) {
  try {
    const { body } = req;

    const [newCategory, categoryError] =
      await CategoryService.createCategory(body);

    if (categoryError) return respondError(req, res, 400, categoryError);
    if (!newCategory) {
      return respondError(req, res, 400, "No se creo category");
    }

    respondSuccess(req, res, 201, newCategory);
  } catch (error) {
    handleError(error, "category.controller -> createCategory");
    respondError(req, res, 500, "No se creo category");
  }
}
/**
//obtener categorias
*/
async function getCategory(req, res) {
  try {
    const categories = await CategoryService.getCategory();
    console.log(categories);
    //console.log(categoriesError);
    //if (categoriesError) return respondError(req, res, 400, categoriesError);
    if (!categories) return respondError(req, res, 400, "No hay categories");
    respondSuccess(req, res, 200, categories);
  } catch (error) {
    handleError(error, "categoria.controller -> getCategories");
    respondError(req, res, 500, "No se obtuvieron las categories");
  }
}


module.exports = {
  createCategory,
  getCategory,
};
