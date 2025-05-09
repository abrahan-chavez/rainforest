import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
export const AdminProductsPage = () => {
  const {
    products,
    deleteProduct
  } = useStore();
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };
  return <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <Link to="/admin/products/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <PlusIcon size={16} className="mr-2" />
          Add Product
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {products.map(product => <li key={product.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="h-12 w-12 rounded object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        ${product.priceUSD} ·{' '}
                        {product.hashesRequired.toLocaleString()} hashes
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to={`/admin/products/edit/${product.id}`} className="inline-flex items-center p-2 border border-transparent rounded-md text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                      <PencilIcon size={16} />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="inline-flex items-center p-2 border border-transparent rounded-md text-sm text-slate-500 hover:text-red-600 hover:bg-red-50">
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
    </div>;
};