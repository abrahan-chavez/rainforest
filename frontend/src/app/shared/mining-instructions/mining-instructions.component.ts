import { Component, computed, input } from '@angular/core';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mining-instructions',
  imports: [CommonModule],
  templateUrl: './mining-instructions.component.html',
  styleUrl: './mining-instructions.component.css',
})
export class MiningInstructionsComponent {
  order = input.required<Order>();

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
