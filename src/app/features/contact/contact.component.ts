import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  contactForm!: FormGroup;
  initForm(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('/^\w{6,}$/')]],
      message: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.initForm()
  }
}
