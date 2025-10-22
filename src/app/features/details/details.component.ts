import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService=inject(ProductDetailsService)
    
  private readonly toastrService=inject(ToastrService)

  private readonly cartService=inject(CartService)
  productDetails:Product={} as Product;
  selectedImage: string | null = null;
  mssg:String=''


  id: string | null = null
  ngOnInit(): void {
    this.getProductId()
    this.getSpecificProduct()
  }
  getProductId(): void {
    // this.activatedRoute.params <ng 7.0
    this.activatedRoute.paramMap.subscribe({
      next: (paramId) => {
        this.id=paramId.get('id');
        console.log(paramId.get('id'))
      }
    }) //+v7 and subsscribe to any modification in param track modification
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
  }
  getSpecificProduct():void{
    this.productDetailsService.getSpecificProduct(this.id).subscribe({
      next:(res)=>{
       this.productDetails=res.data;
       console.log(this.productDetails.priceAfterDiscount)
      }
    })
  }
     addProductItemToCart(id:string):void{
      console.log(id)
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{console.log(res)
          this.mssg=res.message
        this.cartService.cartCount.next(res.numOfCartItems);
          this.toastrService.success(res.message);
        }
      })
     }
selectImage(image: string) {
  this.selectedImage = image;
}
}
