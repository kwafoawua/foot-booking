const axios = require("axios");
let bookingController = require('./BookingController.js')
let clubController = require('./ClubController.js')

const mercadopago = require('mercadopago');
const _API_ID = '5031143008001395';
const _APP_TOKEN = 'TEST-5031143008001395-111516-733bdaea16cf2e392e5479898628d1f0-38445751';
const _NGROK_HTTPS_URL = 'https://81ea20d23a28.ngrok.io';
const oauthUrl = 'https://api.mercadopago.com/oauth/token';

mercadopago.configure({
    access_token: 'TEST-6530093699700144-102523-3292da805622a29d660ec29ce76bcb56-38445751'
});

exports.linkAccountUrlRedirection = async (req, res) => {
    // IF -> clubId undefined
    const _BASE_URL = `https://auth.mercadopago.com.ar/authorization?client_id=${_API_ID}`;
    const _BASE_PARAM = `&response_type=code&platform_id=mp&state=${req.params.id}`;
    const _REDIRECT_URI = `&redirect_uri=${_NGROK_HTTPS_URL}/mercadopago/webhook/linkAccount`;
    let authorizationURL = _BASE_URL.concat(_BASE_PARAM, _REDIRECT_URI);

    res.status(200).send({authorizationURL: authorizationURL});
}

exports.linkAccount = async  (req, res) => {
    const headers = {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
    }
    const data = {
        'client_secret': _APP_TOKEN,
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': _NGROK_HTTPS_URL.concat('/mercadopago/webhook/linkAccount')
    }
    let referenceId = req.query.state;

    try {
        const authorizationResponse = await axios.post(oauthUrl, data, {
            headers: headers
        });
        await clubController.linkClubToMercadoPagoAccount(authorizationResponse.data.access_token, referenceId);
        return res.redirect(`http://localhost:4200/admin/configuracion/${referenceId}?state=success`);
    } catch (e) {
        if (process.env.NODE_ENV === 'production') {
            console.log(`Ocurrió un error al vincular la cuenta de MP del club con id: ${referenceId}`);
            return res.redirect(`http://localhost:4200/admin/configuracion/${referenceId}?state=failure`);
        } else {
            // como los usuarios de prueba son limitados aseguramos en ambiente de desarrollo este circuito poniendole el pago de la aplicacion
            await clubController.linkClubToMercadoPagoAccount(_APP_TOKEN, referenceId);
            return res.redirect(`http://localhost:4200/admin/configuracion/${referenceId}?state=success`);
        }
    }
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
