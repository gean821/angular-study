import { Injectable } from '@angular/core';

export interface Supplier {
  id: number;
  nome: string;
  cnpj: string;
  initials: string;
  color: string;
}

const COLORS = ['#60a5fa','#34d399','#fbbf24','#a78bfa','#f472b6','#fb923c','#2dd4bf','#e879f9'];

@Injectable({ providedIn: 'root' })
export class SupplierService {

  private suppliers: Supplier[] = [
    { id: 1, nome: 'Transportes Paulista Ltda.',    cnpj: '12.345.678/0001-90', initials: 'TP', color: COLORS[0] },
    { id: 2, nome: 'Frigorífico Sul Alimentos S/A', cnpj: '98.765.432/0001-12', initials: 'FS', color: COLORS[1] },
    { id: 3, nome: 'Construtora Horizonte EIRELI',  cnpj: '45.678.901/0001-34', initials: 'CH', color: COLORS[2] },
  ];

  private nextId = 4;

  getAll(): Supplier[] {
    return [...this.suppliers];
  }

  add(nome: string, cnpj: string): void {
    const initials = nome
      .split(' ')
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');

    const color = COLORS[this.nextId % COLORS.length];

    this.suppliers.push({ id: this.nextId++, nome, cnpj, initials, color });
  }

  delete(id: number): void {
    this.suppliers = this.suppliers.filter(s => s.id !== id);
  }
}