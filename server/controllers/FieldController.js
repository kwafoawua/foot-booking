const Club = require('../models/Club');
const bookingService = require('../services/booking.service');

module.exports.updateFields = async function (req, res) {
    const clubId = req.params._id;
    const {modifiedFields, newFields, deletedFields} = req.body;
    let updatedField;
    let deleteResponse;
    try {
        if (deletedFields.length) {
            deleteResponse = await deleteFields(clubId, deletedFields);
            if (!!deleteResponse){
                // si soy una tetera no te voy a hacer un cafe
                return res.status(418).send(deleteResponse)
            }
        }
        if (modifiedFields.length) {
            updatedField = await updateFields(clubId, modifiedFields)
        }
        if (newFields.length) {
            updatedField = await addFields(clubId, newFields);
        }
        res.status(200).send(updatedField);
    } catch (e) {
        res.status(500).send('Ocurrió un error al intentar actualizar la información de las canchas');
    }
};

const updateFields = async (clubId, modifiedFields) => {

    return Promise.all(modifiedFields.map(async (field) => {
        return await Club.update(
          {'_id': clubId, 'fields._id': field._id},
          {'$set': { 'fields.$': field }},
        );
    }));
}

const addFields = async (clubId, newFields) => {
    return await Club.findByIdAndUpdate(clubId,
        {$addToSet: {fields: {$each: newFields}}},
        {new: true}
    );
}

const deleteFields = async (clubId, deletedFields) => {
    for (const fieldToDelete of deletedFields) {
        const fieldWithBooking = await bookingService.fieldHasExistenceBooking(fieldToDelete);
        if (!fieldWithBooking) {
            return await Club.findByIdAndUpdate(
                clubId,
                {$pull: {fields: {_id: fieldToDelete}}},
                {new: true}
            );
        } else {
            return `No es posible eliminar la cancha ${fieldWithBooking._doc.field.fieldName} ya que tiene reservas existentes.`;
        }
    }
}
