import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  productId = computed(() => this.route.snapshot.paramMap.get('productId'));
  product = this.productService.getProduct(this.productId() ?? '');

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
