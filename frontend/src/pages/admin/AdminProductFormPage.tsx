import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowLeftIcon } from 'lucide-react';
export const AdminProductFormPage = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const {
    getProduct,
    createProduct,
    updateProduct
  } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceUSD: '',
    priceInAcceptedShares: '',
    image: ''
  });
  useEffect(() => {
    if (id) {
      const product = getProduct(id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          priceUSD: product.priceUSD.toString(),
          priceInAcceptedShares: product.priceInAcceptedShares.toString(),
          image: product.image
        });
      }
    }
  }, [id, getProduct]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      priceUSD: parseFloat(formData.priceUSD),
      priceInAcceptedShares: parseInt(formData.priceInAcceptedShares),
      image: formData.image
    };
    if (id) {
      updateProduct(id, productData);
    } else {
      createProduct(productData);
    }
    navigate('/admin/products');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate('/admin/products')} className="mr-4 p-2 text-slate-400 hover:text-slate-500">
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">
            {id ? 'Edit Product' : 'New Product'}
          </h1>
        </div>
      </div>
      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Product Name
            </label>
            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea name="description" id="description" required rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="priceUSD" className="block text-sm font-medium text-slate-700">
                Price (USD)
              </label>
              <input type="number" name="priceUSD" id="priceUSD" required min="0" step="0.01" value={formData.priceUSD} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="hashesRequired" className="block text-sm font-medium text-slate-700">
                Required Shares
              </label>
              <input type="number" name="hashesRequired" id="hashesRequired" required min="0" value={formData.hashesRequired} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-slate-700">
              Image URL
            </label>
            <input type="url" name="image" id="image" required value={formData.image} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => navigate('/admin/products')} className="mr-3 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-800">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {id ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>;
};