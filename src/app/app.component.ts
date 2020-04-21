import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { IdentityService } from './shared/modules/identity/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kursweb';
  color: string;
  
  constructor(private _authService: AuthService,
    private _identityService: IdentityService) {

  }

  logout(): void {
    this._authService.logout(window.location.pathname + window.location.search)
      .then(resolve => {
        this._identityService.setCurrentUser(null);
      });
  }
}
