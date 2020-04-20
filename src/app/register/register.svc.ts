import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from 'src/environments/api';
import { RegisterDto } from './register.dto';


@Injectable()
export class RegisterService {

  private _Url = `${api.identity}/Account`;

  constructor(private _httpClient: HttpClient) { }

  register(item: RegisterDto): Observable<void> {
    return this._httpClient.post<void>(`${this._Url}/register`, item);
  }

}