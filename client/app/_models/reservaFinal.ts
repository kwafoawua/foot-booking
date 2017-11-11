import Time = google.maps.Time;
/**
 * Created by pablo on 11/11/2017.
 */
export class reservaFinal {
    club: {
        id: string,
        name: string,
        address: string,
        phoneNumber: number,
    };
    field: {
        id: string,
        name: string,
        cantPlayers: number,
        fieldType: string,
        services: [string],
        price: number
    };
    playingDate : Date;
    playingTime : String;
    paidMethod : string;
    player: {
        name: string,
        lastName: string,
        phoneNumber: number,
        id: string

    }
}