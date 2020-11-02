const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-1195475678227993-102923-ea2420ed86ee23913c17d7f3a019c07c-665598763'
});

exports.generatePreference = async (req, res) => {
    const items = [
        {
            title: req.body.title + req.body.description,
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
            // pending: req.body.pendingURL,
            failure: req.body.failureURL,
        },
        // notification_url: "https://mercadopago-checkout.herokuapp.com/webhook",
        auto_return: "approved"
    }
    try {
        let mpResponse = await mercadopago.preferences.create(preference);
        await res.status(200).send(mpResponse);
    } catch (error) {
        res.status(500).send("No se pudo impactar la API de mercado de pago");
    }
}
