import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Brand } from '../../core/models/brand.interface';
import { Category } from '../../core/models/category.interface';
import { BrandsService } from '../../core/services/brands/brands.service';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly brandsService = inject(BrandsService);

  searchTerm = '';
  @Output() filtersChanged = new EventEmitter<any>();

  Categories: Category[] = [];
  filteredCategories: Category[] = [];
  Brands: Brand[] = [];

  toggleSection: WritableSignal<'category' | 'brand'> = signal('category');

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res.data || [];
        this.filteredCategories = [...this.Categories];
      },
      error: (err) => console.error('Error loading categories:', err),
    });
  }

  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => (this.Brands = res.data || []),
      error: (err) => console.error('Error loading brands:', err),
    });
  }

  selectCategory(category: Category): void {
    this.filtersChanged.emit({ type: 'category', value: category });
  }

  selectBrand(brand: Brand): void {
    this.filtersChanged.emit({ type: 'brand', value: brand });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCategories = this.Categories.filter((c) =>
      c.name.toLowerCase().includes(term)
    );
  }

  // ✅ Proper toggle
  switchSection(section: 'category' | 'brand'): void {
    this.toggleSection.set(section);
    console.log(this.toggleSection())
  }
}
