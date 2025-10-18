import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/service/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  @ViewChild('wishlistBtn') icon!: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe();
  }


  addProductItemToWishList(product: Product): void {
    this.wishlistService.addProductToWishlist(product).subscribe({
      next: (res) => {
        this.toastrService.success('Added To wishlist');
      },
    });
  }
  removeProductItemFromWishList(product: Product): void {
    this.wishlistService.removeProductFromWishlist(product._id).subscribe({
      next: (res) => {
        this.toastrService.info('Removed from wishlist');
      },
    });
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }
  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product)) 
      this.removeProductItemFromWishList(product);
    else 
      this.addProductItemToWishList(product);
  }
  isInWishlist(product: Product): boolean {
    return this.wishlistService.isInWishlist(product);
  }
}
