import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { IdentityService } from '../../shared/modules/identity/identity.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'ias-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  incorrectLogin = false;
  waitForLogin = false;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _identityService: IdentityService,
    private _notificationService: NzNotificationService) {
    this.loginForm = this._formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  ngOnInit(): void {
  }

  private _waitForLogin(state: boolean): void {
    this.waitForLogin = state;
    for (const key of Object.keys(this.loginForm.controls)) {
      if (state) {
        this.loginForm.controls[key].disable();
      } else {
        this.loginForm.controls[key].enable();
      }
    }
  }

  submitForm(): void {
    for (const key of Object.keys(this.loginForm.controls)) {
      this.loginForm.controls[key].markAsDirty();
      this.loginForm.controls[key].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this._waitForLogin(true);

      // Login
      this._authService.login(
        this.loginForm.controls['userName'].value,
        this.loginForm.controls['password'].value)
        // .pipe(
        //   mergeMap(token => {

        //     // Save token
        //     if (this.loginForm.controls['remember'].value) {
        //       localStorage.setItem('token', token.accessToken);
        //     } else {
        //       sessionStorage.setItem('token', token.accessToken);
        //     }

        //     // Get current user
        //     return token.user;
        //   })
        // )
        .subscribe(token => {
          this.incorrectLogin = false;
          this._waitForLogin(false);
          this._identityService.setCurrentUser(token.user);
          // if (this.loginForm.controls['remember'].value) {
          localStorage.setItem('token', token.accessToken);
          localStorage.setItem('user', token.user);
          // } else {
          sessionStorage.setItem('token', token.accessToken);
          // }
          // Redirect
          this._router.navigateByUrl('/user-page');
        }, error => {
          this._waitForLogin(false);
          this._handleError(error);
        });
    }
  }

  private _handleError(error): void {
    switch (error.status) {
      case 400:
        this.incorrectLogin = true;
        break;

      case 401:
        console.log('Something went wrong!');
        break;

      default:
        this._notificationService.error(`${error.status}!`,
          error.statusText);
        break;
    }
  }

}
