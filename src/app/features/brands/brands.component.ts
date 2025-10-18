import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-brands',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

}
