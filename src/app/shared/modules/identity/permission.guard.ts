// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { IdentityService } from './identity.service';

// @Injectable()
// export class PermissionGuard implements CanActivate, CanActivateChild {

//   constructor(private _identityService: IdentityService,
//               private _router: Router) {}

//   // private _checkPermission(next: ActivatedRouteSnapshot): boolean {
//   //   const hasPermission = this._identityService.checkPermission(next.data.permissions);

//   //   if (!hasPermission) {
//   //     this._router.navigate(['/portal/home']);
//   //   }
//   //   return hasPermission;
//   // }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this._checkPermission(next);
//   }
//   canActivateChild(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this._checkPermission(next);
//   }
// }
