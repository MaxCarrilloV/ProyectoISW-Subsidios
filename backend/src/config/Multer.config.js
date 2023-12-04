const multer = require("multer");
const path = require("path");

const almacenamiento = multer.diskStorage({
    destination: path.join(__dirname, "../documentos/postulaciones"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const subida = multer({
    storage: almacenamiento,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen o PDF");
    },
}).array("documentos", 10);

module.exports = subida;
