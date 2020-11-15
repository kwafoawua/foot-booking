let bookingController = require('./BookingController.js')

const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-1195475678227993-102923-ea2420ed86ee23913c17d7f3a019c07c-665598763'
});

exports.linkAccount = async (req, res) => {
    let mpRes = req.query.code
    console.log(`lo que trae la vinculacion: ${JSON.stringify(mpRes)}`)
    return res.redirect('www.google.com');
}

exports.callback = async (req, res) => {
    console.log(`al menos alhgo loggeo`);
    console.log(`entre con este req: ${JSON.stringify(req)}`)
}
exports.generatePreference = async (req, res) => {
    const items = [
        {
            title: `${req.body.title} - ${req.body.description}`,
            description: req.body.description,
            unit_price: req.body.unitPrice,
            currency_id: "ARS",
            quantity: 1,
        }
    ]
    const preference = {
        items,
        back_urls: {
            success: req.body.successURL,
            failure: req.body.failureURL,
        },
        external_reference: `${Date.now()}-${req.body.title}`,
        notification_url: "https://3616fbc965db.ngrok.io/webhook?source_news=webhooks",
        auto_return: "approved"
    }
    try {
        let mpResponse = await mercadopago.preferences.create(preference);
        await res.status(200).send(mpResponse);
    } catch (error) {
        res.status(500).send("No se pudo impactar la API de mercado de pago");
    }
}

exports.getPaymentStatusById = async (paymentId) => {
    let mpRes = await mercadopago.payment.get(paymentId);
    try {
        await bookingController.updateBookingByExternalReference(mpRes.body.external_reference,
            paymentIsApproved(mpRes.body.status, mpRes.body.status_detail));
    } catch (error) {
        console.log(`Ocurrió un error al actualizar el pago del booking con id de transaccion de Mercado de Pago: ${paymentId}`)
    }
}

const _APPROVED = 'approved'
const _ACCREDITED = 'accredited'
let paymentIsApproved = (status, detail) => status === _APPROVED && detail === _ACCREDITED;
