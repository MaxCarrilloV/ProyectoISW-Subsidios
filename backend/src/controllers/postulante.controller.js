"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const PostulanteService = require("../services/postulante.service");
const { postulanteBodySchema, postulanteIdSchema } = require("../schema/postulante.schema");
const Postulante = require("../models/postulante.model");

async function getPostulantes(req, res) {
    try {
        const [postulantes, errorPostulantes] = await PostulanteService.getPostulantes();
        if (errorPostulantes) return respondError(req, res, 404, errorPostulantes);
    
        postulantes.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, postulantes);
    } catch (error) {
        handleError(error, "postulante.controller -> getPostulantes");
        respondError(req, res, 400, error.message);
    }
}

async function createPostulante(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = postulanteBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [postulante, postulanteError] = await PostulanteService.createPostulante(body);

        if (postulanteError) return respondError(req, res, 400, postulanteError);
        if (!postulante) {
            return respondError(req, res, 400, "No se creó el Postulante");
        }

        respondSuccess(req, res, 201, postulante);
    } catch (error) {
        handleError(error, "postulante.controller -> createPostulante");
        respondError(req, res, 500, "No se creo el Postulante");
    }
}
async function getPostulanteById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = postulanteIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [postulante, errorPostulante] = await PostulanteService.getPostulanteById(params.id);
        if (errorPostulante) return respondError(req, res, 404, errorPostulante);

        respondSuccess(req, res, 200, postulante);
    } catch (error) {
        handleError(error, "postulante.controller -> getPostulanteById");
        respondError(req, res, 400, error.message);
    }
}

async function updatePostulante(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = postulanteIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = postulanteBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [postulante, errorPostulante] = await PostulanteService.updatePostulante(params.id, body);
        if (errorPostulante) return respondError(req, res, 404, errorPostulante);

        respondSuccess(req, res, 200, postulante);
    } catch (error) {
        handleError(error, "postulante.controller -> updatePostulante");
        respondError(req, res, 400, error.message);
    }
}

async function deletePostulante(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = postulanteIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const postulante = await PostulanteService.deletePostulante(params.id);
        !postulante 
        ? respondError(req, res, 404, "Postulante no encontrado"):
          respondSuccess(req, res, 200, postulante);
    } catch (error) {
        handleError(error, "postulante.controller -> deletePostulante");
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    getPostulantes,
    createPostulante,
    getPostulanteById,
    updatePostulante,
    deletePostulante,
};