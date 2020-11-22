import { Service } from './service';

export class ClubFilter {
  clubname?: string;
  services?: Service [];
  cantPlayers?: number;
  minPrice?: number;
  maxPrice?: number;
  fieldType?: string;

  //Agregar los otros valores del filtro

  constructor(clubname?: string, services?: Service[], cantPlayers?: number, maxPrice?: number, minPrice?: number, fieldType?: string) {
    if (clubname) {
      this.clubname = clubname;
    }
    if (services && services.length) {
      this.services = services;
    }
    if (cantPlayers) {
      this.cantPlayers = cantPlayers;
    }
    if (maxPrice) {
      this.maxPrice = maxPrice;
    }
    if (minPrice) {
      this.minPrice = minPrice;
    }
    if(fieldType) {
      this.fieldType = fieldType;
    }
  }
}
