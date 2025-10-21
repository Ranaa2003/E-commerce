import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from '../../core/models/cart-item.interface';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  subscription: Subscription = new Subscription();
  emptyCart!: boolean;
  Cart: Cart = {} as Cart;
  totalPrice: string = '';
  ngOnInit(): void {
    this.getCartProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getCartProducts(): void {
    this.subscription = this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.Cart = res.data;
        this.emptyCart = !this.Cart.products.length ? true : false;
      },
    });
  }
  removeCartItme(id: string): void {
    this.cartService.deleteCartItem(id).subscribe({
      next: (res) => {
        this.Cart = res.data;
        this.cartService.cartCount.next(res.numOfCartItems);
        this.toastrService.success('Item Removed Successfully');
      },
    });
  }
  clearCart(): void {
    this.cartService.deleteAllItems().subscribe({
      next: (res) => {
        this.Cart = res.data;
        this.emptyCart = true;
        this.cartService.cartCount.next(0);
        this.toastrService.success('Cart cleared successfully');
      },
    });
  }
  UpdateCount(id: string, count: number): void {
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.Cart = res.data;
        this.toastrService.success('Item updated Successfully');
      },
    });
  }
}
