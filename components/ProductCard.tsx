import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Check, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 300);
  };

  // Formatting price to KES with commas
  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div
      className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col h-full card-hover"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden bg-zinc-950 p-4 img-zoom-container">
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 border border-zinc-800/50">
          {product.category}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-500 ease-out relative z-0"
          loading="lazy"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center w-4 h-4 bg-green-500/20 rounded-full">
            <Check className="w-2.5 h-2.5 text-green-500" />
          </div>
          <span className="text-xs text-zinc-400">In Stock • Nairobi</span>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Price</span>
            <span className="text-lg font-bold text-white">{formattedPrice}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-sm shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 hover:scale-105 active:scale-95 ${isAdding ? 'scale-95 bg-green-600' : ''
              }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <Check size={18} className="animate-scale-in" />
            ) : (
              <>
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Add</span>
                <Plus size={14} className="sm:hidden" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;