
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import { products, getProductsByCategory } from '@/data/products';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types';
import { FilterX, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const priceRanges = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 200 },
  { min: 200, max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: Infinity },
];

const ratings = [5, 4, 3, 2, 1];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

const ProductsPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Extract unique categories from products
  useEffect(() => {
    const categories = [...new Set(products.map(product => product.category))];
    setAvailableCategories(categories);
  }, []);

  // Initialize category filter based on URL param
  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
  }, [category]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Filter by category if selected
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by price range
    result = result.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= priceFilter[0] && price <= priceFilter[1];
    });

    // Filter by rating if selected
    if (selectedRating !== null) {
      result = result.filter(product => Math.floor(product.rating) >= selectedRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result = result.filter(product => product.new).concat(result.filter(product => !product.new));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - show featured products first
        result = result.filter(product => product.featured).concat(result.filter(product => !product.featured));
    }

    setFilteredProducts(result);
  }, [selectedCategories, priceFilter, selectedRating, sortBy, category]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceFilter(value as [number, number]);
  };

  const resetFilters = () => {
    setSelectedCategories(category ? [category] : []);
    setPriceFilter([0, 1000]);
    setSelectedRating(null);
    setSortBy('featured');
  };

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-medium">Categories</h3>
        <div className="space-y-2">
          {availableCategories.map(cat => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => handleCategoryChange(cat)}
              />
              <label
                htmlFor={`category-${cat}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[0, 1000]} 
            max={1000} 
            step={10} 
            value={priceFilter}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">${priceFilter[0]}</span>
            <span className="text-sm font-medium">${priceFilter[1] === 1000 ? '1000+' : priceFilter[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-medium">Rating</h3>
        <div className="space-y-2">
          {ratings.map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <div className="flex mr-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                & Up
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full"
      >
        <FilterX className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            {renderFilters()}
          </div>

          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <h2 className="text-lg font-bold mb-6">Filters</h2>
                {renderFilters()}
              </SheetContent>
            </Sheet>

            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Sort - Desktop */}
            <div className="hidden lg:flex justify-end mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No products found with the selected filters.</p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
