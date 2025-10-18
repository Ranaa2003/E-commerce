import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../cart/cart.service';
import { Order } from '../../core/models/order.interface';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe,TitleCasePipe,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit{
 private readonly authService=inject(AuthService)
 private readonly cartService=inject(CartService )
 ordersList:Order[]=[]
userId: string = '';

ngOnInit(): void {
  this.getUserId()
  this.getAllOrder()
}
getUserId(): void {
  const decoded: any = this.authService.decodeToken();
  console.log(decoded)
  if (decoded && decoded.id) {
    this.userId = decoded.id;
  } else {
    console.warn('No user ID found in token');
  }
}
getAllOrder():void{

  this.cartService.allOrder(this.userId).subscribe({
    next:(res)=> {
      this.ordersList=res
    },
  })
}


}
