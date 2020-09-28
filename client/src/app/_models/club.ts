import { Address } from './address';
import { Field } from './field';

export class Club {
  _id: string;
  name: string;
  email: string;
  address: Address;
  services: [ {
    display: string,
    value: string
  } ];
  phoneNumber: string;
  description: string;
  profileImg: string;
  galleryImg: string[];
  fields: Field[];
  socialMedia: {
    facebookId: string,
    twitterId: string,
    instagramId: string,
    snapchatId: string,
    googleId: string
  };
  hasATournament: boolean;

}
