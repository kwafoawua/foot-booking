'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const Club = require('../models/Club');
const utils = require('../utils');
const ClubResponseAdapter = require('../adapters/ClubResponseAdapter');
const { sendEmail } = require('./mailing');
const { getPagination } = require('../utils/utils');

/**
 * Create a Club
 */
module.exports.registerClub = async function (req, res) {
    try {
        let galleryPath = [];
        let profilePath = req.files.profile[0].filename;
        for (let i = 0; i < req.files.gallery.length; i++) {
            galleryPath.push(req.files.gallery[i].filename);
        }
        const club = JSON.parse(req.body.body);
        for (let i = 0; i < club.fields.length; i++) {
            if (!club.fields[i]._id) {
                delete club.fields[i]._id;
            }
        }
        const registrationText =  `
        Hola ${club.name} Muchas gracias por registrarte en Footbooking. \n
        Disfrutá de la gestión de tus canchas, pudiendo llegar asi a más personas que puedan disfrutar de un buen partido de football.\n
        Ahora podras administrar las reservas que se hacen en cada una de tus canchas llevando un mejor control y así brindar información
        correcta a tus clientes. \n
        También está la posibilidad de gestionar campeonatos, generando aleatoriamente los primeros partidos y teniendo un fixture personalizado.\n
    
        Para cualquier ayuda o soporte, comunicate a footbooking.dev@gmail.com
        Saludos Footbooking.
        `;

        const savedClub = await addClub(club, profilePath, galleryPath);
        await sendEmail(club.name, club.user.email, null, registrationText);

        //const token = utils.generateToken(savedClub._id);
        res.status(200).send({user: {...savedClub._doc}, success: 'El club se creó exitosamente.'});
    } catch (error) {
        res.status(400).send({errorMessage: error.message});
    }
};

async function addClub(club, profilePath, galleryPath) {
    console.log('entra al club');
    const newClub = new Club({
        name: club.name,
        email: club.user.email,
        uid: club.uid,
        address: {
            lat: club.address.lat,
            lng: club.address.lng,
            address: club.address.address,
            shortAddress: club.address.shortAddress,
        },
        phoneNumber: club.phoneNumber,
        fields: club.fields || null,
        services: club.services,
        socialMedia: club.socialMedia || null,
        profileImg: profilePath,
        galleryImg: galleryPath,
        description: club.description
    });
    return await newClub.save();
}

/**
 * Show the current Club
 */
