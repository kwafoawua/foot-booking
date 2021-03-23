const nodemailer = require('nodemailer');
let transportInstance;
let bucketInstance;
const {Storage} = require('@google-cloud/storage');


module.exports = {
  transporter: () => {
    if(transportInstance === undefined){
      transportInstance = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
    return transportInstance;
  },
  bucket: () => {
    if(bucketInstance === undefined) {
      storage = new Storage({
        projectId: 'footbookingtesis',
        keyFilename: 'footbookingtesis-88f2ab8bdcfd.json',
     });
     bucketInstance  = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
    }
    return bucketInstance;
  },
  getPagination: (page, size) => {
    const limit = size ? +size : 9;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  },
};
