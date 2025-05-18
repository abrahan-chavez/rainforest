import {
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CreateOrderRequest, Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'create-order-shipping-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent {
  productId = input.required<string | null>();
  shippingRequired = input.required<boolean>();
  readonly order = output<Order>();

  private readonly orderService = inject(OrderService);

  loading = signal(false);
  submitted = signal(false);

  emailAddress = model<string>('');
  fullName = model<string>('');
  streetAddress = model<string>('');
  city = model<string>('');
  state = model<string>('');
  zipCode = model<string>('');
  country = model<string>('');

  invalid = computed(() => {
    return (
      this.submitted() &&
      (!this.emailAddress() || !this.fullName() || !this.shippingValid())
    );
  });

  shippingValid = computed(() => {
    if (this.shippingRequired()) {
      return true;
    }
    return (
      !this.streetAddress() ||
      !this.city() ||
      !this.state() ||
      !this.zipCode() ||
      !this.country()
    );
  });

  onSubmit() {
    this.submitted.set(true);
    if (!this.productId()) {
      console.error('Product ID is required');
      return;
    }

    const order = {
      productId: this.productId(),
      emailAddress: this.emailAddress(),
      fullName: this.fullName(),
      streetAddress: this.streetAddress(),
      city: this.city(),
      state: this.state(),
      zipCode: this.zipCode(),
      country: this.country(),
    } as CreateOrderRequest;

    if (this.invalid()) {
      console.error('Form is invalid', order);
      return;
    }

    this.orderService.createOrder(order).subscribe((response) => {
      this.loading.set(false);
      this.submitted.set(false);
      this.order.emit(response);
    });
  }
}
