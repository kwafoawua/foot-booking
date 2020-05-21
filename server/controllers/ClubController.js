'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const Club = require('../models/Club');
const utils = require('../utils');

var mailingController = require('./mailing');

/**
 * Create a Club
 */
module.exports.registerClub = async function (req,res) {
    try {
        let galleryPath = [];
        let profilePath = req.files.profile[0].filename;
        for(let i = 0; i < req.files.gallery.length; i++) {
            galleryPath.push(req.files.gallery[i].filename);
        }
        const club = JSON.parse(req.body.body);
        const savedClub = addClub(club,profilePath, galleryPath);
        const token = utils.generateToken(savedClub._id);
        res.status(200).send({ user: {...savedClub._doc, token }, success: 'El club se creó exitosamente.'});
    } catch(error) {
        res.status(400).send({ errorMessage: error.message });
    }
};
async function addClub (club, profilePath, galleryPath) {
    console.log('entra al club');
    const newClub = new Club({
        name: club.name,
        email: club.user.email,
        uid: club.uid,
        address: {
            lat: club.address.lat,
            lng: club.address.lng,
            address: club.address.address
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

module.exports.findById = async function(req, res) {
    try {
        const club = await Club.findById(req.params._id).exec();
        res.status(200).send(club);
    } catch(error) {
        res.status(400).send({error: error.message})
    }
};


/**
 * Show all Clubs
 */


module.exports.findAllClubs = function(req, res) {

    Club.find(function(err, clubs) {
            if (err) {
               return res.status(500).send(err);
            }
        console.log('GET /holo');
        res.status(200).send(clubs);
    });
};

/**
 * Update a Club
 */
module.exports.updateClub = function(req, res) {
    //console.log(req.body);
    var body = JSON.parse(req.body.body);
    var galleryPath = [];
    var profilePath = '';
    if(Object.keys(req.files).length !== 0) {
        if(req.files.profile[0].filename) {
            profilePath = req.files.profile[0].filename;
        }
        if(req.files.gallery){
            for(var i = 0; i < req.files.gallery.length; i++) {
                galleryPath.push(req.files.gallery[i].filename);
            }
        }
    }
   // Club.findByIdAndUpdate();
    Club.findById(body._id, function(err, club) {
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
            club.save(function(err, club) {
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
module.exports.deleteClub = function(req, res) {
    Club.findById(req.params.id, function(err, club) {
        if (err) {
           return res.status(500).send(err);
        }

        club.remove(function(err) {
            if (err) {return res.status(500).send(err);}

            console.log('Club successfully deleted!');
            res.json('Club eliminado');
        });
    });
};

/*
*   Método que busca solo por nombre, se llama desde el home o cuando la busqueda viene sin filtros
*/
module.exports.findClubsByFilter = function (req,res) {

    Club.find({name : new RegExp(JSON.parse(req.params.clubfilter).clubname, "i"),
                   //  services : new RegExp(JSON.parse(req.params.services).services, "i")
            }, function (err, club) {
                if (err) {
                    return res.status(500).send(err + "al menos entro");
                }
                res.status(200).send(club);
            });

};

/*
*   Método que busca solo por nombre o sin nombre y filtro, se llama desde la busqueda en la pagina de /result
*   cuando la busqueda viene con filtros desde el boton 'actualizar busqueda'. Se que es una negrada todos los if else que hay,
*   solucionar eso cuando se pueda
*/
module.exports.findClubsByMultipleFilter = function (req,res) {

    // Se arma solo el array de servicios para utilizar el $in y setean los valores por defecto
    var servicesNameArray = [];
    var cantPlayers = [];
    // @priceMax tiene que ser un número muy grande para que por defecto traiga clubes con precio menor al precio maximo
    // es decir, si no se ingresa esta campo deberia traer todos
    var priceMax = 99999;
    var priceMin = 0;

    /*
    *   Se realizan validaciones para ver si toman un valor por defecto o el propio de la consulta en el
    *   caso de que venga un valor
    */
    if (JSON.parse(req.params.clubfilter).cantPlayers == undefined) {
        cantPlayers.push(5,7,11);
    } else {
        cantPlayers.push(JSON.parse(req.params.clubfilter).cantPlayers);
    }
    if (JSON.parse(req.params.clubfilter).maxPrice != null) {
        priceMax = JSON.parse(req.params.clubfilter).maxPrice;
    }
    if (JSON.parse(req.params.clubfilter).minPrice != null) {
        priceMin = JSON.parse(req.params.clubfilter).minPrice;
    }


    // dentro de este if estan las 2 posibles consultas
    if (JSON.parse(req.params.clubfilter).services.length==0) {
        // como no se selecciono un tipo de servicio traigo por todos los servicios
        Club.find({ $and:
            [
                {"name" : new RegExp(JSON.parse(req.params.clubfilter).clubname, "i")},
                {"fields.cantPlayers": { "$in": cantPlayers } },
                {"fields.price": {"$gte": priceMin, "$lte": priceMax } }
            ]
            }, function (err, club) {
                if (err) {
                    return res.status(500).send(err + "al menos entro");
                }

                res.status(200).send(club);

            });
    } else  {
        // Lleno el array con todos los servicios que me llegan en el req
        for (var i = JSON.parse(req.params.clubfilter).services.length - 1; i >= 0; i--) {
            servicesNameArray[i]=JSON.parse(req.params.clubfilter).services[i].name;
        }
        // Realizo la consulta con el array del servicio y el nombre del club en el caso de que venga como parametro
        Club.find({ $and:
            [
                {"name" : new RegExp(JSON.parse(req.params.clubfilter).clubname, "i")},
                { "services.value": { "$all": servicesNameArray } },
                {"fields.cantPlayers": { "$in": cantPlayers } },
                {"fields.price": {"$gte": priceMin, "$lte": priceMax } }
            ]
    }, function (err, club) {
        if (err) {
            return res.status(500).send(err + "al menos entro");
        }
        console.log('El club de arrays');
        console.log(club);
        res.status(200).send(club);

    });
    }
    console.log(servicesNameArray);

};
