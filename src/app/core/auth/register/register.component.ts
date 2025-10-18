import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isNameFocused: boolean = false;
  messageErr: string = '';
  isLoading: boolean = false;
  registerForm!: FormGroup;
  showPassword:boolean=false


  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\w{6,}$/),
        ]),
        rePassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\w{6,}$/),
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ]),
        //(ngSubmit)="submit()" event to form when user pressing enter on click on sub btn
      },
      { validators: [this.confirmPassword] }
    );
  }

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value == group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.isLoading = true;

      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.messageErr = '';
          console.log(res);
          this.isLoading = false;
          if (res.message === 'success') this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.messageErr = err.error.message;
        },
      });
    } else {
      // this.registerForm.setErrors({mismatch:true})
      this.registerForm.get('rePassword')?.patchValue('');
      // this.registerForm.get('rePassword')?.setValue('')

      this.registerForm.markAllAsTouched();
    }
  }
}
