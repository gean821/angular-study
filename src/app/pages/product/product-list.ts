import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { LocalDescarga } from '../../models/unloadingLocation';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {

  searchQuery = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  currentPage = 1;
  itemsPerPage = 9;

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  modalOpen = false;
  submitting = false;
  editingProduct: Product | null = null;

  locais: LocalDescarga[] = [];

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService
      .getLocais()
      .subscribe(locais => {
        this.locais = locais;
        this.load();
      });

    this.buildForm();
  }

  load(): void {
    this.productService
      .getAll()
      .subscribe(products => {

        this.products = products.map(p => {
          const local = this.locais
            .find(l => l.id === p.localDescargaId);

          return {
            ...p,
            localDescarga: local ? local.nome : 'Sem local'
          };
        });

        this.applyFilter();
      });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase().trim();

    this.filteredProducts = this.products.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      (p.codigoEan ?? '').toLowerCase().includes(q) ||
      (p.localDescarga ?? '').toLowerCase().includes(q)
    );

    this.currentPage = 1;
  }

  delete(product: Product): void {
    if (confirm(`Remover "${product.nome}"?`)) {
      this.productService.delete(product.id)
        .subscribe(() => {
          this.load();
        });
    }
  }

  private buildForm(): void {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigoEan: [''],
      localDescargaId: ['', Validators.required],
    });
  }

  isInvalid(field: string): boolean {
    const c = this.productForm.get(field);
    return !!(c && c.invalid && c.touched);
  }

  openCreateModal(): void {
    this.editingProduct = null;

    this.productForm.reset({
      nome: '',
      codigoEan: '',
      localDescargaId: ''
    });

    this.modalOpen = true;
  }

  openEditModal(product: Product): void {
    this.editingProduct = product;

    this.productForm.reset({
      nome: product.nome,
      codigoEan: product.codigoEan,
      localDescargaId: product.localDescargaId,
    });

    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.editingProduct = null;
  }

  onSubmit(): void {
    this.productForm.markAllAsTouched();

    if (this.productForm.invalid) {
      return;
    }

    this.submitting = true;

    const { nome, codigoEan, localDescargaId } = this.productForm.value;

    const payload = {
      nome,
      codigoEan: codigoEan ?? '',
      localDescargaId: +localDescargaId
    };

    if (this.editingProduct) {
      this.productService
        .update(this.editingProduct.id, payload)
        .subscribe(() => this.afterSave());

    } else {
      this.productService
        .add(payload)
        .subscribe(() => this.afterSave());
    }
  }

  private afterSave(): void {
    this.submitting = false;
    this.closeModal();
    this.load();
  }
}