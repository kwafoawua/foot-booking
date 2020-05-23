"use strict";
/**
 * Created by pablo on 19/11/2017.
 */
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
var club_service_1 = require("../../_services/club.service");
var user_service_1 = require("../../_services/user.service");
var router_1 = require("@angular/router");
var comment_1 = require("../../_models/comment");
var comment_service_1 = require("../../_services/comment.service");
var authentication_service_1 = require("../../_services/authentication.service");
var commentsComponent = /** @class */ (function () {
    function commentsComponent(clubService, userService, route, commentService, authenticatedService) {
        this.clubService = clubService;
        this.userService = userService;
        this.route = route;
        this.commentService = commentService;
        this.authenticatedService = authenticatedService;
        this.comment = new comment_1.Comment();
        this.clubComentarios = [];
        this.textComment = '';
    }
    commentsComponent.prototype.ngOnInit = function () {
        // this.isAuthenticated();
        this.getComentarios();
        this.getClub(this.route.snapshot.params['id']);
        if (this.authenticatedService.isAuthenticated()) {
            this.authenticated = true;
            this.currrentUser = JSON.parse(localStorage.getItem('currentUser')).username;
            this.isClub = this.authenticatedService.isUserClub();
            if (this.isClub == true) {
                this.authenticated = false;
            } // this.currrentUser =  this.authenticatedService.getUserAuthenticated
        }
    };
    commentsComponent.prototype.isAuthenticated = function () {
        if (localStorage.currentUser) {
            this.authenticated = true;
            this.currrentUser = JSON.parse(localStorage.getItem('currentUser')).username;
        }
        else
            this.authenticated = false;
    };
    commentsComponent.prototype.agregarComment = function () {
        var _this = this;
        this.comment.userName = this.currrentUser;
        this.comment._idClub = this.club._id;
        this.comment.comment = this.textComment;
        this.commentService.create(this.comment).subscribe(function (data) {
            _this.clubComentarios.push(_this.comment);
        }, function (error) {
            console.log(error);
        });
        this.textComment = '';
        this.getComentarios();
    };
    commentsComponent.prototype.getClub = function (_id) {
        var _this = this;
        this.clubService.getResultById(_id).subscribe(function (club) {
            _this.club = club;
        });
    };
    commentsComponent.prototype.getComentarios = function () {
        var _this = this;
        console.log(this.route.snapshot.params['id']);
        this.commentService.findAllCommentForAClub(this.route.snapshot.params['id']).subscribe(function (comments) {
            _this.clubComentarios = comments;
            console.log(comments);
        });
    };
    commentsComponent = __decorate([
        core_1.Component({
            selector: 'comments',
            moduleId: module.id,
            templateUrl: 'comment.html'
        }),
        __metadata("design:paramtypes", [club_service_1.ClubService, user_service_1.UserService,
            router_1.ActivatedRoute, comment_service_1.CommentService,
            authentication_service_1.AuthenticationService])
    ], commentsComponent);
    return commentsComponent;
}());
exports.commentsComponent = commentsComponent;
//# sourceMappingURL=commentsComponent.js.map