module.exports.findById = async function (req, res) {
    try {
        const club = await Club.findById(req.params._id).exec();
        const clubResponse = await ClubResponseAdapter.adaptClubResponse(club);
        res.status(200).send(clubResponse);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
};


/**
 * Show all Clubs
 */
module.exports.findAllClubs = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    try {
        const clubs = await Club.paginate({}, { offset, limit, sort: {_id: -1} });
        res.status(200).send({
            totalItems: clubs.totalDocs,
            clubs: clubs.docs,
            totalPages: clubs.totalPages,
            currentPage: clubs.page - 1,
        });
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

/**
 * Update a Club
 */
module.exports.updateClub = function (req, res) {
    var body = JSON.parse(req.body.body);
    var galleryPath = [];
    var profilePath = '';
    if (Object.keys(req.files).length !== 0) {
        if (req.files.profile[0].filename) {
            profilePath = req.files.profile[0].filename;
        }
        if (req.files.gallery) {
            for (var i = 0; i < req.files.gallery.length; i++) {
                galleryPath.push(req.files.gallery[i].filename);
            }
        }
    }
    Club.findById(body._id, function (err, club) {
        // Handle any possible database errors
        if (err) {
            return res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            club.name = body.name || club.name;
            club.description = body.description || club.description;
            club.address = body.address || club.address;
            club.phoneNumber = body.phoneNumber || club.phoneNumber;
            //club.fields = req.body.fields || club.fields;
            club.services = body.services || club.services;
            club.socialMedia = body.socialMedia || club.socialMedia;
            club.profileImg = (profilePath !== '') ? profilePath : club.profileImg;
            club.galleryImg = (galleryPath.length > 0) ? galleryPath : club.galleryImg;

            // Save the updated document back to the database
            club.save(function (err, club) {
                if (err) {
                    return res.status(500).send(err);
                }
                console.log('Se guardaron los datos del club correctamente');
                res.status(200).json(club);
            });
        }
    });
};

/**
 * Delete an Club
 */
module.exports.deleteClub = function (req, res) {
    Club.findById(req.params.id, function (err, club) {
        if (err) {
            return res.status(500).send(err);
        }

        club.remove(function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            console.log('Club successfully deleted!');
            res.json('Club eliminado');
        });
    });
};

/**
 * Obtener los primeros 10 clubs destacados
 */
module.exports.getDestacados = async (req, res) => {
    try {
        const clubsDestacados = await Club.find({}, null, {limit: 10}).sort({ _id: -1 }).exec();
        const clubResponse = await ClubResponseAdapter.adaptClubs(clubsDestacados);
        return res.status(200).send(clubResponse);
    } catch (error) {
        return res.status(400).send({errorMessage: 'Hubo un problema al obtener los datos'});
    }
};


/**
 *   Método que busca solo por nombre, se llama desde el home o cuando la busqueda viene sin filtros
 */
module.exports.findClubsByFilter = function (req, res) {

    Club.find({
        name: new RegExp(JSON.parse(req.params.clubfilter).clubname, "i"),
    }, async function (err, club) {
        if (err) {
            return res.status(500).send(err + "al menos entro");
        }
        const clubResponse = await ClubResponseAdapter.adaptClubResponse(club);
        res.status(200).send(clubResponse);
    });

};

/*
*   Método que busca solo por nombre o sin nombre y filtro, se llama desde la busqueda en la pagina de /result
*   cuando la busqueda viene con filtros desde el boton 'actualizar busqueda'. Se que es una negrada todos los if else que hay,
*   solucionar eso cuando se pueda
*/
module.exports.findClubsByMultipleFilter = async (req, res) => {

    // Se arma solo el array de servicios para utilizar el $in y setean los valores por defecto
    var servicesNameArray = [];
    var cantPlayers = [];
    var fieldTypes = [];
    // @priceMax tiene que ser un número muy grande para que por defecto traiga clubes con precio menor al precio maximo
    // es decir, si no se ingresa esta campo deberia traer todos
    var priceMax = 99999;
    var priceMin = 0;
    const clubFilter = JSON.parse(req.params.clubfilter);
    const {page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
    /*
    *   Se realizan validaciones para ver si toman un valor por defecto o el propio de la consulta en el
    *   caso de que venga un valor
    */
    if (clubFilter.cantPlayers === undefined) {
        cantPlayers.push(5, 7, 11);
    } else {
        cantPlayers.push(clubFilter.cantPlayers);
    }
    if (clubFilter.fieldType === undefined) {
        fieldTypes.push('Cesped', 'Sintético', 'Tierra');
    } else {
        fieldTypes.push(clubFilter.fieldType);
    }
    if (clubFilter.maxPrice) {
        priceMax = clubFilter.maxPrice;
    }
    if (clubFilter.minPrice) {
        priceMin = clubFilter.minPrice;
    }
    let querySearch = [
        {"name": new RegExp(clubFilter.clubname, "i")},
        {"fields.cantPlayers": {"$in": cantPlayers}},
        {"fields.fieldType": {"$in": fieldTypes}},
        {"fields.price": {"$gte": priceMin, "$lte": priceMax}},
    ];

    if(clubFilter.hasTournament) {
        querySearch.push({ "tournaments": { $exists: true, $not: {$size: 0} } })
    }

    if (clubFilter.services && clubFilter.services.length) {
        for (var i = clubFilter.services.length - 1; i >= 0; i--) {
            servicesNameArray[i] = clubFilter.services[i].name;
        }
        querySearch.push({"services.value": {"$all": servicesNameArray}});
    }

        try{
            const clubs = await Club.paginate({ $and: querySearch}, { offset, limit, sort: {_id: -1} });
            const adaptedClubs = await ClubResponseAdapter.adaptClubs(clubs.docs);
            res.status(200).send({
                totalItems: clubs.totalDocs,
                clubs: adaptedClubs,
                totalPages: clubs.totalPages,
                currentPage: clubs.page - 1,
            });
        } catch(err) {
            return res.status(500).send(err);
        }

};

exports.getFieldsCapacities = async (req, res) => {
    const {_id} = req.params;
    const availableCapacities = [ '5 Jugadores', '7 Jugadores', '11 Jugadores'];
    try {
        const clubCapacities = await Club.findById(_id).distinct('fields.cantPlayers');
        const capacities = clubCapacities.map(c => {
            switch (c) {
                case 5:
                    return availableCapacities[0];
                case 7:
                    return availableCapacities[1];
                case 11:
                    return availableCapacities[2];
                default:
                    console.error(`Se ha encontrado en las canchas una cantidad de jugadors no esperada. Cantidad: ${c}`);
                    return c.concat(' Jugadores');
            }
        })
        res.status(200).send({capacities})
    } catch (e) {
        console.error(`Ocurrió un error al intentar recuperar las capacidades de canchas del club ${_id}`, e)
        return res.status(500).send('Ocurrió un error al intentar recuperar las capacidades de canchas del club');
    }
}

exports.linkClubToMercadoPagoAccount = async (accessToken, referenceId) => {
    await Club.findOneAndUpdate(
        {_id: referenceId},
        {$set:{access_token: accessToken}}
        );
}

exports.getMercadoPagoToken = async clubId => {
    const club = await Club.findById(clubId);
    return club.access_token;
}

exports.hasMercadoPagoToken = async (req, res) => {
    await Club.find(
        {
            _id: req.params.id,
            access_token: {$exists: true, $ne: null}
        },
        (err, docs) => {
            if (err) {
                return res.status(500).send(err);
            }
            const existAny = docs.length > 0
            res.status(200).send({isAlreadyLinked: existAny});
        }
    );
}
