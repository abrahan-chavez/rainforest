import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { HashRateService } from '../../../services/hashrate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateProductRequest, Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  private readonly hashRateService = inject(HashRateService);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  productId = model<string>('');
  productName = model<string>('');
  productPrice = model<number>(0);
  productDescription = model<string>('');
  productImageUrl = model<string>('');
  shippingRequired = model<boolean>(false);
  stockQuantity = model<number>(0);

  constructor() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (!productId) {
      return;
    }

    const initialProduct = this.productService.getProduct(productId);

    effect(() => {
      const product = initialProduct();
      this.setProductData(product!);
    });
  }

  setProductData(product: Product) {
    this.productId.set(product.id);
    this.productName.set(product.name);
    this.productPrice.set(product.priceUSD);
    this.productDescription.set(product.description ?? '');
    this.productImageUrl.set(product.image ?? '');
    this.shippingRequired.set(product.shippingRequired);
    this.stockQuantity.set(product.stockQuantity);
  }

  valid = computed(() => {
    return (
      this.productName() !== '' &&
      this.productPrice() > 0 &&
      this.stockQuantity() >= 0 &&
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

  submit() {
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

    this.productService.updateProduct(this.productId(), createProductRequest);
    this.router.navigate(['/admin/products']);
  }
}
