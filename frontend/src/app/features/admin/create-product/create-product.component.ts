import { Component, computed, inject, model } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CreateProductRequest } from '../../../models/product';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HashRateService } from '../../../services/hashrate.service';

@Component({
  selector: 'app-create-product',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  private readonly hashRateService = inject(HashRateService);
  productName = model<string>('');
  productPrice = model<number>(0);
  productDescription = model<string>('');
  productImageUrl = model<string>('');
  shippingRequired = model<boolean>(false);
  stockQuantity = model<number>(0);

  valid = computed(() => {
    return (
      this.productName() !== '' &&
      this.productPrice() > 0 &&
      this.stockQuantity() > 0 &&
      this.productDescription() !== ''
    );
  });

  hashTime = computed(() => {
    const priceUsd = this.productPrice();
    if (priceUsd > 0) {
      return this.fetchHashTime(priceUsd);
    }
    return 0;
  });

  fetchHashTime(priceUsd: number) {
    const hashTime = this.hashRateService.resolveHashTime(priceUsd);
    return hashTime;
  }

  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  createProduct() {
    const createProductRequest = {
      name: this.productName(),
      priceUsd: this.productPrice(),
      stockQuantity: this.stockQuantity(),
      image: this.productImageUrl(),
      description: this.productDescription(),
      shippingRequired: this.shippingRequired(),
    } as CreateProductRequest;

    if (!this.valid()) {
      console.error('Invalid product data');
      return;
    }

    this.productService.createProduct(createProductRequest);
    this.router.navigate(['/admin/products']);
  }
}
