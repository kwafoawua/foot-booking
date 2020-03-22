export class Field {
  _id: string;
  description: string;
  cantPlayers: number;
  fieldType: string;
  services: [ {
    display: string,
    value: string
  } ];
  price: string;
  fieldName: string
}
