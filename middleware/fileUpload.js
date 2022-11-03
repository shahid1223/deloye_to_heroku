const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

var uploads = multer({
    storage: storage,
    limit: {
        fileSize: 1000000 * 100
    }
}).single('myfile');

module.exports = uploads;