import { Component, inject, Signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  private readonly productService = inject(ProductService);
  products: Signal<Product[]>;

  constructor() {
    this.products = this.productService.getProducts();
  }
}
