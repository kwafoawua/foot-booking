/**
 * Created by USUARIO on 17/09/2017.
 */
var multer = require('multer');

var storage = multer.diskStorage({
    // destino del fichero
    destination: function (req, file, cb) {
        cb(null, '../client/uploads/')
    },
    // renombrar fichero
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '-' + getExtension(file));
    }
});
function getExtension(file) {
    // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
    var res = '';
    if (file.mimetype === 'image/jpeg') res = '.jpg';
    if (file.mimetype === 'image/png') res = '.png';
    return res;
}

module.exports.upload = multer({ storage: storage });