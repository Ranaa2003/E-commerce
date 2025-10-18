import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Product } from '../../core/models/product.interface';
import { ProdcutService } from '../../core/services/products/prodcut.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../core/models/category.interface';
import { WishlistService } from '../wishlist/service/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, NgxPaginationModule, SidebarComponent, CarouselModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProdcutService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);

  @ViewChild('wishlistBtn') icon!: ElementRef<HTMLButtonElement>;
  @Output() filtersChanged = new EventEmitter<string>();

  currentFilters: any = {};
  isOpen: boolean = false;
  productList: Product[] = [];
  categoryList: Category[] = [];
  pageSize = 0;
  p = 1;
  total = 0;

  private productSubscription!: Subscription;

  ngOnInit(): void {
    this.getAllProductWithPage();
    this.getAllCategories();

    this.wishlistService.getLoggedUserWishlist().subscribe();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
      error: (err) => console.error('Category fetch failed', err),
    });
  }

  onFiltersChanged(filter: any) {
    if (filter.type === 'category' || filter.type === 'brand') {
      const id = filter.value._id;
      this.currentFilters = { [filter.type]: id };
      this.getAllProductWithPage(1);
    }
  }

  onSortChanged(event: any) {
    const value = event.target.value.trim();
    if (value === 'low') {
      this.currentFilters.sort = 'price';
    } else if (value === 'high') {
      this.currentFilters.sort = '-price';
    } else {
      delete this.currentFilters.sort;
    }
    this.getAllProductWithPage(1);
  }

  getAllProductWithPage(pageNumber: number = 1): void {
    this.productSubscription = this.productService
      .getProductsWthPage(pageNumber, this.currentFilters)
      .subscribe({
        next: (res) => {
          this.productList = res.data;
          this.pageSize = res.metadata.limit;
          this.p = res.metadata.currentPage;
          this.total = res.results;
        },
        error: (err) => console.error('Product fetch failed', err),
      });
  }

  addProductItemToWishList(product: Product): void {
    this.wishlistService.addProductToWishlist(product).subscribe({
      next: () => this.toastr.success('Added to wishlist'),
      error: () => this.toastr.error('Failed to add to wishlist'),
    });
  }

  removeProductItemFromWishList(product: Product): void {
    this.wishlistService.removeProductFromWishlist(product._id).subscribe({
      next: () => this.toastr.info('Removed from wishlist'),
      error: () => this.toastr.error('Failed to remove from wishlist'),
    });
  }

  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product)) {
      this.removeProductItemFromWishList(product);
    } else {
      this.addProductItemToWishList(product);
    }
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistService.isInWishlist(product);
  }
}
