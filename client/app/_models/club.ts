
import {Address} from "./address";
import {Field} from "./field";

export class Club {
    _id: string;
    name: string;
    address: Address;
    phoneNumber: string;
    description: string;
    profileImg: string;
    galleryImg: string[];
    fields: Field[];


}