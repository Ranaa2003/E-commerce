import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private readonly ProductDetailsService=inject(HttpClient)
  getSpecificProduct(id:string | null):Observable<any>{
    return this.ProductDetailsService.get(environment.baseUrl+`products/${id}`)
  }
}
