import { Component, computed, inject, model, Signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order, OrderStatus } from '../../../models/order';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  private readonly orderService = inject(OrderService);
  orders: Signal<Order[] | null>;

  searchTerm = model<string>('');

  filteredOrders = computed(() => {
    const term = this.searchTerm();
    if (!term) {
      return this.orders();
    }
    return this.orders()?.filter((order) =>
      order.id.toLowerCase().includes(term.toLowerCase())
    );
  });

  constructor() {
    this.orders = this.orderService.getOrders();
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

  markOrderShipped(order: Order) {
    this.orderService.markOrderShipped(order.id);
  }
}
