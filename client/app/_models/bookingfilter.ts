import {Service} from "./service";


export class BookingFilter {
    idField: string;
    playingDate: Date;

	constructor(idField?: string, playingDate?: Date) {
		this.idField = idField;
		this.playingDate = playingDate;
    }
}