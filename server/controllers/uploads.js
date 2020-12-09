/**
 * Created by USUARIO on 17/09/2017.
 */
const multer = require('multer');
const { bucket } = require('../utils/utils');

var storage = multer.diskStorage({
    // destino del fichero
    destination: function (req, file, cb) {
        cb(null, './uploads/');
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

const uploadToGCloud = async (file) => {
  // Uploads a local file to the bucket
  const image = await bucket().upload(file.path, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
    },
});
console.log(image);
const publicUrl = `https://storage.googleapis.com/${bucket().name}/${file.filename}`;

return publicUrl;
};

module.exports.upload = multer({ storage: storage });
module.exports.uploadToGCloud = uploadToGCloud;