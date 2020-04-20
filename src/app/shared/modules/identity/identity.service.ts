import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { UserData } from './interfaces/user-data';

@Injectable()
export class IdentityService {

  private _user: string;

  get user() {
    return this._user;
  }

  constructor(private _httpClient: HttpClient,
              private _router: Router) { }

  getCurrentUser(): Observable<UserData> {
    return this._httpClient.get<UserData>(`http://localhost:5000/Account/login`);
  }

  setCurrentUser(userData?: string): void {
    if (userData) {
      this._user = userData;
    } else {
      this._user = undefined;
    }
  }

  private _isTokenExp(jwt: string): boolean {
    const jwtArr = jwt.split('.');
    const jwtEnc = atob(jwtArr[1]);
    const data = JSON.parse(jwtEnc);
    return +data.exp < Date.now() / 1000;
  }

  private _getToken(): string {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }


  getAuthHeader(): string {
    const token = this._getToken();
    if (!token) {
      const url = `auth/login?redirectUrl=${window.location.pathname}`;
      this._router.navigateByUrl(url);
      return null;
    }

    if (!this._isTokenExp(token)) {
      return `Bearer ${token}`;
    }

    return null;
  }

}
