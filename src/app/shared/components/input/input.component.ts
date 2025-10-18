import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control!: any;
  @Input() element: string = 'input';
  @Input() rows: number = 2;
  @Input() typeInput!: string;
  @Input() idInput!: string;
  @Input() palceholder!: string;
  @Input() icon!: string;
  @Input() readonly: boolean=false;
  @Input() labelInput!: string;
}
