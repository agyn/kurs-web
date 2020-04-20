import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from './identity.service';

@Injectable()
export class IdentityGuard implements CanActivate {

  constructor (private _identityService: IdentityService,
               private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authorized = !!localStorage.getItem("user");
    console.log("authorized = ", authorized);
    if (!authorized) {
      this._router.navigate(['/auth/login'], { queryParams: {
        redirectUrl: window.location.pathname + window.location.search
      }});
    }

    return authorized;
  }
}
