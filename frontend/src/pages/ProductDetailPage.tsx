import React, { lazy } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { DollarSignIcon, ArrowLeftIcon, ZapIcon, ShieldIcon, TruckIcon } from 'lucide-react';
export const ProductDetailPage = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    getProduct
  } = useStore();
  const product = getProduct(id || '');
  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6 text-gray-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <ArrowLeftIcon size={16} className="mr-2" />
          Back to Store
        </Link>
      </div>;
  }
  const formatHashes = (hashes: number) => {
    if (hashes >= 1000000) {
      return `${(hashes / 1000000).toFixed(1)}M`;
    }
    if (hashes >= 1000) {
      return `${(hashes / 1000).toFixed(1)}K`;
    }
    return hashes.toString();
  };
  return <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Store
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full flex items-center">
                <ZapIcon size={16} className="mr-1.5 text-blue-600" />
                <span className="font-medium">
                  {formatHashes(product.hashesRequired)} hashes
                </span>
              </div>
              <div className="text-gray-600 flex items-center">
                <DollarSignIcon size={16} className="mr-1.5" />
                <span>${product.priceUSD.toFixed(2)} equivalent</span>
              </div>
            </div>
            <div className="border-t border-b border-gray-200 py-5 my-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-lg mb-6 shadow-inner">
              <h3 className="font-medium mb-3 flex items-center">
                <ZapIcon size={18} className="mr-2 text-blue-600" />
                How Mining Works
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Instead of paying with money, you'll contribute computing power
                to mine this item. After clicking "Mine to Purchase", you'll
                receive instructions to connect your mining software.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                <div className="flex items-center">
                  <ShieldIcon size={14} className="mr-1.5 text-blue-600" />
                  <span>Secure Mining</span>
                </div>
                <div className="flex items-center">
                  <TruckIcon size={14} className="mr-1.5 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
            <button onClick={() => navigate(`/checkout/${product.id}`)} className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
              <ZapIcon size={18} className="mr-2" />
              Mine to Purchase
            </button>
          </div>
        </div>
      </div>
    </div>;
};