'use strict';
var mongoose = require('mongoose');
var Club = require('../models/Club');
var Q = require('q');

/**
 * Update Club Fields
 * @param req
 * @param res
 */
module.exports.updateFields = async function (req, res) {
    const clubId = req.params._id;
    const {modifiedFields, newFields, deletedFields} = req.body;
    let updatedField;
    try {
        if (modifiedFields.length) {
            updatedField = await updateFields(clubId, modifiedFields)
        }
        if (newFields.length) {
            updatedField = await addFields(clubId, newFields);
        }
        if (deletedFields.length) {
            updatedField = await deleteFields(clubId, deletedFields);
        }
    } catch (e) {
        res.status(500).send('Ocurrió un error al intentar actualizar la información de las canchas');
    }
    res.status(200).send(updatedField);

};

const updateFields = async (clubId, modifiedFields) => {
    return await Club.findByIdAndUpdate(clubId,
        {fields: modifiedFields},
        {new: true}
    );
}

const addFields = async (clubId, newFields) => {
    return await Club.findByIdAndUpdate(clubId,
        {$addToSet: {fields: {$each: newFields}}},
        {new: true}
    );
}

const deleteFields = async(clubId, deletedFields) => {
    let updateField;
    for (const fieldToDelete of deletedFields) {
        updateField = await Club.findByIdAndUpdate(
            clubId,
            {$pull: {fields: {_id: fieldToDelete}}},
            {new: true}
        );
    }
    return updateField;
}
