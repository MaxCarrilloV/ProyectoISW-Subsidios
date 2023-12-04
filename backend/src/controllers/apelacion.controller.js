// Controlador de Apelacion


const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const ApelacionService = require("../services/apelacion.service");
const subida = require("../config/Multer.config");
const Apelacion = require("../models/Apelacion.model");

/**
 * Crea una nueva apelación
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

// eslint-disable-next-line require-jsdoc
async function createApelacion(req, res) {
    try {
        // Utiliza el middleware de subida de Multer antes de procesar la apelación
        subida(req, res, async (error) => {
            if (error) {
                return respondError(req, res, 400, "Error al subir archivos");
            }

            const { postulacionrechazada, comentario } = req.body;

            const nuevaApelacion = new Apelacion({
                postulacionrechazada,
                documentos: req.files.map((file) => file.filename),
                comentario,
            });

            // Guarda la apelación en la base de datos
            await nuevaApelacion.save();

            // Envía una respuesta exitosa
            respondSuccess(req, res, 201, nuevaApelacion);
        });
    } catch (error) {
        handleError(error, "apelacion.controller -> createApelacion");
        console.log(error);
        respondError(req, res, 500, "No se creo la apelación");
    }
}


// eslint-disable-next-line require-jsdoc
async function getApelaciones(req, res) {
    try {
        const [apelaciones] = await ApelacionService.getApelaciones();

        apelaciones.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, apelaciones);
    } catch (error) {
        handleError(error, "apelacion.controller -> getApelaciones");
        respondError(req, res, 400, error.message);
    }
}


// eslint-disable-next-line require-jsdoc
async function getApelacionById(req, res) {
    try {
        const { params } = req;
        const { id } = params;
        const [apelacion, apelacionError] = await ApelacionService.getApelacionById(id);
        if (apelacionError) return respondError(req, res, 400, apelacionError);
        if (!apelacion) return respondError(req, res, 400, "La apelación no existe");
        respondSuccess(req, res, 200, apelacion);
    } catch (error) {
        handleError(error, "apelacion.controller -> getApelacionById");
        respondError(req, res, 500, "No se obtuvo la apelación");
    }
}

// eslint-disable-next-line require-jsdoc
async function deleteApelacion(req, res) {
    try {
        const { params } = req;
        const { id } = params;
        const [apelacion, apelacionError] = await ApelacionService.deleteApelacion(id);
        if (apelacionError) return respondError(req, res, 400, apelacionError);
        if (!apelacion) return respondError(req, res, 400, "La apelación no existe");
        respondSuccess(req, res, 200, apelacion);
    } catch (error) {
        handleError(error, "apelacion.controller -> deleteApelacion");
        respondError(req, res, 500, "No se obtuvo la apelación");
    }
}

// eslint-disable-next-line require-jsdoc
async function getApelacionByPostulacion(req, res) {
    try {
        const { params } = req;
        const { id } = params;
        const [apelacion, apelacionError] = await ApelacionService.getApelacionByPostulacion(id);
        if (apelacionError) return respondError(req, res, 400, apelacionError);
        if (!apelacion) return respondError(req, res, 400, "La apelación no existe");
        respondSuccess(req, res, 200, apelacion);
    } catch (error) {
        handleError(error, "apelacion.controller -> getApelacionByPostulacion");
        respondError(req, res, 500, "No se obtuvo la apelación");
    }
}

// eslint-disable-next-line max-len
module.exports = { createApelacion, getApelaciones, getApelacionById, deleteApelacion, getApelacionByPostulacion };


