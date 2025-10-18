import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../core/models/product.interface';
import { ProdcutService } from '../../../../core/services/products/prodcut.service';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent,RouterLink],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
 private readonly productService=inject(ProdcutService);
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
}
