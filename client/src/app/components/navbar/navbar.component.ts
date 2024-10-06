import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  open: boolean = false;
  isLogin: boolean = false;
  user: any;

  constructor(private _AuthService: AuthService) {
    // For currentUser
    this._AuthService.currentUser.subscribe({
      next: () => {
        if (this._AuthService.currentUser.getValue() !== null) {
          this.isLogin = true;
          this.user = JSON.parse(localStorage.getItem('userinfo')!);
        } else {
          this.isLogin = false;
          this.user = null;
        }
      },
    });
  }

  // For design
  toggleUserSettings() {
    this.open = !this.open;
  }
  // For Logout
  logout() {
    this._AuthService.logout();
  }
}
