//Configurar multer para subir archivos

const multer = require("multer");

const almacenamiento = multer.diskStorage({
    destination: path.join(__dirname, "../public/uploads"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const subida = multer({
    storage: almacenamiento,
    dest: path.join(__dirname, "../public/uploads"),
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen valida");
    },
}).array("documentos", 10);

module.exports = subida;