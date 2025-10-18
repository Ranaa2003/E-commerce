import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../features/wishlist/service/wishlist.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input({ required: true }) isLogin!: boolean;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly id = inject(PLATFORM_ID);
  cartCount!: number;
  wishlistCount!: number;
  signOut(): void {
    this.authService.logOut();
  }
  getCartProducts(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }
  getWishlistProducts(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistService.wishlistCount.next(res.data.length);
      },
    });
  }

  getCartCount(): void {
    this.cartService.cartCount.subscribe({
      next: (value) => {
        this.cartCount = value;
      },
    });
  }
  getWishlistCount(): void {
    this.wishlistService.wishlistCount.subscribe({
      next: (value) => {
        this.wishlistCount = value;
      },
    });
  }
  constructor(private flowbiteService: FlowbiteService) {}


  ngOnInit(): void {
       this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  
    if (isPlatformBrowser(this.id)) {
      this.getCartProducts();
      this.getWishlistProducts();
    }
    this.getWishlistCount();
    this.getCartCount();
  }
}
