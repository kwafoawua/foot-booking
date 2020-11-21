const { transporter } = require('../utils/utils');


module.exports.sendEmail = async (name, email, subject, text) => {
    const defaultText = `
    Hola ${name} Muchas gracias por registrarte en Footbooking. \n
    Disfrutá y participa de los mejores partidos en tu zona y unite a campeonatos para que tu equipo se destaque con excelentes premios.\n
    
    Saludos Footbooking.
    `;
    const defaultSubject = 'Te damos la bienvenida a Footbooking ✔';
    const mailOptions = {
        from: "FootBoking ✔ <no-reply@footbooking.com>", // sender addres
        to: email, // list of receivers
        subject: subject || defaultSubject, // Subject line
        text: text || defaultText,
    };

    try {
        let info = await transporter().sendMail(mailOptions);
        console.log('mail enviado');
    } catch (error) {
        throw error;
    }
};
