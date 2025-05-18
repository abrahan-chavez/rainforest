import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CreateOrderRequest, Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  private httpClient = inject(HttpClient);

  getOrder(orderId: string) {
    return this.httpClient.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  createOrder(order: CreateOrderRequest) {
    return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
  }
}
