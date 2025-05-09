import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { DollarSignIcon, ZapIcon } from 'lucide-react';
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  priceInAcceptedShares: number;
  priceUSD: number;
}
export const ProductCard = ({
  id,
  name,
  image,
  priceInAcceptedShares,
  priceUSD
}: ProductCardProps) => {
  const formatHashes = (hashes: number) => {
    if (hashes >= 1000000) {
      return `${(hashes / 1000000).toFixed(1)}M`;
    }
    if (hashes >= 1000) {
      return `${(hashes / 1000).toFixed(1)}K`;
    }
    return hashes.toString();
  };
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>
        <div className="mt-auto space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <ZapIcon size={16} className="mr-2 text-blue-600 flex-shrink-0" />
            <span className="truncate font-medium">
              {formatHashes(priceInAcceptedShares)} shares
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSignIcon size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">${priceUSD.toFixed(2)} equivalent</span>
          </div>
          <Link to={`/product/${id}`} className="mt-4 block w-full py-2.5 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View Details
          </Link>
        </div>
      </div>
    </div>;
};