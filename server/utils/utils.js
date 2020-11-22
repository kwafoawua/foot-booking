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
};
