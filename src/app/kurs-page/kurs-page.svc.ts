import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { api } from 'src/environments/api';
import { CurrencyListAll } from '../user-page/currency/currency-list-all';

@Injectable()
export class KursPageSvc {
  private commonUrl = `${api.main}/Kurs`;
  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public searchAll(count: number, page: number, name: string): Observable<CurrencyListAll> {
    return this.http.get<CurrencyListAll>(`${this.commonUrl}/SearchAll`, {
      headers: new HttpHeaders({
        'anonymous': `yes`
      }),
      params: {
        Count: `${count}`,
        Page: `${page}`,
        Name: name
      }
    });
  }

}
