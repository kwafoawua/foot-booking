/**
 * Created by pablo on 30/8/2017.
 * import {Service} from "../_models/index";
 */

import {Service} from "./service";


export class ClubFilter {
    clubname: string;
    services: Service [];
    cantPlayers: number;
    minPrice: number;
    maxPrice: number;


    //Agregar los otros valores del filtro



    constructor(clubname?: string, service?:Service[], cantPlayers?: number, maxPrice?: number, minPrice?: number) {
         this.clubname = clubname,
         this.services = service,
         this.cantPlayers = cantPlayers;
         this.maxPrice=maxPrice;
         this.minPrice=minPrice;
    }
}
