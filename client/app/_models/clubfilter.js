"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClubFilter = /** @class */ (function () {
    //Agregar los otros valores del filtro
    function ClubFilter(clubname, service, cantPlayers, maxPrice, minPrice) {
        this.clubname = clubname;
        this.services = service;
        this.cantPlayers = cantPlayers;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
    }
    return ClubFilter;
}());
exports.ClubFilter = ClubFilter;
//# sourceMappingURL=clubfilter.js.map