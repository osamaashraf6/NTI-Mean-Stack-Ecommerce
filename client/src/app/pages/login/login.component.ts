import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // TODO: { Properties[depends on case],,,, Methods[lifecycle + 4],,,, All import at[imports 3, constructor 3] }3
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  invalidLoginForm: string = '';
  toastMessage: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  login(formData: FormGroup) {
    this._AuthService.login(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);
        localStorage.setItem('userinfo', JSON.stringify(res.data));
        this._AuthService.getAndDecodeAndSaveAtCurrentUser();
        this.toastMessage = 'Sign In Success';
        this._Router.navigate(['']);
      },
      error: (err) => {
        this.invalidLoginForm = err.error.message;
      },
    });
  }
}
