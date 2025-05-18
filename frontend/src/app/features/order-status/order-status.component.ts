import { Component, computed, inject, Signal, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MiningInstructionsComponent } from "../../shared/mining-instructions/mining-instructions.component";

@Component({
  selector: 'app-order-status',
  imports: [CommonModule, RouterModule, MiningInstructionsComponent],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css',
})
export class OrderStatusComponent {
  private readonly orderService = inject(OrderService);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  order = signal<Order | null>(null);
  error = signal<string | null>(null);

  product: Signal<Product | null> = signal<Product | null>(null);

  constructor() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrder(orderId).subscribe({
        next: (order) => {
          this.order.set(order);
          this.error.set(null);

          this.product = this.productService.getProduct(order.productId);
        },
        error: (error) => {
          if (error.status === 404) {
            this.error.set('Order not found');
          } else {
            this.error.set('An error occurred while fetching the order');
            console.error('Error fetching order:', error);
          }
        },
      });
    }
  }
}
