import React from 'react';
import { ProductCard } from './ProductCard';
interface Product {
  productId: string;
  name: string;
  image: string;
  priceInAcceptedShares: number;
  priceUSD: number;
}
interface ProductGridProps {
  products: Product[];
}
export const ProductGrid = ({
  products
}: ProductGridProps) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => <div key={product.productId} className="flex">
          <ProductCard productId={product.productId} name={product.name} image={product.image} priceInAcceptedShares={product.priceInAcceptedShares} priceUSD={product.priceUSD} />
        </div>)}
    </div>;
};