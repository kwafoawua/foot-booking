const nodemailer = require('nodemailer');
let transportInstance;
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
  getPagination: (page, size) => {
    const limit = size ? +size : 9;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  },
};
