import {Service} from "./service";
import {Address} from "./address";
export class Club {
    _id: string;
    name: string;
    address: Address;
    phoneNumber: string;
    description: string;
    profileImg: string;
    services: Service [];

}