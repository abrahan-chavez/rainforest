import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'products/:productId',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'order/create/:productId',
    loadComponent: () =>
      import('./features/create-order/create-order.component').then(
        (m) => m.CreateOrderComponent
      ),
  },
  {
    path: 'order/track',
    loadComponent: () =>
      import('./features/track-order/track-order.component').then(
        (m) => m.TrackOrderComponent
      ),
  },
  {
    path: 'order/track/:orderId',
    loadComponent: () =>
      import('./features/order-status/order-status.component').then(
        (m) => m.OrderStatusComponent
      ),
  },
];
