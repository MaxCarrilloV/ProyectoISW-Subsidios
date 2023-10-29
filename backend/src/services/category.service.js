"use strict";

const Category = require("../models/Category");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Crea un nuevo category
 * @param {Object} category - Objeto con los datos del category a crear
 * @returns {Promise} Promesa que indica el éxito o el error en la creación
 */
async function createCategory(category) {
  try {
    const { name } = category;

    const categoryFound = await Category.findOne({ name: category.name });
    if (categoryFound) return [null, "La categoria ya existe"];

    const newCategory = new Category({
      name,
    });
    await newCategory.save();

    return [newCategory, null];
  } catch (error) {
    handleError(error, "category.service -> createCategory");
  }
}
/**
 *
 */
async function getCategory() {
  try {
    const categories = await Category.find();
    console.log(categories);
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  createCategory,
  getCategory,
};
