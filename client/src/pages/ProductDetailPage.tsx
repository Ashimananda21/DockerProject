
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import ProductGrid from '@/components/product/ProductGrid';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Package, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Product } from '@/types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
    
    // Reset state when product changes
    setQuantity(1);
    setActiveImageIndex(0);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const nextImage = () => {
    if (product) {
      setActiveImageIndex((activeImageIndex + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const calculateDiscount = () => {
    if (product.discountPrice) {
      const discount = ((product.price - product.discountPrice) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-sm text-gray-500">
            <Link to="/" className="hover:text-shopping-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-shopping-primary">Products</Link>
            <span className="mx-2">/</span>
            <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-shopping-primary">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-lg aspect-square mb-4 border">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discountPrice && (
                  <Badge className="bg-red-500">-{calculateDiscount()}% OFF</Badge>
                )}
                {product.new && (
                  <Badge className="bg-shopping-secondary">New</Badge>
                )}
                {product.bestSeller && (
                  <Badge className="bg-shopping-accent">Best Seller</Badge>
                )}
              </div>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index
                      ? 'border-shopping-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 fill-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {product.numReviews} Reviews
              </span>
            </div>

            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-shopping-primary">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500">
                    {calculateDiscount()}% OFF
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold text-shopping-primary">
                  ${product.price.toFixed(2)}
                </span>
              )}
              
              <div className="flex items-center mt-2 text-green-600">
                <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                <span className="text-sm font-medium">In Stock</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center border rounded-md w-32">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      id="quantity"
                      className="w-full border-0 text-center focus:outline-none focus:ring-0"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  className="bg-shopping-primary hover:bg-shopping-primary/90 px-8"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex">
                <div className="mr-3 text-shopping-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-3 text-shopping-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.numReviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 border rounded-b-md">
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold mb-4">About {product.name}</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac eros vel urna tincidunt rutrum. Phasellus 
                  elementum condimentum sapien, in pharetra urna facilisis in. Fusce consectetur lobortis justo, ac hendrerit 
                  urna interdum in.
                </p>
                <p>
                  Donec tristique magna sed risus faucibus, ut ultricies elit pharetra. Nam sagittis pharetra enim, ac tempus
                  nisl fermentum vitae. Sed eget tincidunt enim, eu ultrices massa. Nullam placerat lorem sit amet enim suscipit,
                  eget vestibulum eros varius.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="p-6 border rounded-b-md">
              <div>
                <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">General Information</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Brand</span>
                        <span className="font-medium">ShopSpark</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Model</span>
                        <span className="font-medium">SP-{product.id}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{product.category}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Warranty</span>
                        <span className="font-medium">1 Year</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technical Details</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Material</span>
                        <span className="font-medium">Premium Quality</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Weight</span>
                        <span className="font-medium">0.75 kg</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Dimensions</span>
                        <span className="font-medium">12 x 5 x 8 in</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Country of Origin</span>
                        <span className="font-medium">United States</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 border rounded-b-md">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
                      <div className="text-5xl font-bold text-shopping-primary mb-2">
                        {product.rating.toFixed(1)}
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 fill-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        Based on {product.numReviews} reviews
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => {
                        // Calculate a percentage for each star rating (mock data)
                        const percentage = star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2;
                        
                        return (
                          <div key={star} className="flex items-center">
                            <div className="flex items-center w-20">
                              <span className="text-sm text-gray-600 mr-2">{star}</span>
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-16 text-right text-sm text-gray-600">
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <div className="mb-8">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <h5 className="font-medium mb-2">Excellent product, exceeded expectations!</h5>
                    <p className="text-gray-700 mb-3">
                      This product is amazing. The quality is outstanding and it works perfectly for my needs.
                      I would highly recommend it to anyone looking for a reliable solution.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-shopping-primary">
                        Helpful (12)
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        Report
                      </Button>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h4 className="font-medium">Jane Smith</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">Verified Purchase</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <h5 className="font-medium mb-2">Very good but has some minor issues</h5>
                    <p className="text-gray-700 mb-3">
                      Overall I'm very happy with this purchase. The product is well-built and looks great.
                      The only issue I had was with the setup which was a bit complicated, but once I figured it out
                      it works perfectly.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-shopping-primary">
                        Helpful (8)
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        Report
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button variant="outline">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
