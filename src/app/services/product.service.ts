import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDescarga } from '../models/unloadingLocation';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getLocais(): Observable<LocalDescarga[]> {
    return this.http.get<LocalDescarga[]>(`${this.api}/locaisDescarga`);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`);
  }

  add(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.api}/products`, product);
  }

  update(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.api}/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/products/${id}`);
  }
}