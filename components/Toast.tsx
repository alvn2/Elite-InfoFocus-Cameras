import React, { useEffect } from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Toast: React.FC = () => {
    const { lastAddedItem, clearLastAdded } = useCart();

    useEffect(() => {
        if (lastAddedItem) {
            const timer = setTimeout(() => {
                clearLastAdded();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [lastAddedItem, clearLastAdded]);

    if (!lastAddedItem) return null;

    return (
        <div className="toast-container">
            <div className="toast toast-success">
                <CheckCircle className="toast-icon w-5 h-5 flex-shrink-0" />
                <div className="flex-grow">
                    <p className="text-sm font-semibold">Added to Cart!</p>
                    <p className="text-xs text-zinc-400 line-clamp-1">{lastAddedItem.name}</p>
                </div>
                <Link
                    to="/cart"
                    onClick={clearLastAdded}
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
                >
                    <ShoppingBag size={14} />
                    View
                </Link>
            </div>
        </div>
    );
};

export default Toast;
