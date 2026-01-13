import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Facebook, Instagram, Twitter, Phone, MapPin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-all group-hover:scale-105">
                <Camera className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">ELITE INFOFOCUS</span>
            </Link>
            <p className="text-zinc-400 mb-6 max-w-sm leading-relaxed">
              Your trusted partner for professional photography and videography equipment in Kenya. We bring the world's best brands to your doorstep.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-sky-500 hover:text-white transition-all hover:scale-110"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Shop</h4>
            <ul className="space-y-4 text-zinc-400">
              <li>
                <Link to="/shop" className="hover:text-blue-500 transition-colors link-underline">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mirrorless" className="hover:text-blue-500 transition-colors link-underline">
                  Cameras
                </Link>
              </li>
              <li>
                <Link to="/shop?category=lenses" className="hover:text-blue-500 transition-colors link-underline">
                  Lenses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=drones" className="hover:text-blue-500 transition-colors link-underline">
                  Drones
                </Link>
              </li>
              <li>
                <Link to="/shop?category=lighting" className="hover:text-blue-500 transition-colors link-underline">
                  Lighting
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-blue-500">
                  <Phone size={16} />
                </div>
                <a href="tel:+254721825773" className="hover:text-white transition-colors">
                  +254 721 825 773
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-blue-500">
                  <Mail size={16} />
                </div>
                <a href="mailto:sales@eliteinfofocus.co.ke" className="hover:text-white transition-colors">
                  sales@eliteinfofocus.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span>Kimathi Street, Nairobi CBD</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm flex items-center gap-1">
            © {currentYear} Elite InfoFocus Cameras. Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Nairobi
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;