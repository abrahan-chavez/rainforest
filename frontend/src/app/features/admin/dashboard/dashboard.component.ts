import { Component, computed, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { Order } from '../../../models/order';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly productsService = inject(ProductService);
  private readonly orderService = inject(OrderService);

  private products: Signal<Product[] | null>;
  private orders: Signal<Order[] | null>;

  productsCount = computed(() => {
    const products = this.products();
    return products ? products.length : 0;
  });

  ordersCount = computed(() => {
    const orders = this.orders();
    return orders ? orders.length : 0;
  });

  constructor() {
    this.products = this.productsService.getProducts();
    this.orders = this.orderService.getOrders();
  }
}
