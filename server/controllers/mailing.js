var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "footbooking.dev@gmail.com",
        pass: "Footbooking01"
    }
});//no esta bueno tener la pass aca, buscar otro tipo de autorizacion


module.exports.sendRegistrationMail = function(username, userEmail) {
    var mailOptions = {
        from: "FootBoking ✔ <no-reply@footbooking.com>", // sender address
        to: userEmail, // list of receivers
        subject: "Bienvenido a Footbooking ✔", // Subject line
        text: "Bienvenido a Footbooking "+username // plaintext body
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}
