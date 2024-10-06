import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  invalidforgetPasswordForm: string = '';

  toastMessage: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  forgetPassword(formData: FormGroup) {
    this._AuthService.forgetPassword(formData.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('verify', res.token);
        this.toastMessage = 'Email Existed';
        this._Router.navigate(['/verifyResetCode']);
      },
      error: (err) => {
        this.invalidforgetPasswordForm = err.error.message;
        // console.log(err);
      },
    });
  }
}
