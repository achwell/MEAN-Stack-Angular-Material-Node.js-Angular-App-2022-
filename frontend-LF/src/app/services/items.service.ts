import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  apiURLItems = environment.apiURL + "items"

  constructor(private http: HttpClient) {
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiURLItems)
  }

  getOneItem(itemId: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiURLItems}/${itemId}`)
  }

  createItem(itemData: FormData): Observable<Item> {
    return this.http.post<Item>(this.apiURLItems, itemData)
  }

  updateItem(itemId: string, itemData: FormData): Observable<Item> {
    return this.http.put<Item>(`${this.apiURLItems}/${itemId}`, itemData)
  }

  deleteItem(itemId: string): Observable<Item> {
    return this.http.delete<Item>(`${this.apiURLItems}/${itemId}`)
  }
}
