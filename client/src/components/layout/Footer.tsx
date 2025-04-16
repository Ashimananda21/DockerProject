
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 py-12 mx-auto">
        {/* Newsletter */}
        <div className="py-8 mb-8 border-b">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="max-w-md">
              <h3 className="mb-2 text-lg font-bold">Subscribe to our newsletter</h3>
              <p className="text-sm text-gray-600">
                Get the latest updates, sales and offers right to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1"
              />
              <Button className="bg-shopping-primary hover:bg-shopping-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-shopping-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/electronics" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products/fashion" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/products/home-lifestyle" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Home & Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/products/books" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Books
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-sm text-gray-600 hover:text-shopping-primary">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Orders History
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-shopping-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-shopping-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-shopping-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-0.5 text-shopping-primary" />
                <span className="ml-2 text-sm text-gray-600">
                  123 Commerce St, Shopping City, SC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 w-5 h-5 text-shopping-primary" />
                <span className="ml-2 text-sm text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 w-5 h-5 text-shopping-primary" />
                <span className="ml-2 text-sm text-gray-600">support@shopsparkapp.com</span>
              </li>
            </ul>
            <div className="flex mt-4 space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-shopping-primary hover:bg-transparent"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-shopping-primary hover:bg-transparent"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-shopping-primary hover:bg-transparent"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-shopping-primary hover:bg-transparent"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 text-center border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <Link to="/" className="text-xl font-bold text-shopping-primary">
                ShopSpark
              </Link>
              <p className="mt-1 text-sm text-gray-600">
                Your one-stop shop for all things awesome.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} ShopSpark. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
              <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
