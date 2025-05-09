import React, { useState } from 'react';
import { SearchIcon, PackageIcon, TruckIcon, ZapIcon, XCircleIcon } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
interface OrderStatusCheckerProps {
  onCheck: (orderId: string) => {
    found: boolean;
    order?: any;
  };
}
export const OrderStatusChecker = ({
  onCheck
}: OrderStatusCheckerProps) => {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<null | {
    found: boolean;
    order?: any;
  }>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }
    setError('');
    setIsChecking(true);
    // Simulate a short delay
    setTimeout(() => {
      const checkResult = onCheck(orderId);
      setResult(checkResult);
      setIsChecking(false);
      if (!checkResult.found) {
        setError('No order found with this ID');
      }
    }, 800);
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'mining':
        return <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
            <ZapIcon size={14} className="mr-1" />
            Mining in Progress
          </span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
            <PackageIcon size={14} className="mr-1" />
            Mining Complete
          </span>;
      case 'shipped':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
            <TruckIcon size={14} className="mr-1" />
            Shipped
          </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium">
            Unknown
          </span>;
    }
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <PackageIcon size={24} className="text-blue-600 mr-3" />
        <h2 className="text-xl font-medium">Track Your Order</h2>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your order ID
        </label>
        <div className="flex">
          <input id="orderId" type="text" placeholder="e.g. order_1234" value={orderId} onChange={e => setOrderId(e.target.value)} className={`flex-grow px-4 py-2.5 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-300' : 'border-gray-300'}`} />
          <button type="submit" disabled={isChecking} className={`px-4 py-2.5 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isChecking ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isChecking ? 'Checking...' : 'Track'}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
      {result && result.found && <div className="border border-gray-200 rounded-lg p-5 animate-fade-in">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="font-medium text-lg">
                {result.order.productName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Order ID: <span className="font-mono">{result.order.id}</span>
              </p>
            </div>
            <div>{getStatusLabel(result.order.status)}</div>
          </div>
          <div className="mb-5">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Mining Progress:
            </p>
            <ProgressBar progress={result.order.progress} />
          </div>
          {result.order.status === 'mining' && <div className="text-sm bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="font-medium text-amber-800 mb-1">
                Mining in Progress
              </p>
              <p className="text-amber-700">
                Continue mining with your worker to complete your order. Your
                product will be prepared once mining is complete.
              </p>
            </div>}
          {result.order.status === 'completed' && <div className="text-sm bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="font-medium text-green-800 mb-1">
                Mining Complete!
              </p>
              <p className="text-green-700">
                Your order is being processed for fulfillment and will ship
                soon.
              </p>
            </div>}
          {result.order.status === 'shipped' && <div className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="font-medium text-blue-800 mb-1">Order Shipped!</p>
              <p className="text-blue-700">
                Your order is on its way to you. Expected delivery in 3-5
                business days.
              </p>
            </div>}
        </div>}
    </div>;
};