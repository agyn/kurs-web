import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { IdentityService } from './identity.service';

@Injectable()
export class IdentityInterceptor implements HttpInterceptor {

  constructor(private _identityService: IdentityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('anonymous') || req.headers.has('Authorization')) {
      return next.handle(req);
    }

    const authHeader = this._identityService.getAuthHeader();

    if (authHeader) {
      const _req = req.clone({
        setHeaders: {
          Authorization: `${authHeader}`
        }
      });
      return next.handle(_req);
    }

    return EMPTY;
  }
}
