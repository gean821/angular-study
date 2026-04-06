import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './supplier-list.html',
})
export class SupplierList implements OnInit {

  searchQuery = '';
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.searchQuery = '';
    this.load();
}

 load(): void {
  this.supplierService.getAll().subscribe(data => {
    this.suppliers = data;
    this.applyFilter();
  });
}

  applyFilter(): void {
    const q = (this.searchQuery || '').toLowerCase().trim();

    this.filteredSuppliers = this.suppliers.filter(s =>
      s.nome.toLowerCase().includes(q) || s.cnpj.includes(q)
    );
  }

  delete(supplier: Supplier): void {
    if (confirm(`Remover "${supplier.nome}"?`)) {
      this.supplierService.delete(supplier.id).subscribe(() => {
        this.load();
      });
    }
  }

  testUpdate(supplier: Supplier): void {
    const updated = {
      ...supplier,
      nome: supplier.nome + ' (EDITADO)'
    };

    this.supplierService.update(supplier.id, updated).subscribe(() => {
      console.log('Atualizado!');
      this.load();
    });
  }
}