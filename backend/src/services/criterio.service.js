const Criterio = require('../models/criterio.model');

async function createCriterio(nombre) {
  try {
    const criterioExistente = await Criterio.findOne({ nombre });
    if (criterioExistente) {
      return [null, 'El criterio ya existe'];
    }


    const nuevoCriterio = new Criterio({ nombre });
    await nuevoCriterio.save();

    return [nuevoCriterio, null];
  } catch (error) {

    console.error(error);
    return [null, 'Error al crear el criterio'];
  }
}

async function getCriterios() {
  try {
    const criterios = await Criterio.find();
    return [criterios, null];
  } catch (error) {

    console.error(error);
    return [null, 'Error al obtener los criterios'];
  }
}


async function updateCriterio(id, nuevoNombre) {
    try {

      const criterioExistente = await Criterio.findById(id);
      if (!criterioExistente) {
        return [null, 'El criterio no existe'];
      }
  
      criterioExistente.nombre = nuevoNombre;
      await criterioExistente.save();
  
      return [criterioExistente, null];
    } catch (error) {
   
      console.error(error);
      return [null, 'Error al actualizar el criterio'];
    }
  }
  
  async function deleteCriterio(id) {
    try {
      const criterioExistente = await Criterio.findById(id);
      if (!criterioExistente) {
        return [null, 'El criterio no existe'];
      }
      await Criterio.findByIdAndDelete(id);
  
      return [criterioExistente, null];
    } catch (error) {

      console.error(error);
      return [null, 'Error al eliminar el criterio'];
    }
  }
  

  
  module.exports = {
    createCriterio,
    getCriterios,
    updateCriterio,
    deleteCriterio,

  };
