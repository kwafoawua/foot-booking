/**
 * Created by pablo on 30/8/2017.
 * import {Service} from "../_models/index";
 */

import {Service} from "./service";


export class ClubFilter {
    clubname: string;
    services: Service [];

    //Agregar los otros valores del filtro



    constructor(clubname?: string, service?:Service[]) {
        this.clubname = clubname;
         this.services = service;
    }
}
