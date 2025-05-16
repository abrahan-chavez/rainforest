import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'order/create/:productId',
    loadComponent: () =>
      import('./features/create-order/create-order.component').then(
        (m) => m.CreateOrderComponent
      ),
  },
  {
    path: 'order/:id',
    loadComponent: () =>
      import('./features/order-status/order-status.component').then(
        (m) => m.OrderStatusComponent
      ),
  },
];
