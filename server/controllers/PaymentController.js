let mpFunctions = require('./MercadoPagoController.js')

class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    async getMercadoPagoLink(req, res) {
        const { name, price, unit } = req.body;
        try {
            const checkout = await this.paymentService.createPaymentMercadoPago(
                name,
                price,
                unit
            );

            return res.redirect(checkout.init_point);

        } catch (err) {

            return res.status(500).json({
                error: true,
                msg: "Hubo un error con Mercado Pago"
            });
        }
    }

    webhook(req, res) {
        console.log(`la body: ${JSON.stringify(req.body)}`)
        console.log(`la id de la tx: ${req.body.data.id}`)
        if (req.method === "POST") {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
                console.log(`le body: ${body}`)
            });
            req.on("end", () => {
                console.log(body, "webhook response");
                res.end("ok");
            });
        }
        mpFunctions.getPaymentStatusById(req.body.data.id);
        return res.status(200);
    }
}

module.exports = PaymentController;
