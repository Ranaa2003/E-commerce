import { Component, Input } from '@angular/core';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  @Input() msg: String ='';

}
