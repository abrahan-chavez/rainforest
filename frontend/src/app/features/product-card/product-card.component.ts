import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { HashRateService } from '../../services/hashrate.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  private readonly hashRateService = inject(HashRateService);

  fetchHashTime() {
    const hashTime = this.hashRateService.resolveHashTime(this.product().priceUSD);
    return hashTime;
  }
}
