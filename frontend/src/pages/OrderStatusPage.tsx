import React from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatusChecker } from '../components/OrderStatusChecker';
export const OrderStatusPage = () => {
  const {
    getOrder,
    getProduct
  } = useStore();
  const handleOrderCheck = (orderId: string) => {
    const order = getOrder(orderId);
    if (!order) {
      return {
        found: false
      };
    }
    const product = getProduct(order.productId);
    return {
      found: true,
      order: {
        ...order,
        productName: product?.name || 'Unknown Product'
      }
    };
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Status</h1>
      <div className="max-w-2xl mx-auto">
        <OrderStatusChecker onCheck={handleOrderCheck} />
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">
                How do I find my order ID?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Your order ID was provided on the checkout confirmation page and
                sent to your email address.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                My mining progress seems stuck
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Ensure your mining software is properly connected and submitting
                shares. The progress updates every few minutes.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                How long does shipping take?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Once mining is complete, orders are typically processed within
                1-2 business days and shipped according to the selected shipping
                method.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                Can I mine for multiple items at once?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Each order has a unique worker name. You can mine for multiple
                items by configuring your mining software with different worker
                names.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};