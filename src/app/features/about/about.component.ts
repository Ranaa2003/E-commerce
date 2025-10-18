import { Component } from '@angular/core';
import { ServicesComponent } from "../../shared/components/services/services.component";
import { DiscoverComponent } from "../../shared/components/discover/discover.component";
import { TestimonialsComponent } from "../../shared/components/testimonials/testimonials.component";
import { Section1Component } from "./section-1/section-1.component";
import { BlogComponent } from "./blog/blog.component";

@Component({
  selector: 'app-about',
  imports: [ServicesComponent, DiscoverComponent, TestimonialsComponent, Section1Component, BlogComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
