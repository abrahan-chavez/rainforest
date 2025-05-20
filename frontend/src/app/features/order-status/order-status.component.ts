import { Component, computed, inject, Signal, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Order, OrderStatus } from '../../models/order';
import { CommonModule } from '@angular/common';
import { MiningInstructionsComponent } from '../../shared/mining-instructions/mining-instructions.component';
import { HashRateService } from '../../services/hashrate.service';

@Component({
  selector: 'app-order-status',
  imports: [CommonModule, RouterModule, MiningInstructionsComponent],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css',
})
export class OrderStatusComponent {
  private readonly orderService = inject(OrderService);
  private readonly route = inject(ActivatedRoute);
  private readonly hashRateService = inject(HashRateService);

  order = signal<Order | null>(null);
  error = signal<string | null>(null);

  constructor() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.fetchOrder(orderId);

      setInterval(() => {
        if (this.order()) {
          this.fetchOrder(orderId);
        }
      }, 5000);
    }
  }

  fetchOrder(orderId: string) {
    this.orderService.getOrder(orderId).subscribe({
      next: (order) => {
        this.order.set(order);
        this.error.set(null);
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

  fetchStyleForStatus(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Created:
        return 'badge-info';
      case OrderStatus.Mining:
        return 'badge-warning';
      case OrderStatus.Completed:
        return 'badge-success';
      case OrderStatus.Shipped:
        return 'badge-success';
      default:
        return '';
    }
  }

  formatHashes(hashes: number) {
    return this.hashRateService.resolveHashTimeFromHashes(hashes) / 1e12 / 86400;
  }
}
