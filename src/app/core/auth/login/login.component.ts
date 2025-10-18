import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { InputComponent } from '../../../shared/components/input/input.component';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  loginForm!: FormGroup;
  isLoading: boolean = false;
  messageErr: string = '';
  errorMessage: string = '';
  subscribe: Subscription = new Subscription();
  showPassword:boolean=false
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.subscribe.unsubscribe();
      this.isLoading = true;
      this.subscribe = this.authService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            if (res.message === 'success') {
              //save token
              this.cookieService.set('token', res.token);
              console.log(this.authService.decodeToken());
              //navigate to home
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            this.messageErr = err.error.message;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
       if(this.loginForm.get('email')?.invalid){
         this.errorMessage='E-mail is Required'
       }
       else if(this.loginForm.get('email')?.getError('email'))
       {
        this.messageErr=' Invalid email address'
       }
    }
  }
}
