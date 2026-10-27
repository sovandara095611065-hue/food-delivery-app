import React from 'react';
import { MapPin, ShoppingCart } from 'lucide-react';

interface BottomBarProps {
  location: string;
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenLocation: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  location,
  cartItemCount,
  onOpenCart,
  onOpenLocation,
}) => {
  return (
    <nav
      aria-label="Location and Cart Bar"
      className="sticky bottom-0 z-40 bg-[#000570] text-white shadow-2xl border-t border-blue-900/40"
    >
      <div className="max-w-4xl mx-auto px-5 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Left: Location Pin & City */}
        <button
          onClick={onOpenLocation}
          className="flex items-center gap-2.5 text-left group hover:opacity-95 transition-all duration-200 active:scale-95"
          aria-label={`Current location: ${location}. Click to change.`}
        >
          <div className="text-white group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 fill-white stroke-none" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-tight">
              Your Location
            </div>
            <div className="text-[11px] sm:text-xs text-white/90 font-medium">
              {location}
            </div>
          </div>
        </button>

        {/* Right: View Your Cart CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-102 active:scale-98"
          >
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              View Your Cart
            </span>

            {/* Circular White Cart Button */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#000570] flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-108 group-hover:bg-neutral-100 active:scale-95">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-extrabold text-[11px] min-w-[20px] h-5 rounded-full px-1 flex items-center justify-center border-2 border-[#000570] shadow-sm animate-in zoom-in-75">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
