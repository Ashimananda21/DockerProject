
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const itemPrice = product.discountPrice || product.price;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="flex py-6 border-b">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border rounded-md">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between">
            <Link 
              to={`/product/${product.id}`}
              className="text-sm font-medium text-gray-700 hover:text-shopping-primary"
            >
              {product.name}
            </Link>
            <p className="ml-4 text-sm font-medium text-shopping-primary">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {product.category}
          </p>
          {product.discountPrice && (
            <div className="mt-1 text-xs text-gray-500">
              <span className="line-through">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-red-500">${product.discountPrice.toFixed(2)} each</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
