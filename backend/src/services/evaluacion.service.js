"use strict";
const Evaluacion = require("../models/evaluacion.model.js");
const Postulacion = require("../models/postulacion.model.js");
const User = require("../models/user.model.js");
const { handleError } = require("../utils/errorHandler");
const Role = require("../models/role.model");
const CRITERIOS = require("../models/criterio.model");
const nodemailer = require("nodemailer");


async function createEvaluacion(evaluacion) {
  try {
    const { postulacion, evaluador} = evaluacion;


    const postulacionExistente = await Postulacion.findById(postulacion);
    if (!postulacionExistente) return [null, 'La postulación no existe'];

    const evaluadorExistente = await User.findById(evaluador);
    if (!evaluadorExistente) return [null, 'El evaluador no existe'];


    const evaluacionExistente = await Evaluacion.findOne({ postulacion });
    if (evaluacionExistente) return [null, 'La postulación ya fue evaluada'];

    if (!(await isAdminCheck(evaluadorExistente))) {
      return [null, "El evaluador debe ser un usuario con rol 'admin'"];
    }
    const criterios = evaluacion.formularioEvaluacion.criterios
    const nombresCriterios = criterios.map(criterio => criterio.nombre);
    const criteriosExistente = await CRITERIOS.find({ _id: { $in: nombresCriterios } });

    if (criteriosExistente.length !== nombresCriterios.length) {
      // Al menos uno de los criterios proporcionados no existe
      const criteriosNoExistentes = nombresCriterios.filter(nombre => !criteriosExistente.some(c => c.nombre === nombre));
      return [null, `Los siguientes criterios no existen , o estan repetidos: ${criteriosNoExistentes.join(', ')}`];
    }
    const puntajeMaximo = criterios.reduce((total, criterio) => total + 10,0);
    console.log(puntajeMaximo);
    const puntajeMax = calcularPuntajeMaximo(evaluacion.formularioEvaluacion.criterios);
    const puntajeAprobacion = puntajeMaximo * 0.7;
    const decision = calcularDecision(puntajeMax, puntajeAprobacion);


    postulacionExistente.estado = decision;

    const nuevaEvaluacion = new Evaluacion({
      postulacion,
      evaluador,
      decision,
      formularioEvaluacion: {
        puntajeMax,
        observaciones: evaluacion.formularioEvaluacion.observaciones,
        puntajeAprobacion,
        criterios: evaluacion.formularioEvaluacion.criterios,
      },
    });

    await postulacionExistente.updateOne(postulacionExistente);
    await nuevaEvaluacion.save();

    return [nuevaEvaluacion, null];
  } catch (error) {
    handleError(error, 'evaluacion.service -> createEvaluacion');
  }
}

const calcularPuntajeMaximo = (criterios) => {
  const puntajeMax = criterios.reduce((total, criterio) => total + parseInt(criterio.puntuacion),0);
  console.log(puntajeMax);
  return puntajeMax;
};

const calcularDecision = (puntajeMax, puntajeAprobacion) => {
  return puntajeMax >= puntajeAprobacion ? 'Aprobada' : 'Rechazada';
};


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
    const evaluaciones = await Evaluacion.find()
    .populate({ path: "postulacion", populate: { path: "postulante" } })
    .populate("formularioEvaluacion.criterios.nombre")
    .exec();
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
    const evaluacionAnterior = await Evaluacion.findById(id);

    if (evaluacion.formularioEvaluacion.criterios) {
      const criteriosAnteriores = evaluacionAnterior.formularioEvaluacion.criterios;
      const criteriosNuevos = evaluacion.formularioEvaluacion.criterios;

      const nuevoPuntajeMax = criteriosNuevos.reduce((total, criterio) => total + parseInt(criterio.puntuacion), 0);

      evaluacionAnterior.formularioEvaluacion.puntajeMax = nuevoPuntajeMax;

      evaluacionAnterior.decision = nuevoPuntajeMax > evaluacionAnterior.formularioEvaluacion.puntajeAprobacion ? 'Aprobada' : 'Rechazada';

      evaluacionAnterior.formularioEvaluacion.criterios = criteriosNuevos;

      evaluacionAnterior.formularioEvaluacion.observaciones = evaluacion.formularioEvaluacion.observaciones;
    }

    await evaluacionAnterior.updateOne(evaluacionAnterior);

    return [evaluacionAnterior, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> updateEvaluacion");
    return [null, error];  // Devuelve también el error en caso de que ocurra.
  }
}



async function deleteEvaluacion(id) {
  try {
    const evaluacionFound = await Evaluacion.findById(id);
    const { postulacion } = evaluacionFound;
    const postulacionExistente = await Postulacion.findById(postulacion);
    postulacionExistente.estado = "Pendiente";
    await postulacionExistente.updateOne(postulacionExistente);
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