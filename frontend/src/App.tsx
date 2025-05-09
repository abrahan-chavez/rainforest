import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StorefrontPage } from './pages/StorefrontPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { StoreProvider } from './context/StoreContext';
export function App() {
  return <BrowserRouter>
      <StoreProvider>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminLoginPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/new" element={<AdminProductFormPage />} />
              <Route path="products/edit/:id" element={<AdminProductFormPage />} />
            </Route>
            {/* Public Routes */}
            <Route path="*" element={<>
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<StorefrontPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/checkout/:id" element={<CheckoutPage />} />
                      <Route path="/order-status" element={<OrderStatusPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </>} />
          </Routes>
        </div>
      </StoreProvider>
    </BrowserRouter>;
}