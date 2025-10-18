import { Component } from '@angular/core';
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { HeroComponent } from "./components/hero/hero/hero.component";
import { NewCollectionComponent } from './components/new-collection/new-collection/new-collection.component';
import { DiscoverComponent } from "../../shared/components/discover/discover.component";
import { ServicesComponent } from "../../shared/components/services/services.component";
import { TestimonialsComponent } from "../../shared/components/testimonials/testimonials.component";

@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, MainSliderComponent, PopularCategoriesComponent, HeroComponent, NewCollectionComponent, DiscoverComponent, ServicesComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
