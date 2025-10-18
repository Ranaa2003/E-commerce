import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../../core/models/product.interface';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'wishlist_products';

  private wishlistProductsSubject = new BehaviorSubject<Product[]>([]);
  wishlistProducts$ = this.wishlistProductsSubject.asObservable();
  wishlistCount = new BehaviorSubject<number>(0);

  constructor() {
    this.loadWishlistFromLocalStorage();
  }

  private loadWishlistFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const products = JSON.parse(stored);
        this.wishlistProductsSubject.next(products);
        this.wishlistCount.next(products.length);
      }
    }
  }

  private saveWishlistToLocalStorage(products: Product[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    }
  }

  private setWishlistProducts(products: Product[]): void {
    this.wishlistProductsSubject.next(products);
    this.wishlistCount.next(products.length);
    this.saveWishlistToLocalStorage(products);
  }

  getLoggedUserWishlist(): Observable<any> {
     if (!this.cookieService.check('token')){
      this.router.navigate(['/login']);
     }
    return this.httpClient.get(environment.baseUrl + 'wishlist').pipe(
      tap((res: any) => {
        this.setWishlistProducts(res.data);
      })
    );
  }

  addProductToWishlist(product: Product): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'wishlist', { productId: product._id }).pipe(
      tap(() => {
        const updated = [...this.wishlistProductsSubject.value, product];
        this.setWishlistProducts(updated);
      })
    );
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`).pipe(
      tap(() => {
        const updated = this.wishlistProductsSubject.value.filter(p => p._id !== id);
        this.setWishlistProducts(updated);
      })
    );
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistProductsSubject.value.some(p => p._id === product._id);
  }
}
