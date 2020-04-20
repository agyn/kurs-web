import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './register.svc';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {


  loginForm: FormGroup;

  redirectUrl: string;

  incorrectLogin = false;
  waitForLogin = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _registerService: RegisterService
  ) {
    this.loginForm = this._formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .subscribe(params => {
        // Grab redirect url
        this.redirectUrl = params.redirectUrl;
      });
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

      // register
      var dto = {
        login: this.loginForm.controls['userName'].value,
        password: this.loginForm.controls['password'].value
      }

      this._registerService.register(dto).subscribe(next => {
        this._waitForLogin(false);
        this._router.navigateByUrl(this.redirectUrl || '/auth/login');
      });
    }
  }

}
