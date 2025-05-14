import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/product';

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

  getProducts() : Signal<Product[]> {
    this.list();
    return this.products.asReadonly();
  }
}
