import { Component, computed, inject, model, Signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private readonly productService = inject(ProductService);
  products: Signal<Product[] | null>;
  searchTerm = model<string>('');

  filteredProducts = computed(() => {
    let allProducts = this.products();
    if (!allProducts) {
      return [];
    }
    allProducts = allProducts.filter((product) => product.isActive);
    const term = this.searchTerm();
    if (!term) {
      return allProducts;
    }
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  });

  constructor() {
    this.products = this.productService.getProducts();
  }
}
