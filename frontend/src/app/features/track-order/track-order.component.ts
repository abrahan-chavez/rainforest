import { Component, computed, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-track-order',
  imports: [RouterModule, FormsModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {
  orderId = model<string | null>(null);

  router = inject(Router);

  invalid = computed(() => {
    return !this.orderId();
  });

  trackOrder() {
    if (this.orderId()) {
      this.router.navigate(['/order/track/', this.orderId()]);
    }
  }
}
