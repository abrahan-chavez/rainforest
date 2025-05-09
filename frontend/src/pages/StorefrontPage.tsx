import React from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { useStore } from '../context/StoreContext';
import { SearchIcon, XIcon, ZapIcon } from 'lucide-react';
export const StorefrontPage = () => {
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery
  } = useStore();
  return <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Welcome to Rainforest
          </h1>
          <p className="text-blue-100 max-w-lg">
            Mine for it, don't buy it. Pay with hashpower instead of money! Our
            revolutionary platform lets you exchange your computing power for
            products.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3 shadow-inner">
          <ZapIcon size={24} className="text-white/80" />
          <div>
            <p className="font-medium">Current Hash Price:</p>
            <p className="text-sm">22 Trillion hashes ≈ $1 USD</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Available Products</h2>
        {searchQuery && <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <SearchIcon size={16} className="text-blue-600 mr-2" />
            <p className="text-sm text-slate-700">
              Showing results for{' '}
              <span className="font-medium">"{searchQuery}"</span>
            </p>
            <button onClick={() => setSearchQuery('')} className="ml-2 p-1 rounded-full hover:bg-blue-100" aria-label="Clear search">
              <XIcon size={14} className="text-blue-600" />
            </button>
          </div>}
      </div>
      {filteredProducts.length === 0 ? <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <SearchIcon size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-xl text-slate-600 mb-3">
            No products found matching "{searchQuery}"
          </p>
          <button onClick={() => setSearchQuery('')} className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
            Clear search
          </button>
        </div> : <ProductGrid products={filteredProducts} />}
    </div>;
};