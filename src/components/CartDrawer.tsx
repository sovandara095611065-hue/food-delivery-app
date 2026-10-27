import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, Check, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
  location: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedPromo,
  onApplyPromo,
  location,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 1.50 : 0;
  
  let discount = 0;
  if (appliedPromo.toUpperCase() === 'BURGER30') {
    discount = subtotal * 0.3;
  } else if (appliedPromo.toUpperCase() === 'PHE01') {
    discount = 5.0; // BOGO pizza discount
  } else if (appliedPromo.toUpperCase() === 'JUMPSTART') {
    discount = 3.5; // Free Americano
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      onApplyPromo(promoInput.trim().toUpperCase());
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 2500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in"
      />

      {/* Slide-up Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your Cart"
        className="fixed inset-x-0 bottom-0 z-50 max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Header */}
        <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#000570]" />
            <h2 className="text-lg font-extrabold text-[#000570]">Your Cart</h2>
            <span className="text-xs font-bold text-neutral-500">
              ({cart.reduce((count, i) => count + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isOrdered ? (
            <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900">Order Placed!</h3>
              <p className="text-sm text-neutral-600 max-w-xs mx-auto">
                Thank you Dara! Your food is being prepared and will be delivered to{' '}
                <span className="font-bold text-neutral-900">{location}</span> in 25–30 mins.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-blue-50 text-[#000570] rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Your cart is empty</h3>
              <p className="text-xs text-neutral-500">
                Browse our top recommendations and popular picks to add delicious meals!
              </p>
            </div>
          ) : (
            <>
              {/* Delivery destination preview */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#000570] shrink-0" />
                  <div>
                    <span className="font-bold text-[#000570]">Delivering to: </span>
                    <span>{location}</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Fast delivery
                </span>
              </div>

              {/* Items list */}
              <div className="divide-y divide-neutral-100">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="py-3 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-[#d8d8d8] p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-neutral-900 truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="text-xs text-neutral-500 font-semibold tabular-nums">
                        ${cartItem.item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-neutral-100 rounded-full p-1">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="w-6 h-6 rounded-full bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-neutral-900 min-w-[16px] text-center tabular-nums">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="w-6 h-6 rounded-full bg-[#000570] text-white flex items-center justify-center hover:bg-blue-900 transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.item.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code (e.g. PHE01)"
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#000570]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      Promo &quot;{appliedPromo}&quot; Applied!
                    </span>
                    <button
                      type="button"
                      onClick={() => onApplyPromo('')}
                      className="text-neutral-500 hover:text-neutral-800 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Summary Calculation */}
              <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee (Phnom Penh)</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-100">
                  <span>Total Amount</span>
                  <span className="text-[#000570] text-base tabular-nums">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action */}
        {!isOrdered && cart.length > 0 && (
          <div className="p-4 bg-neutral-50 border-t border-neutral-100">
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 bg-[#000570] hover:bg-blue-900 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-102 active:scale-98"
            >
              <span>Place Order (${finalTotal.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
