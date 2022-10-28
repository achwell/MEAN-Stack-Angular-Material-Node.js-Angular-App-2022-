import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURLCategories = environment.apiURL + "category"

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories)
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategories, category)
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${categoryId}`, category)
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`)
  }
}
