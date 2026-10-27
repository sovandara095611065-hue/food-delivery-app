import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Flame, Star, ShoppingBag } from 'lucide-react';
import { FoodItem } from '../types';

interface ItemModalProps {
  item: FoodItem | null;
  onClose: () => void;
  onAddToCart: (item: FoodItem, quantity: number) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Product Image Box */}
        <div className="bg-[#d8d8d8] p-6 flex items-center justify-center relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-48 h-48 object-contain filter drop-shadow-lg"
          />
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#000570] leading-tight">
                {item.name}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500 font-medium">
                {item.rating && (
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {item.rating}
                  </span>
                )}
                {item.prepTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.prepTime}
                  </span>
                )}
                {item.calories && (
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    {item.calories}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xl font-extrabold text-[#000570] tabular-nums">
              ${(item.price * quantity).toFixed(2)}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {item.description}
          </p>

          {/* Quantity Selector & Add Button */}
          <div className="pt-2 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-neutral-100 rounded-2xl p-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-xl bg-white text-neutral-800 flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-xs active:scale-95"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-neutral-900 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-xl bg-[#000570] text-white flex items-center justify-center hover:bg-blue-900 transition-colors shadow-xs active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-4 bg-[#000570] hover:bg-blue-900 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-102 active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart · ${(item.price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
