import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './supplier-form.html',
})
export class SupplierForm {

  supplierForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService
  ) {
    this.supplierForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.supplierForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  maskCnpj(event: Event): void {
    const input = event.target as HTMLInputElement;
    let v = input.value.replace(/\D/g, '').slice(0, 14);
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
    input.value = v;
    this.supplierForm.get('cnpj')?.setValue(v, { emitEvent: false });
  }

  onSubmit(): void {
    this.supplierForm.markAllAsTouched();
    if (this.supplierForm.invalid) return;

    this.submitting = true;

    const { nome, cnpj } = this.supplierForm.value;
    this.supplierService.add(nome, cnpj);

    setTimeout(() => {
      this.submitting = false;
      this.router.navigate(['/dashboard/suppliers']);
    }, 800);
  }
}