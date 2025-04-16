
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    price: 249.99,
    discountPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Electronics',
    tags: ['headphones', 'wireless', 'audio'],
    inStock: true,
    rating: 4.8,
    numReviews: 127,
    featured: true,
    bestSeller: true,
  },
  {
    id: '2',
    name: 'Smartphone Pro Max',
    description: 'The latest flagship smartphone with a 6.7-inch OLED display, 5G connectivity, triple camera system, and all-day battery life.',
    price: 1099.99,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21a0d67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Electronics',
    tags: ['smartphone', 'mobile', '5G'],
    inStock: true,
    rating: 4.6,
    numReviews: 84,
    featured: true,
  },
  {
    id: '3',
    name: 'Ultra Slim Laptop',
    description: 'Powerful and portable laptop featuring a 14-inch 4K display, the latest processor, 16GB RAM, and 512GB SSD storage.',
    price: 1499.99,
    discountPrice: 1349.99,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Electronics',
    tags: ['laptop', 'computer', 'ultrabook'],
    inStock: true,
    rating: 4.7,
    numReviews: 62,
    bestSeller: true,
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
    price: 199.99,
    discountPrice: 169.99,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Wearables',
    tags: ['smartwatch', 'fitness', 'health'],
    inStock: true,
    rating: 4.5,
    numReviews: 189,
    new: true,
  },
  {
    id: '5',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with premium sound quality, touch controls, and 24-hour battery life with the charging case.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1606741965509-544b62119e91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Electronics',
    tags: ['earbuds', 'wireless', 'audio'],
    inStock: true,
    rating: 4.4,
    numReviews: 211,
    new: true,
  },
  {
    id: '6',
    name: 'Designer Backpack',
    description: 'Stylish and functional backpack with laptop compartment, water-resistant material, and ergonomic design for daily use.',
    price: 89.99,
    discountPrice: 74.99,
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Fashion',
    tags: ['backpack', 'bag', 'accessories'],
    inStock: true,
    rating: 4.3,
    numReviews: 75,
  },
  {
    id: '7',
    name: 'Premium Bluetooth Speaker',
    description: 'Powerful portable speaker with rich bass, 360-degree sound, and 12-hour battery life. Water-resistant for outdoor use.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Electronics',
    tags: ['speaker', 'bluetooth', 'audio'],
    inStock: true,
    rating: 4.6,
    numReviews: 93,
    featured: true,
  },
  {
    id: '8',
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with customizable RGB lighting, N-key rollover, and durable aluminum construction.',
    price: 129.99,
    discountPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    category: 'Electronics',
    tags: ['keyboard', 'gaming', 'computer accessories'],
    inStock: true,
    rating: 4.7,
    numReviews: 121,
    bestSeller: true,
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
