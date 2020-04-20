import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { api } from 'src/environments/api';
import { CitiesDto } from './cities-dto';
import { CitiesList } from './cities-list';
import { CitiesEditDto } from './cities-edit.dto';
import { ExchangerEditDto } from './exchanger-edit.dto';
import { ExchangerEditDto } from './exchanger-edit.dto';
import { ExchangerList } from './exchanger-list';
import { ExchangerDto } from './exchanger-dto';

@Injectable()
export class ExchangerSvc {
  private commonUrl = `${api.main}/City`;
  private http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public add(dto: ExchangerDto) {
    return this.http.put(`${this.commonUrl}/Add`, dto);
  }

  public search(count: number, page: number, name: string): Observable<ExchangerList> {
    return this.http.get<CitiesList>(`${this.commonUrl}/Search`, {
      params: {
        Count: `${count}`,
        Page: `${page}`,
        Name: name
      }
    });
  }

  public update(dto: ExchangerEditDto) {
    return this.http.post(`${this.commonUrl}/Update`, dto);
  }


  public delete(id: number) {
    return this.http.delete(`${this.commonUrl}/Delete`, {
      params: {
        id: `${id}`
      }
    });
  }

}
