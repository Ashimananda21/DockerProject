
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, CreditCard, LockKeyhole } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
  const { items, total, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center max-w-lg">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">{itemCount} items in your cart</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg border p-6">
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              <div className="flex justify-between mt-6 pt-6 border-t">
                <Button variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button asChild variant="outline">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${total > 50 ? '0.00' : '4.99'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(total * 0.07).toFixed(2)}</span>
                  </div>
                  {total > 50 && (
                    <div className="flex justify-between text-green-600">
                      <span>Free Shipping</span>
                      <span>-$0.00</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${(total + (total > 50 ? 0 : 4.99) + (total * 0.07)).toFixed(2)}</span>
                </div>
                
                <Button className="w-full bg-shopping-primary hover:bg-shopping-primary/90 mb-4" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="space-y-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center">
                    <LockKeyhole className="h-4 w-4 mr-2" />
                    <span>SSL encrypted checkout</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-2">We Accept</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
