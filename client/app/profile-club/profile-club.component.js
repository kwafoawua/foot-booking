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
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var ProfileClubComponent = /** @class */ (function () {
    //user: any = {};
    function ProfileClubComponent(router, route, 
        //private clubService: ClubService,
        userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.user = {};
        //  user: Observable<any>;
        this.club = {};
    }
    ProfileClubComponent.prototype.ngOnInit = function () {
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        /* this.userService.getByUsername(this.username);
         this.userService.usuario$.subscribe(
             userClub => {
                 this.user.username = userClub.username;
                     this.user.email = userClub.email;
                     this.user._id = userClub._id;
                     this.club = userClub.creator
             });
    
     }*/
        this.getUserAndClub(this.username);
        //this.user = this.userService.user;
        //this.userService.getByUsername(this.username);
    };
    ProfileClubComponent.prototype.goToInfo = function () {
        this.router.navigate(['./info'], { relativeTo: this.route });
    };
    ProfileClubComponent.prototype.goToUser = function () {
        this.router.navigate(['./'], { relativeTo: this.route });
    };
    ProfileClubComponent.prototype.goToPassword = function () {
        this.router.navigate(['./password'], { relativeTo: this.route });
    };
    ProfileClubComponent.prototype.goToFields = function () {
        this.router.navigate(['./canchas'], { relativeTo: this.route });
    };
    ProfileClubComponent.prototype.getUserAndClub = function (username) {
        var _this = this;
        this.userService.getByUsername(username).subscribe(function (userClub) {
            console.log(userClub);
            _this.user.username = userClub.username,
                _this.user.email = userClub.email,
                _this.user._id = userClub._id,
                _this.club = userClub.creator;
        });
    };
    ProfileClubComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'profile-club.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            index_1.UserService])
    ], ProfileClubComponent);
    return ProfileClubComponent;
}());
exports.ProfileClubComponent = ProfileClubComponent;
//# sourceMappingURL=profile-club.component.js.map