"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var CommentService = /** @class */ (function () {
    //public static  comment: Comment;
    function CommentService(http) {
        this.http = http;
    }
    CommentService.prototype.create = function (comment) {
        console.log(comment);
        return this.http.post('/comments/create', comment);
    };
    CommentService.prototype.update = function (comment, _id, authorId) {
        return this.http.put('/comments/changeComment/' + _id, comment, authorId).map(function (response) { return response.json(); });
        ;
    };
    CommentService.prototype.findAllCommentForAClub = function (_id) {
        return this.http.get('/comments/clubComment/' + _id).map(function (response) { return response.json(); });
    };
    CommentService.prototype.findAllAuthorComments = function (_id) {
        return this.http.get('/comments/authorComment/' + _id).map(function (response) { return response.json(); });
    };
    CommentService.prototype.deleteComment = function (_id) {
        return this.http.delete('/comments/' + _id);
    };
    CommentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map