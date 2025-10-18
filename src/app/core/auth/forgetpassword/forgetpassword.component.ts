import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  Email:string=''
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  step: number = 1;
  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPassword = this.fb.group({
      email: [null, [Validators.required]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
    });
  }
  submitEmail(): void {
    if (this.verifyEmail.valid) {
      console.log(this.verifyEmail.value, 'step1');
      this.authService.verifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.Email=this.verifyEmail.get('email')?.value
          this.resetPassword.get('email')?.setValue(this.Email);
          this.step = 2;
        },
      });
    } else this.verifyEmail.markAllAsTouched();
  }
  submitCode(): void {
    if (this.verifyCode.valid) {
      console.log(this.verifyCode.value, 'step2');
      this.authService.verifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        },
      });
    } else this.verifyCode.markAllAsTouched();
  }

  submitRePassword(): void {
    if (this.resetPassword.valid) {
      console.log(this.resetPassword.value, 'step3');
      this.authService.restPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
          console.log(this.step);
        },
      });
    } else this.resetPassword.markAllAsTouched();
  }

  ngOnInit(): void {
    this.initForm();
  }
}
