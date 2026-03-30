import { Injectable } from '@angular/core';

export interface LocalDescarga {
  id: number;
  nome: string;
}

export interface Product {
  id: number;
  nome: string;
  codigoEan: string;
  localDescargaId: number;
  localDescarga: string;
}

const LOCAIS: LocalDescarga[] = [
  { id: 1, nome: 'Doca A - Setor Grãos' },
  { id: 2, nome: 'Doca B - Setor Frios' },
  { id: 3, nome: 'Doca C - Setor Seco' },
  { id: 4, nome: 'Pátio Externo' },
];

@Injectable({ providedIn: 'root' })
export class ProductService {

  private products: Product[] = [
    { id: 1, nome: 'Farelo de Soja', codigoEan: '7891234560001', localDescargaId: 1, localDescarga: 'Doca A - Setor Grãos' },
    { id: 2, nome: 'Milho em Grão', codigoEan: '7891234560002', localDescargaId: 1, localDescarga: 'Doca A - Setor Grãos' },
    { id: 3, nome: 'Carne Bovina Resfr.', codigoEan: '7891234560003', localDescargaId: 2, localDescarga: 'Doca B - Setor Frios' },
    { id: 4, nome: 'Arroz Tipo 1', codigoEan: '7891234560004', localDescargaId: 3, localDescarga: 'Doca C - Setor Seco' },
    { id: 5, nome: 'Açúcar Cristal', codigoEan: '', localDescargaId: 3, localDescarga: 'Doca C - Setor Seco' },
    { id: 6, nome: 'Fertilizante NPK', codigoEan: '7891234560006', localDescargaId: 4, localDescarga: 'Pátio Externo' },
  ];

  private nextId = 7;

  getLocais(): LocalDescarga[] {
    return [...LOCAIS];
  }

  getAll(): Product[] {
    return [...this.products];
  }

  add(
    nome: string,
    codigoEan: string,
    localDescargaId: number): void {
    const local = LOCAIS.find(l => l.id === localDescargaId);
    this.products.push({
      id: this.nextId++,
      nome,
      codigoEan,
      localDescargaId,
      localDescarga: local?.nome ?? '',
    });
  }

  update(
    id: number,
    nome: string,
    codigoEan: string,
    localDescargaId: number): void {
    const local = LOCAIS.find(l => l.id === localDescargaId);
    const idx = this.products.findIndex(p => p.id === id);

    if (idx !== -1) {
      this.products[idx] = { id, nome, codigoEan, localDescargaId, localDescarga: local?.nome ?? '' };
    }
  }

  delete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}