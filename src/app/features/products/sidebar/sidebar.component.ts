import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../core/models/category.interface';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Brand } from '../../../core/models/brand.interface';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly brandsService = inject(BrandsService);
 @Output() filtersChanged = new EventEmitter<any>();

  Categories: Category[] = [];
  Brands: Brand[] = [];
  isOpen: boolean = false;
  getAllCateories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res.data;
        console.log('category', this.Categories);
      },
    });
  }
  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.Brands = res.data;
        console.log('brands', this.Brands);
      },
    });
  }
  selectCategory(category: any) {
    console.log(category)
    this.filtersChanged.emit({ type: 'category', value: category });
  }

  selectBrand(brand: any) {
    this.filtersChanged.emit({ type: 'brand', value: brand });
        console.log({ type: 'brand', value: brand })

  }
   constructor(private flowbiteService: FlowbiteService) {}


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getAllCateories();
    this.getAllBrands();
  }
}
