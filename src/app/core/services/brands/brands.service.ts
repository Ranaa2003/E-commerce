import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly BrandService=inject(HttpClient)
  getAllBrands():Observable<any>{
  return this.BrandService.get(environment.baseUrl+'brands')
  }
}
