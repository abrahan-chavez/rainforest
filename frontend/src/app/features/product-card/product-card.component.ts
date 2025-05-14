import { Component, input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  formatHashes(hashes: number) {
    if (hashes >= 1000000) {
      return `${(hashes / 1000000).toFixed(1)}M`;
    }
    if (hashes >= 1000) {
      return `${(hashes / 1000).toFixed(1)}K`;
    }
    return hashes.toString();
  }
}
