"use strict";

const Subsidio = require("../models/subsidio.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Obtiene todos los subsidios de la base de datos
 * @returns {Promise} Promesa con el objeto de los subsidios
 */
async function getSubsidios() {
  try {
    const subsidios = await Subsidio.find();
    if (!subsidios) return [null, "No hay subsidios"];

    return [subsidios, null];
  } catch (error) {
    handleError(error, "subsidio.service -> getSubsidios");
  }
}

/**
 * Crea un nuevo subsidio
 * @param {Object} subsidio - Objeto con los datos del subsidio a crear
 * @returns {Promise} Promesa que indica el éxito o el error en la creación
 */
async function createSubsidio(subsidio) {
  try {
    const { name, mont, category } = subsidio;
    const subsidioFound = await Subsidio.findOne({ name: name });
    if (subsidioFound) return [null, "El subsidio ya existe"];

    const newSubsidio = new Subsidio({
      name,
      mont,
      category,
    });

    const mySubsidio = await newSubsidio.save();
    return [newSubsidio, null];
  } catch (error) {
    handleError(error, "subsidio.service -> createSubsidio");
    return [null, "Error al crear el subsidio"];
  }
}
/**
*@param {Object} req - Objeto de petición
*@param {Object} res - Objeto de respuesta
*/
async function getSubsidioscategory(id) {

  try {
    const subsidios = await Subsidio.find({ category: id });
    if (!subsidios) return [null, "No hay subsidios"];
    console.log(subsidios)
    return [subsidios, null];
  } catch (error) {
    handleError(error, "subsidio.service -> getSubsidios");
  }
}

module.exports = {
  getSubsidios,
  createSubsidio,
  getSubsidioscategory,
};
