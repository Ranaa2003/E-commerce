import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Category } from '../../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly CategoryService=inject(HttpClient)
  getAllCategories():Observable<any>{
  return this.CategoryService.get(environment.baseUrl+'categories')
  }
}
