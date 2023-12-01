// Servicio para la tabla apelacion

const Apelacion = require("../models/Apelacion.model");
const motivorechazoModel = require("../models/motivorechazo.model");

// eslint-disable-next-line require-jsdoc
async function getApelaciones() {
    try {
        const apelaciones = await Apelacion.find();
        return [apelaciones, null];
    } catch (error) {
        return [null, error];
    }
}


// eslint-disable-next-line require-jsdoc
async function getApelacionById(id) {
    try {
        const apelacionById = await Apelacion.findById(id);
        return [apelacionById, null];
    } catch (error) {
        return [null, error];
    }
}

// eslint-disable-next-line require-jsdoc
async function getApelacionByPostulacion(id) {
    try {
        const apelacionByPostucion = await Apelacion.find({ postulacion: id });
        return [apelacionByPostucion, null];
    } catch (error) {
        return [null, error];
    }
}   


// eslint-disable-next-line require-jsdoc
async function deleteApelacion(id) {
    try {
        const apelacionById = await Apelacion.findByIdAndDelete(id);
        return [apelacionById, null];
    } catch (error) {
        return [null, error];
    }
}
// eslint-disable-next-line require-jsdoc
async function createApelacion(data) {
    try {
        const { postulacionrechazada, documentos, comentario } = data;
        const [motivo, motivoError] = await motivorechazoModel.findById(postulacionrechazada);
        if (motivoError) throw new Error(motivoError);
        if (!motivo) throw new Error("El motivo no existe");
        const apelacion = new apelacionModel({
            postulacionrechazada,
            documentos,
            comentario,
        });
        const apelacionSaved = await apelacion.save();
        return [apelacionSaved, null];
    } catch (error) {
        return [null, error];
    }
}

module.exports = {
    getApelaciones,
    getApelacionById,
    getApelacionByPostulacion,
    createApelacion,
    deleteApelacion,
};

