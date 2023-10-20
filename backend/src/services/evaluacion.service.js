"use strict";
const Evaluacion = require("../models/evaluacion.model.js");
const Postulacion = require("../models/postulacion.model.js");
const User = require("../models/user.model.js");
const { handleError } = require("../utils/errorHandler");
const Role = require("../models/role.model");
const nodemailer = require("nodemailer");


async function createEvaluacion(evaluacion) {
  try {
    const { postulacion, evaluador, decision, observaciones } = evaluacion;
    
    // Verificar si la postulación existe antes de crear la evaluación
    const postulacionExistente = await Postulacion.findById(postulacion);
    if (!postulacionExistente) return [null, "La postulación no existe"];

    const evaluadorExistente = await User.findById(evaluador);
    if (!evaluadorExistente) return [null, "El evaluador no existe"];
    
    if (!await isAdminCheck(evaluadorExistente)) {
      return [null, "El evaluador debe ser un usuario con rol 'admin'"];
    }
     
    const nuevaEvaluacion = new Evaluacion({
      postulacion,
      evaluador,
      decision,
      observaciones,
    });

    await nuevaEvaluacion.save();
    


    return [nuevaEvaluacion, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> createEvaluacion");
  }
}

async function isAdminCheck(evaluadorId) {
  try {
    const evaluador = await User.findById(evaluadorId);
    const roles = await Role.find({ _id: { $in: evaluador.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return true; // El evaluador es administrador
      }
    }
    return false; // El evaluador no es administrador
  } catch (error) {
    handleError(error, "evaluacion.service -> isAdminCheck");
  }
}

async function getEvaluaciones() {
  try {
    const evaluaciones = await Evaluacion.find().exec();
    if (!evaluaciones) return [null, "No hay evaluaciones"];

    return [evaluaciones, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> getEvaluaciones");
  }
}

async function getEvaluacionById(id) {
  try {
    const evaluacion = await Evaluacion.findById(id).exec();
    if (!evaluacion) return [null, "La evaluación no existe"];

    return [evaluacion, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> getEvaluacionById");
  }
}

async function updateEvaluacion(id, evaluacion) {
  try {
    const evaluacionFound = await Evaluacion.findById(id);
    if (!evaluacionFound) return [null, "La evaluación no existe"];

    const { postulacion, evaluador, decision, observaciones } = evaluacion;

    // Aquí puedes agregar validaciones y lógica adicional según tus requisitos

    const evaluacionUpdated = await Evaluacion.findByIdAndUpdate(
      id,
      {
        postulacion,
        evaluador,
        decision,
        observaciones,
      },
      { new: true },
    );

    return [evaluacionUpdated, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> updateEvaluacion");
  }
}

async function deleteEvaluacion(id) {
  try {
    return await Evaluacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "evaluacion.service -> deleteEvaluacion");
  }
}

module.exports = {
  createEvaluacion,
  getEvaluaciones,
  getEvaluacionById,
  updateEvaluacion,
  deleteEvaluacion,
};