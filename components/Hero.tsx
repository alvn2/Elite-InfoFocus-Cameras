import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with subtle animation */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-float"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop")',
          animationDuration: '20s'
        }}
      >
        {/* Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent"></div>

        {/* Subtle grid overlay for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Sparkles className="w-3 h-3" />
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Official Canon & Sony Dealers
          </div>

          {/* Main Heading */}
          <h1
            className={`font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Capture <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-white">Perfection.</span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-2xl font-light transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Nairobi's premier destination for professional imaging. Upgrade your gear with the latest Mirrorless Bodies, Prime Lenses, and Studio Lighting.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <button
              onClick={scrollToProducts}
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:scale-105 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Shop Featured Gear
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <Link
              to="/shop"
              className="px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-500 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 text-center"
            >
              View All Brands
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={24} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Hero;