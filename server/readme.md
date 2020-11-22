# Footbooking backend

## Levantando el server
Primero que nada asegurarse de que todas las dependencias esten instaladas. Pararse en la raiz del server _/foo-booking/server

```npm install```

Luego ejecutar el script hotreload

```npm run hotreload```

## Configurar Mercado de Pago para el proyecto
Mercado Pago require rutas https para la comunicacion. Descargarse [ngrok](https://ngrok.com/) y ejecutar el siguiente comando con el numero en el que levanta nuestra backend:

```ngrok.exe http 4000```

Copiar la ruta **https** brindada por ngrok y copiarla como la base url de la constante `notification_url` en MercadoPagoController.js

A su vez debeá agregarse la misma url en la configuración del marketplace de Mercado de Pago. (Crear nueva aplicacion > Editar FB Integracion)
