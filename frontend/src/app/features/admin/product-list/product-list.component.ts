import { Component, computed, inject, model, Signal } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HashRateService } from '../../../services/hashrate.service';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly hashRateService = inject(HashRateService);
  products: Signal<Product[] | null>;

  searchTerm = model<string>('');

  filteredProducts = computed(() => {
    const term = this.searchTerm();
    if (!term) {
      return this.products();
    }
    return this.products()?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  });

  deactivateProduct(product: Product) {
    this.productService.deactivateProduct(product.id);
  }

  activateProduct(product: Product) {
    this.productService.activateProduct(product.id);
  }

  fetchHashTime(product: Product) {
    const hashTime = this.hashRateService.resolveHashTime(product.priceUSD);
    return hashTime;
  }

  constructor() {
    this.products = this.productService.getProducts();
  }
}
