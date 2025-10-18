import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProdcutService {
  private readonly ProductService = inject(HttpClient);
  getProducts(): Observable<any> {
    return this.ProductService.get(environment.baseUrl + 'products');
  }
getProductsWthPage(
  pageNumber: number = 1,
  filters?: { category?: string; brand?: string; sort?: string }
): Observable<any> {
  let url = environment.baseUrl + `products?page=${pageNumber}&limit=10`;

  if (filters?.category) {
    url += `&category[in]=${filters.category}`;
  }
  if (filters?.brand) {
    url += `&brand[in]=${filters.brand}`;
  }
  if (filters?.sort) {
    url += `&sort=${filters.sort}`;
  }

  console.log('Fetching URL:', url);
  return this.ProductService.get(url);
}

}
