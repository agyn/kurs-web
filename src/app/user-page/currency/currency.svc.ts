import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { api } from 'src/environments/api';
import { CurrencyEditDto } from './Currency-edit.dto';
import { CurrencyList } from './Currency-list';
import { CurrencyDto } from './Currency-dto';
import { ShortRef } from '../short-ref';
import { CurrencyListAll } from './currency-list-all';

@Injectable()
export class CurrencySvc {
  private commonUrl = `${api.main}/Kurs`;
  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public add(dto: CurrencyDto) {
    return this.http.put(`${this.commonUrl}/Add`, dto);
  }

  public search(count: number, page: number, name: string): Observable<CurrencyList> {
    return this.http.get<CurrencyList>(`${this.commonUrl}/Search`, {
      params: {
        Count: `${count}`,
        Page: `${page}`,
        Name: name
      }
    });
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

  public update(dto: CurrencyEditDto) {
    return this.http.post(`${this.commonUrl}/Update`, dto);
  }


  public delete(id: number) {
    return this.http.delete(`${this.commonUrl}/Delete`, {
      params: {
        id: `${id}`
      }
    });
  }

  public getExchangers(): Observable<ShortRef[]> {
    return this.http.get<ShortRef[]>(`${api.main}/Exchanger/GetExchangers`);
  }

}
