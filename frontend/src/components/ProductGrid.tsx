import React from 'react';
import { ProductCard } from './ProductCard';
interface Product {
  id: string;
  name: string;
  image: string;
  hashesRequired: number;
  priceUSD: number;
}
interface ProductGridProps {
  products: Product[];
}
export const ProductGrid = ({
  products
}: ProductGridProps) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => <div key={product.id} className="flex">
          <ProductCard id={product.id} name={product.name} image={product.image} hashesRequired={product.hashesRequired} priceUSD={product.priceUSD} />
        </div>)}
    </div>;
};