import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IdentityInterceptor } from './identity.interceptor';
import { IdentityService } from './identity.service';
import { IdentityGuard } from './identity.guard';
import { HasPermissionDirective } from './directives/has-permission.directive';

@NgModule({
  declarations: [
    // HasPermissionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // HasPermissionDirective
  ]
})
export class IdentityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IdentityModule,
      providers: [
        IdentityService,
        IdentityGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: IdentityInterceptor,
          multi: true
        }
      ]
    };
  }
}
