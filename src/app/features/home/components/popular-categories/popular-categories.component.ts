import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoriesService);
  categoryList: Category[] = [];
  cateorySubscribtion!: Subscription;
  categoriesOptions: OwlOptions = {
 loop: true,
  margin: 15,
  stagePadding: 20,
  autoplay: true,
    autoWidth: true,

  autoplayTimeout: 2000,
  dots: false,
  nav: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
     responsive: {
    0: { items: 2 },
    640: { items: 3 },
    1024: { items: 4 }, 
  },

  };

  loadAllCatgories(): void {
    this.cateorySubscribtion = this.categoryService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categoryList = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnInit(): void {
    this.loadAllCatgories();
  }
}
