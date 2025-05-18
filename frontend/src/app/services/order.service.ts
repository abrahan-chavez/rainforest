import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { BaseService } from './base.service';
import { CreateOrderRequest, Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  private httpClient = inject(HttpClient);

  private orders = signal<Order[]>([]);

  private list() {
    this.httpClient.get<Order[]>(`${this.baseUrl}/orders`).subscribe({
      next: (response) => {
        this.orders.set(response);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  getOrders(): Signal<Order[]> {
    this.list();
    return this.orders.asReadonly();
  }

  getOrder(orderId: string) {
    return this.httpClient.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  createOrder(order: CreateOrderRequest) {
    return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
  }

  markOrderShipped(orderId: string) {
    this.httpClient
      .post<Order>(`${this.baseUrl}/orders/${orderId}/ship`, {})
      .subscribe({
        next: (response) => {
          this.list();
        },
        error: (error) => {
          console.error('Error marking order as shipped:', error);
        },
      });
  }
}
