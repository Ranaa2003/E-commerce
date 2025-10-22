import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Cart } from '../../cart-item.interface';
import { WishlistService } from '../wishlist/service/wishlist.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  Cart: Cart = {} as Cart;
  id: string | null = null;
  checkOutForm!: FormGroup;
  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }
  getCartId(): void {
    this.route.paramMap.subscribe({
      next: (paramId) => {
        this.id = paramId.get('id');
      },
    });
  }
  getCartProducts(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.Cart = res.data;
        console.log(this.Cart);
      },
    });
  }
  payByVisa(): void {
    if (this.checkOutForm.valid) {
      console.log(this.checkOutForm.value);
      this.cartService
        .checkOutSession(this.id, this.checkOutForm.value)
        .subscribe({
          next: (res) => {
            console.log(res.session.url);
            if (res.status === 'success') window.open(res.session.url, '_self');
            this.cartService.cartCount.next(0);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else console.log('Something went error');
  }
  payByCash(): void {
    if (this.checkOutForm.valid) {
      console.log(this.checkOutForm.value);
      this.cartService.cashOrder(this.id, this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          setTimeout(() => this.router.navigate(['/allorders']), 1500);
          this.cartService.cartCount.next(0);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else console.log('Something went error');
  }

  ngOnInit(): void {
      if (!this.id || this.id === 'undefined') {
      this.router.navigate(['/cart']);
      return;
      }
    this.initForm();
    this.getCartProducts();
    this.getCartId();
  }
}
