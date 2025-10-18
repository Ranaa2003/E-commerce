import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  cartCount:BehaviorSubject<number>=new BehaviorSubject(0);
  addProductToCart(productId: string): Observable<any> {
    console.log(
      environment.baseUrl + 'cart',
      {
        productId: productId,
      }
    );
    return this.httpClient.post(
      environment.baseUrl + 'cart',
      {
        productId: productId,
      }
    );
  }
  getUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }
  deleteCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `cart/${id}`
    );
  }
  deleteAllItems(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart');
  }
  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${id}`,
      {
        count: count,
      }
    );
  }
  checkOutSession(id: string|null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      data
    );
  }
  cashOrder(id: string|null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/${id}`,
      data
    );
  }
  allOrder(id: string|null): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl +
        `orders/user/${id}`,
    );
  }
}
