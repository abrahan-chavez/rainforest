import { Component, computed, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './create-form/create-form.component';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule, RouterModule, CreateFormComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  private readonly orderService = inject(OrderService);
  private readonly productService = inject(ProductService);

  private readonly route = inject(ActivatedRoute);
  productId = computed(() => this.route.snapshot.paramMap.get('productId'));

  product = this.productService.getProduct(this.productId() ?? '');

  order = signal<Order | null>(null);

  onSuccessfulOrder(order: any) {
    console.log('Order created successfully:', order);
    this.order.set(order);
  }
}
