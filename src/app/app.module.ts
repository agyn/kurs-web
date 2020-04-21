import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { KursPageComponent } from './kurs-page/kurs-page.component';
import { NgZorroBasicModule } from './ng-zorro-basic.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RegisterComponent } from './register/register.component';
import { UserPageComponent } from './user-page/user-page.component';
import { IdentityModule } from './shared/modules/identity/identity.module';
import { AuthService } from './auth/auth.service';
import { HasPermissionDirective } from './shared/modules/identity/directives/has-permission.directive';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    KursPageComponent,
    RegisterComponent,
    UserPageComponent,
    HasPermissionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule, FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    NgZorroBasicModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    IdentityModule.forRoot(),
  ],
  exports: [
    HasPermissionDirective
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
