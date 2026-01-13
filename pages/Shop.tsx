import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data';
import { Filter, Grid3X3, LayoutGrid } from 'lucide-react';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category.toLowerCase())))];

  // Filter products
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Check for category in URL
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-32 pb-20 bg-zinc-950 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <LayoutGrid className="w-3 h-3" />
            Professional Gear
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Professional Catalog</h1>
          <p className="text-zinc-400 text-lg">
            Explore our complete range of cameras, lenses, drones, and lighting equipment.
            Official distribution with local support.
          </p>
        </div>

        {/* Category Filters */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
            >
              {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div
          className={`flex items-center justify-between mb-8 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <p className="text-zinc-500 text-sm">
            Showing <span className="text-white font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          <div className="flex items-center gap-2 text-zinc-500">
            <Filter size={16} />
            <span className="text-sm">Sort by: Featured</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${200 + index * 75}ms` }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-zinc-400 mb-6">Try selecting a different category</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;