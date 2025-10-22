import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../core/models/product.interface';
import { ProdcutService } from '../../../../core/services/products/prodcut.service';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/service/wishlist.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent,RouterLink],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
 private readonly productService=inject(ProdcutService);
  private readonly wishlistService = inject(WishlistService);
   private readonly toastr = inject(ToastrService);
 productSubcription!:Subscription;
 productList:Product[]=[];
 ngOnInit(): void {
   this.getAllProduct();
 }

 getAllProduct():void{
  this.productSubcription=this.productService.getProducts().subscribe({
    next:(res)=>{
    console.log(res.data)
    this.productList=res.data;
    },
    error:(err)=> {
      console.log(err)
    }
  })
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
