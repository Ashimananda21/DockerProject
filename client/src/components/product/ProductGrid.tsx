
import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
}) => {
  if (products.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      )}
      <div className={className}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
