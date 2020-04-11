import { Club } from './club';

export class User {
  _id: string;
  clubId: string;
  username: string;
  password: string;
  email: string;
  creator: Club;
}
