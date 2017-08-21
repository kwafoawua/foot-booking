var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Field Schema
 * @param {string} nombre - Nombre del complejo.
 * @param {string} domicilio - Array de domicilios del Complejo.
 * @param {string} telefono - Telefono del complejo.
 * @param {string} canchas - Array de Canchas del complejo.
 * @param {string} servicios - Serivicios que ofrece el Complejo.
 * @param {string} usuario - Usuario al cual pertenece el complejo.
 */

var fieldSchema = new Schema({
    description: String,
    cantPlayers: { type: Number, required: true },
    services: [{
        name: { type: String, required: true },
        description: String
    }],

});

module.exports = mongoose.model('Field', fieldSchema);
