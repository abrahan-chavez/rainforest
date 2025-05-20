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
  {
    path: 'admin/sign-in',
    loadComponent: () =>
      import('./features/admin/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'admin/orders',
    loadComponent: () =>
      import('./features/admin/order-list/order-list.component').then(
        (m) => m.OrderListComponent
      ),
  },
  {
    path: 'admin/products',
    loadComponent: () =>
      import('./features/admin/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'admin/products/create',
    loadComponent: () =>
      import('./features/admin/create-product/create-product.component').then(
        (m) => m.CreateProductComponent
      ),
  },
  {
    path: 'admin/products/edit/:productId',
    loadComponent: () =>
      import('./features/admin/update-product/update-product.component').then(
        (m) => m.UpdateProductComponent
      ),
  },
];
