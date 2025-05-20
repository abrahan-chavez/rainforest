import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { BaseService } from './base.service';
import { CreateProductRequest, Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  private httpClient = inject(HttpClient);
  private products = signal<Product[]>([]);

  private list() {
    this.httpClient.get<Product[]>(`${this.baseUrl}/products`).subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  getProducts(): Signal<Product[]> {
    this.list();
    return this.products.asReadonly();
  }

  deactivateProduct(productId: string) {
    this.httpClient
      .post<Product>(`${this.baseUrl}/products/${productId}/deactivate`, {})
      .subscribe({
        next: (response) => {
          this.list();
        },
        error: (error) => {
          console.error('Error deactivating product:', error);
        },
      });
  }

  activateProduct(productId: string) {
    this.httpClient
      .post<Product>(`${this.baseUrl}/products/${productId}/activate`, {})
      .subscribe({
        next: (response) => {
          this.list();
        },
        error: (error) => {
          console.error('Error activate product:', error);
        },
      });
  }

  getProduct(productId: string) {
    this.list();
    return computed(() => {
      const products = this.products();
      return products.find((p) => p.id === productId) ?? null;
    });
  }

  createProduct(product: CreateProductRequest) {
    this.httpClient
      .post<Product>(`${this.baseUrl}/products`, product)
      .subscribe({
        next: (response) => {
          this.products.update((products) => [...products, response]);
        },
        error: (error) => {
          console.error('Error creating product:', error);
        },
      });
  }

  updateProduct(productId: string, product: CreateProductRequest) {
    this.httpClient
      .put<Product>(`${this.baseUrl}/products/${productId}`, product)
      .subscribe({
        next: (response) => {
          this.list();
        },
        error: (error) => {
          console.error('Error creating product:', error);
        },
      });
  }
}
