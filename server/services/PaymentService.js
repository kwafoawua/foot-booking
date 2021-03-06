const axios = require("axios");

class PaymentService {
    constructor() {
        this.tokensMercadoPago = {
            prod: {},
            test: {
                access_token:
                    'TEST-6530093699700144-102523-3292da805622a29d660ec29ce76bcb56-38445751'
            }
        };
        this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
    }

    async createPaymentMercadoPago(name, price, unit) {
        const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
        // url a la que vamos a hacer los requests

        const items = [
            {
                id: "1234",
// id interno (del negocio) del item
                title: name,
// nombre que viene de la prop que recibe del controller
                description: "Dispositivo movil de Tienda e-commerce",
// descripción del producto
                category_id: "1234",
// categoría interna del producto (del negocio)
                quantity: parseInt(unit),
// cantidad, que tiene que ser un intiger
                currency_id: "ARS",
// id de la moneda, que tiene que ser en ISO 4217
                unit_price: parseFloat(price)
                // el precio, que por su complejidad tiene que ser tipo FLOAT
            }
        ];

        const preferences = {
// declaramos las preferencias de pago
            items,
// el array de objetos, items que declaramos más arriba
            external_reference: "referencia del negocio",
// referencia para identificar la preferencia, puede ser practicamente cualquier valor
            payer: {
// información del comprador, si estan en producción tienen que //traerlos del request
//(al igual que hicimos con el precio del item)
                name: "Lalo",
                surname: "Landa",
                email: "test_user_63274575@testuser.com",
                // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
                phone: {
                    area_code: "11",
                    number: "22223333"
                },
                address: {
                    zip_code: "1111",
                    street_name: "False",
                    street_number: "123"
                }
            },
            payment_methods: {
// declaramos el método de pago y sus restricciones
                excluded_payment_methods: [
// aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
                    {
                        id: "amex"
                    }
                ],
                excluded_payment_types: [{ id: "atm" }],
// aca podemos excluir TIPOS de pagos, es un array de objetos
                installments: 6,
// limite superior de cantidad de cuotas permitidas
                default_installments: 6
// la cantidad de cuotas que van a aparecer por defecto
            },
            back_urls: {
                success: "https://localhost:3000/success",
                pending: "https://localhost:3000.com/pending",
                failure: "https://localhost:3000.com/error"
            },
            notification_url: "https://mercadopago-checkout.herokuapp.com/webhook",
// declaramos nuestra url donde recibiremos las notificaciones
            auto_return: "approved"
// si la compra es exitosa automaticamente redirige a "success" de back_urls
        };

        try {
            const request = await axios.post(url, preferences, {
                // hacemos el POST a la url que declaramos arriba, con las preferencias
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return request.data;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = PaymentService;
