const Postulante = require('../models/postulante.model');
const usuario = require('../models/user.model');
const Role = require("../models/role.model");
async function getPostulantes() {
    try {
        const postulantes = await Postulante.find();
        return [postulantes, null];
    } catch (error) {
        return [null, error];
    }
}

async function createPostulante(postulanteData) {
    try {
        const { user , nombre , fechaNacimiento} = postulanteData;
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        if (edad < 18 || edad >= 90) {
            return [null, "La edad del usuario no se le permite postular"];;
          }

       
        const userExistente = await usuario.findById(user);
        if (!userExistente) {
            return [null, "El usuario no existe"];
        }
        
        if (/\d/.test(nombre)) {
            return [null, "El nombre no puede contener números"];
        }
        
        const fechaNacimientoError = validateFechaNacimiento(fechaNacimiento);
        
        if (fechaNacimientoError) {
            return [null, fechaNacimientoError];
        }
        
        if (!(await isPostulanteCheck(userExistente))) {
            return [null, "El usuario debe ser un usuario con rol 'user'"];
        }
        const newPostulante = new Postulante(postulanteData);
        await newPostulante.save();
        return [newPostulante, null];
    } catch (error) {
        throw new Error(error);
    }
}

function validateFechaNacimiento(fechaNacimiento) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const añoActual = new Date().getFullYear();

    if (
        fechaNacimientoDate.getFullYear() < 1950 ||
        fechaNacimientoDate.getFullYear() > añoActual
    ) {
        return "El año de nacimiento debe estar entre 1950 y el año actual";
    }

    if (fechaNacimientoDate.getMonth() < 0 || fechaNacimientoDate.getMonth() > 11) {
        return "El mes de nacimiento debe estar entre 1 y 12";
    }

    const diasValidos = new Date(
        fechaNacimientoDate.getFullYear(),
        fechaNacimientoDate.getMonth() + 1,
        0
    ).getDate();

    if (fechaNacimientoDate.getDate() < 1 || fechaNacimientoDate.getDate() > diasValidos) {
        return `El día de nacimiento debe estar entre 1 y ${diasValidos}`;
    }

    return null; 
}


async function isPostulanteCheck(postulanteId) {
    try {
      const roles = await Role.find({ _id: { $in: postulanteId.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          return true; 
        }
      }
      return false; 
    } catch (error) {
      handleError(error, "postulante.service -> isPostulanteCheck");
    }
}
async function getPostulanteById(postulanteId) {
    try {
        const postulante = await Postulante.findById(postulanteId);
        return [postulante, null];
    } catch (error) {
        return [null, error];
    }
}

async function updatePostulante(postulanteId, postulanteData) {
    try {
        const postulanteFound = await Postulante.findById(postulanteId);
        if (!postulanteFound) {
            return [null, "El postulante no existe"];
        }

        const {fechaNacimiento} = postulanteFound

        const fechaNacimientoDate = new Date(fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        if (edad < 18 || edad >= 90) {
            return [null, "La edad del usuario no se le permite postular"];;
          }
        const postulante = await Postulante.findByIdAndUpdate(postulanteId, postulanteData, { new: true });
        return [postulante, null];
    } catch (error) {
        return [null, error];
    }
}

async function deletePostulante(postulanteId) {
    try {
        return await Postulante.findByIdAndDelete(postulanteId);
    } catch (error) {
        return [null, error];
    }
}
module.exports = {
    getPostulantes,
    createPostulante,
    getPostulanteById,
    updatePostulante,
    deletePostulante,
};