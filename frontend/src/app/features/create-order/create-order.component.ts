import { Component, computed, inject, signal } from '@angular/core';
import { Order } from '../../models/order';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './create-form/create-form.component';
import { MiningInstructionsComponent } from '../../shared/mining-instructions/mining-instructions.component';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule, RouterModule, CreateFormComponent, MiningInstructionsComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  productId = computed(() => this.route.snapshot.paramMap.get('productId'));
  product = this.productService.getProduct(this.productId() ?? '');

  order = signal<Order | null>(null);

  config = computed(() => {
    const order = this.order();
    if (order) {
      // format as json:
      return `{
  "url": "${order.stratumUrl}",
  "user": "${order.workerName}",
  "pass": ${order.password},  
}`;
    }
    return null;
  });

  onSuccessfulOrder(order: any) {
    this.order.set(order);
  }

  copiedStratum = false;
  copiedWorker = false;
  copiedConfig = false;

  copyToClipboard(
    value: string | undefined | null,
    type: 'stratum' | 'worker' | 'config'
  ) {
    navigator.clipboard.writeText(value || '');
    if (type === 'stratum') {
      this.copiedStratum = true;
      setTimeout(() => (this.copiedStratum = false), 1500);
    } else if (type === 'worker') {
      this.copiedWorker = true;
      setTimeout(() => (this.copiedWorker = false), 1500);
    } else if (type === 'config') {
      this.copiedConfig = true;
      setTimeout(() => (this.copiedConfig = false), 1500);
    }
  }
}
