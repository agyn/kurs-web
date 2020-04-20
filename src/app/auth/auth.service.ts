import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from './interfaces/token';
import { api } from 'src/environments/api';

@Injectable()
export class AuthService {

  private _authUrl = `${api.identity}/Account/login`;

  constructor(private _httpClient: HttpClient,
              private _router: Router) { }

  login(userName: string, password: string, remember?: boolean): Observable<Token> {
    return this._httpClient
      .post<Token>(`${this._authUrl}`, {
        login: userName,
        password: password
      }, {
        headers: new HttpHeaders({
          'anonymous': `yes`
        })
      });
  }

  logout(redirectUrl?: string): Promise<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    return this._router.navigate(['/auth/login'], { queryParams: { redirectUrl: redirectUrl }});
  }
}
