import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Supplier {
  id: string;
  nome: string;
  cnpj: string;
  initials: string;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {

  private apiUrl = 'http://localhost:3000/suppliers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  add(supplier: Supplier) {
    return this.http.post(this.apiUrl, supplier);
  }

  update(id: string, supplier: Supplier) {
    return this.http.put(`${this.apiUrl}/${id}`, supplier);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}