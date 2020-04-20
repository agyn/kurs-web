import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { IdentityService } from '../shared/modules/identity/identity.service';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgZorroAntdModule
  ],
  providers: [
    AuthService,
    IdentityService
  ]
})
export class AuthModule { }
