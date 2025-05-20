import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HashRateService } from '../../services/hashrate.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly hashRateService = inject(HashRateService);

  productId = computed(() => this.route.snapshot.paramMap.get('productId'));
  product = this.productService.getProduct(this.productId() ?? '');

  fetchHashTime() {
    const hashTime = this.hashRateService.resolveHashTime(this.product()!.priceUSD);
    return hashTime;
  }
}
