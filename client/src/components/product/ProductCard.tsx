
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const calculateDiscount = () => {
    if (product.discountPrice) {
      const discount = ((product.price - product.discountPrice) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.discountPrice && (
            <Badge className="bg-red-500">-{calculateDiscount()}%</Badge>
          )}
          {product.new && (
            <Badge className="bg-shopping-secondary">New</Badge>
          )}
          {product.bestSeller && (
            <Badge className="bg-shopping-accent">Best Seller</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-1 flex items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="mx-1.5 text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{product.numReviews} reviews</span>
          </div>

          <h3 className="mb-1 text-sm font-medium text-gray-700 line-clamp-1">
            {product.name}
          </h3>

          <div className="mb-3 flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-base font-bold text-shopping-primary">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-shopping-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-shopping-primary hover:bg-shopping-primary/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
