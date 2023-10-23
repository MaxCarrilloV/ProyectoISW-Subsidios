//Servicio para la tabla apelacion

const apelacionModel = require("../models/Apelacion.model");
const motivorechazoModel = require("../models/motivorechazo.model");
const subida = require("../config/Multer.config");

async function getApelaciones() {
  try {
    const apelaciones = await apelacionModel.find();
    return apelaciones;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getApelacionById(id) {
    try {
        const apelacionById = await apelacionModel.findById(id);
        return apelacionById;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

async function getApelacionByPostulacion(id) {
    try {
        const apelacionByPostucion = await apelacionModel.find({postulacion: id});
        return apelacionByPostucion;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}   

async function createApelacion(apelacionData, req, res) {
    try {
        // Utiliza el middleware de subida de Multer antes de procesar la apelación
        subida(req, res, async (error) => {
            if (error) {
                return [null, "Error al subir archivos"];
            }
            const { postulacionrechazada, comentario } = apelacionData;
            const postulacionExistente = await motivorechazoModel.findById(postulacion);
            if (!postulacionExistente) return [null, "La postulación no existe"];
            const nuevaApelacion = new apelacionModel({
                postulacionrechazada,
                documentos: req.files,
                comentario,
            });
            await nuevaApelacion.save();
            return [nuevaApelacion, null];
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    getApelaciones,
    getApelacionById,
    getApelacionByPostulacion,
    createApelacion,
};

