import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from './service/wishlist.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [CardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit ,OnDestroy{
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  subscription: Subscription = new Subscription();
  wishlistProducts: Product[] = [];

ngOnInit(): void {
  this.wishlistService.wishlistProducts$.subscribe(products => {
    this.wishlistProducts = products;
  });

  this.wishlistService.getLoggedUserWishlist().subscribe({
    error: () => this.toastr.error('Failed to load wishlist'),
  });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

  removeFromWishlist(product: Product): void {
   this.subscription= this.wishlistService.removeProductFromWishlist(product._id).subscribe({
      next: () => {
        this.toastr.info('Removed from wishlist');
      },
      error: () => this.toastr.error('Failed to remove from wishlist'),
    });
  }
}
