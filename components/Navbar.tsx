import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [badgeAnimating, setBadgeAnimating] = useState(false);
  const { getItemCount, lastAddedItem } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate badge when item added
  useEffect(() => {
    if (lastAddedItem) {
      setBadgeAnimating(true);
      const timer = setTimeout(() => setBadgeAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const itemCount = getItemCount();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop Catalog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer z-50">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20">
            <Camera className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight leading-none text-white">ELITE INFOFOCUS</span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest leading-none">Cameras & Studio</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`relative hover:text-white transition-colors py-2 ${isActive(path) ? 'text-white' : ''}`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
              />
            </Link>
          ))}

          <Link to="/cart" className="relative group">
            <div
              className={`p-2 rounded-full transition-all duration-300 ${isActive('/cart')
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-zinc-800 hover:bg-zinc-700 hover:scale-110 text-white'
                }`}
            >
              <ShoppingCart size={20} />
            </div>
            {itemCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-zinc-950 ${badgeAnimating ? 'badge-pop' : ''
                  }`}
              >
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative text-white">
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${badgeAnimating ? 'badge-pop' : ''
                  }`}
              >
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="text-zinc-300 hover:text-white transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-zinc-950/98 backdrop-blur-lg border-b border-zinc-800 shadow-2xl overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-6 flex flex-col gap-1">
          {navLinks.map(({ path, label }, index) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-zinc-300 hover:text-white hover:bg-zinc-900 py-4 px-4 text-lg rounded-lg transition-all ${isActive(path) ? 'text-white bg-zinc-900' : ''
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-center py-4 rounded-lg font-semibold mt-4 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            View Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;