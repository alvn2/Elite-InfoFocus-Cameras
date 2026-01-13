import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, MessageCircle, ArrowLeft, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Construct WhatsApp message
    const whatsappNumber = "254721825773";
    let message = "Hi Elite InfoFocus, I would like to place an order for the following items:\n\n";

    cartItems.forEach(item => {
      message += `• ${item.name} x${item.quantity} (KES ${(item.price * item.quantity).toLocaleString()})\n`;
    });

    const total = getCartTotal();
    message += `\n*Total Order Value: KES ${total.toLocaleString()}*`;
    message += "\n\nPlease advise on payment and delivery.";

    // Show success animation
    setCheckoutSuccess(true);

    // Open WhatsApp after brief delay
    setTimeout(() => {
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
      clearCart();
      setCheckoutSuccess(false);
    }, 1000);
  };

  const formattedTotal = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(getCartTotal());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-zinc-950 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-600 animate-bounce-gentle">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 font-display">Your cart is empty</h2>
          <p className="text-zinc-400 mb-8 text-lg">Looks like you haven't added any gear yet. Let's find something amazing!</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <ArrowLeft size={18} />
            Explore Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-zinc-950 min-h-screen relative">
      {/* Checkout success overlay */}
      {checkoutSuccess && (
        <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <Check size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Opening WhatsApp...</h3>
            <p className="text-zinc-400">Redirecting you to complete your order</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Shopping Cart</h1>
            <p className="text-zinc-400">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in your cart</p>
          </div>
          <Link to="/shop" className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex gap-5 items-center hover:border-zinc-700 transition-all group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="w-24 h-24 bg-zinc-950 rounded-xl p-2 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-lg truncate">{item.name}</h3>
                      <p className="text-zinc-500 text-sm">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-bold text-blue-400 text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-zinc-500">
                          {formatPrice(item.price)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="text-white">{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery</span>
                  <span className="text-green-500 font-medium">Free (CBD)</span>
                </div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span className="text-blue-400">{formattedTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-3 group hover:scale-[1.02]"
              >
                <MessageCircle size={20} className="group-hover:animate-bounce" />
                Checkout on WhatsApp
              </button>

              <p className="text-xs text-center text-zinc-500 mt-4 leading-relaxed">
                Clicking checkout will open WhatsApp with your pre-filled order details. Payment instructions will be provided.
              </p>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-green-500" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-green-500" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1">
                  <Check size={12} className="text-green-500" /> Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;