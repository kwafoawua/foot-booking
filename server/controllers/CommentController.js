'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Comment = require('../models/Comment');
var Q = require('q');
const { getPagination } = require('../utils/utils');



/**
 * Create a Comment
 */
module.exports.createComment = function (req,res) {
    console.log("este es el create");
    var comment = req.body;
    console.log(comment);
    addComment(comment)
        .then(function () {
            console.log('Se creo el comentario');
            res.status(200).send({ message: 'Se creo el comentario' });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function addComment (comment) {
    console.log("este es el addComment");
    console.log(comment);

    var deferred = Q.defer();

    var newComment = new Comment({

        _idClub: comment._idClub,
        userName: comment.userName,
        comment: comment.comment,
        createdOn : comment.createdOn
    });

    console.log( newComment);
    newComment.save(function (err) {
        console.log(err);
                    if (err) {
                        return deferred.reject(err.name + ' : ' + err.message);
                    } else {
                        deferred.resolve();
                    }
                });
    return deferred.promise;
}

/**
* Find all comment for a specific club
*/
module.exports.findAllCommentForAClub = async (req, res) => {
    console.log("Id del club a buscar: " + req.params._id);
    const {page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    try {
        const comments = await Comment.paginate({"_idClub" : req.params._id},{ limit, offset, sort: {_id: -1} });
        res.status(200).send({
            totalItems: comments.totalDocs,
            comments: comments.docs,
            totalPages: comments.totalPages,
            currentPage: comments.page - 1,
        });
    } catch(err) {
        res.status(500).send(err);
    }


};

/**
* Find all commet made by an author
*/
module.exports.findAllAuthorComments = function(req, res) {
    console.log("Id del author a buscar: " + req.params.authorId);
    Comment.find({"author.id" : req.params.authorId}, function(err,comment){
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(comment);
    });
};

/**
* Update a comment
* Must recive id of a comment, comment to update and a author id to validate becouse only the author
* can validate a comment.
*/
module.exports.updateComment = function(req, res) {
    console.log("Entra al updateComment con: " + req.body);
    var newComment = {};
    newComment.commentId = req.body.commentId;
    newComment.commentMsg = req.body.comment;
    newComment.authorId = req.body.authorId;

    changeComment(newComment)
        .then(function (comment) {
            console.log(comment);
            res.status(200).send(comment);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
};

function changeComment(newComment){
    var deferred = Q.defer();

    return Comment.find({"_id":newComment.commentId, "autho.id":newComment.authorId}, function (err, comment){
        if (err) {
            return deferred.reject("Nombre del error: " + err.name + " - Mensaje: " + err.message);
        } else {
            comment.comment = newComment.commentMsg;
            comment.dateModify = Date.now();

            comment.save(function (err) {
                if (err) {
                    console.log(err);
                    return deferred.reject("Nombre del error: " + err.name + " - Mensaje: " + err.message);
                }
                console.log("El nvo comentario: " + comment.commentMsg);
                deferred.resolve({comment:comment.commentMsg});
            });
            return deferred.promise;
        }
    }).exec();
}


/**
 * Delete a Comment
 */
module.exports.deleteComment = function(req, res) {
    var commentId = req.body.commentId;

    deleteComment(commentId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteComment (commentId) {
    var deferred = Q.defer();

    Comment.deleteOne({"_id": commentId }, function(err){
        if (err) {
            return deferred.reject(err.name + ' : ' + err.message);
        }else{
            deferred.resolve();
        }

        return deferred.promise;
    }).exec();
}
