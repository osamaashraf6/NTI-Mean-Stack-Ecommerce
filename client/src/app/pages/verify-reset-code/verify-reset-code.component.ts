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
  selector: 'app-verify-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.scss',
})
export class VerifyResetCodeComponent {
  verifyResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  invalidverifyResetCodeForm: string = '';

  toastMessage: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  verifyResetCode(formData: FormGroup) {
    this._AuthService.verifyResetCode(formData.value).subscribe({
      next: (res) => {
        this.toastMessage = 'Success';
        this._Router.navigate(['/resetPassword']);
      },
      error: (err) => {
        this.invalidverifyResetCodeForm = err.error.message;
      },
    });
  }
}
