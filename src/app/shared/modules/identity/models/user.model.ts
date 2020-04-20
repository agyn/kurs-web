import { UserData } from '../interfaces/user-data';

export class UserModel {
  private _userData: UserData;

  get introduce() {
    return `${this._userData.login}`;
  }

  constructor(userData: UserData) {
    this._userData = userData;
  }

}
