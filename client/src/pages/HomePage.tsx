
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  getFeaturedProducts, 
  getBestSellers, 
  getNewArrivals 
} from '@/data/products';
import { Truck, CreditCard, RefreshCw, Clock, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-shopping-light to-white pt-12 pb-16 md:pt-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shopping-dark">
                Shop the Latest <span className="text-shopping-primary">Tech Trends</span>
              </h1>
              <p className="text-lg mb-6 text-gray-600 max-w-md">
                Discover premium products for your lifestyle with exclusive deals and fast shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-shopping-primary hover:bg-shopping-primary/90"
                  asChild
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <Link to="/products/featured">View Featured</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Featured Products" 
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Features Banner */}
        <div className="container mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 bg-blue-50 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-shopping-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Free Shipping</h3>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 bg-blue-50 p-3 rounded-full">
                  <RefreshCw className="h-6 w-6 text-shopping-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Easy Returns</h3>
                  <p className="text-xs text-gray-500">30 day return policy</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 bg-blue-50 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-shopping-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Secure Payment</h3>
                  <p className="text-xs text-gray-500">100% secure checkout</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="flex items-center p-4">
                <div className="mr-4 bg-blue-50 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-shopping-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Support 24/7</h3>
                  <p className="text-xs text-gray-500">Always here to help</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products/featured" className="text-shopping-primary flex items-center text-sm font-medium hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products/electronics" className="group">
              <div className="relative overflow-hidden rounded-lg h-64">
                <img 
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Electronics" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Electronics</h3>
                    <p className="text-white/80 text-sm mb-3">Latest gadgets and tech</p>
                    <Button variant="secondary" size="sm">Shop Now</Button>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/products/fashion" className="group">
              <div className="relative overflow-hidden rounded-lg h-64">
                <img 
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Fashion" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Fashion</h3>
                    <p className="text-white/80 text-sm mb-3">Trendy apparel and accessories</p>
                    <Button variant="secondary" size="sm">Shop Now</Button>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/products/home-lifestyle" className="group">
              <div className="relative overflow-hidden rounded-lg h-64">
                <img 
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Home & Lifestyle" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Home & Lifestyle</h3>
                    <p className="text-white/80 text-sm mb-3">Decor and essentials</p>
                    <Button variant="secondary" size="sm">Shop Now</Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Best Sellers</h2>
            <Link to="/products/best-sellers" className="text-shopping-primary flex items-center text-sm font-medium hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 px-4 bg-shopping-primary text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Special Offer: 20% Off
              </h2>
              <p className="text-white/90 mb-6 max-w-md">
                Limited time offer on selected premium products. Don't miss out on these amazing deals!
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                asChild
              >
                <Link to="/products/sale">Shop Sale</Link>
              </Button>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Sale Ends In</p>
                  <div className="flex justify-center gap-4">
                    <div className="bg-white/20 rounded-lg p-3 w-16">
                      <div className="text-2xl font-bold">02</div>
                      <div className="text-xs">Days</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 w-16">
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 w-16">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-xs">Mins</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">Use code: <span className="font-bold">SPRING20</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
            <Link to="/products/new" className="text-shopping-primary flex items-center text-sm font-medium hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The quality of the products exceeded my expectations. Fast shipping and great customer service. Will definitely shop here again!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "I love the wide selection of products. The website is easy to navigate and checkout was a breeze. My new headphones are amazing!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Michael Torres</p>
                    <p className="text-xs text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Excellent prices and the rewards program is fantastic. I received my order earlier than expected. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Jennifer Lee</p>
                    <p className="text-xs text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Connected</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive offers and the latest product updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-shopping-primary"
            />
            <Button className="bg-shopping-primary hover:bg-shopping-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
