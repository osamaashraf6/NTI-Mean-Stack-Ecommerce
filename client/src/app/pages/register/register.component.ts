import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // TODO: { Properties[depend on each case create get..],,,, Methods[lifycycle],,,, All import at(imports 3, constructor 3) }3
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    lastname: new FormControl(null, [
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  invalidRegisterFormEmail: string = '';
  invalidRegisterFormPhone: string = '';
  invalidRegisterFormPassword: string = '';
  invalidRegisterFormConfirmPassword: string = '';
  toastMessage: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  register(formData: FormGroup) {
    this._AuthService.register(formData.value).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('user', res.token);
        this._AuthService.getAndDecodeAndSaveAtCurrentUser();
        this.toastMessage = 'Sign In Success';
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') {
            this.invalidRegisterFormEmail = error.msg;
            console.log(error);
          }
          if (error.path === 'phone') {
            this.invalidRegisterFormPhone = error.msg;
            console.log(error);
          }
          if (error.path === 'password') {
            this.invalidRegisterFormPassword = error.msg;
            console.log(error);
          }
          if (error.path === 'confirmPassword') {
            this.invalidRegisterFormConfirmPassword = error.msg;
            console.log(error);
          }
        });
      },
    });
  }
}
