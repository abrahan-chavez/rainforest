import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { HashRateService } from '../../services/hashrate.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  private readonly hashRateService = inject(HashRateService);
  private readonly router = inject(Router);

  fetchHashTime() {
    const hashTime = this.hashRateService.resolveHashTime(this.product().priceUSD);
    return hashTime;
  }

  onBuy(productId: string) {
    // Navigate to the product detail / purchase page
    this.router.navigate(['/products', productId]);
  }
}
