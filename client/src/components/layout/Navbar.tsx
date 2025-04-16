
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = [
  { name: 'Electronics', href: '/products/electronics' },
  { name: 'Fashion', href: '/products/fashion' },
  { name: 'Home & Lifestyle', href: '/products/home-lifestyle' },
  { name: 'Books', href: '/products/books' },
  { name: 'Sports', href: '/products/sports' },
];

const Navbar = () => {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col h-full">
                <div className="px-2 py-4">
                  <Link to="/" className="text-xl font-bold text-shopping-primary">
                    ShopSpark
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => document.body.click()}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex flex-col px-2 py-2 space-y-1">
                  <p className="px-3 py-2 text-sm font-medium text-gray-500">
                    Categories
                  </p>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                      onClick={() => document.body.click()}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col px-2 py-2 mt-auto space-y-1">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium text-gray-500">
                        Hello, {user?.name}
                      </div>
                      <Link
                        to="/account"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                        onClick={() => document.body.click()}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Account
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                        onClick={() => document.body.click()}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          document.body.click();
                        }}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                        onClick={() => document.body.click()}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                        onClick={() => document.body.click()}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-shopping-primary">ShopSpark</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-shopping-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-shopping-primary">
              All Products
            </Link>
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-sm font-medium text-gray-700 hover:text-shopping-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, Profile */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-shopping-primary rounded-full">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    Hello, {user?.name}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="cursor-pointer">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Register
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      
      {/* Search panel */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full bg-white border-b shadow-lg">
          <div className="container px-4 py-4 mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-10 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-shopping-primary focus:border-transparent"
              />
              <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
