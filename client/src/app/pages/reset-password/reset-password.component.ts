import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });
  invalidresetPasswordForm: string = '';

  toastMessage: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  resetPassword(formData: FormGroup) {
    this._AuthService.resetPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.removeItem('verify');
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.invalidresetPasswordForm = err.error.errors[0].msg;
        // console.log(err)
      },
    });
  }
}
