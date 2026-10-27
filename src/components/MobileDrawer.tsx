import React, { useEffect } from 'react';
import { X, Home, Utensils, Coffee, Soup, Tag, MapPin, Clock, Phone, ChevronRight, User, ShieldCheck } from 'lucide-react';
import { USER_PROFILE } from '../data/mockData';
import { CategoryType } from './CategoryNav';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenLocation: () => void;
  onOpenCart: () => void;
  location: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenLocation,
  onOpenCart,
  location,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Drawer */}
      <aside
        aria-label="Mobile Navigation Drawer"
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-[#000570] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-base text-white">{USER_PROFILE.name}</div>
              <div className="text-xs text-white/80 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-300" />
                {location}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-3">
              Explore Menu
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  All Recommendations
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  onSelectCategory('fastfood');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  Fast Food & Meals
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  onSelectCategory('coffee');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  Jump Start Coffee
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  onSelectCategory('noodles');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <Soup className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  Ramen & Asian Noodles
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-3">
              Orders & Offers
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenCart();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  Promotions & BOGO Deals
                </span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  3 Active
                </span>
              </button>

              <button
                onClick={() => {
                  onOpenLocation();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  Change Delivery City
                </span>
                <span className="text-xs text-neutral-500">{location}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-800 font-semibold text-sm group"
              >
                <span className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#000570] group-hover:scale-110 transition-transform" />
                  Recent Orders
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Direct Support Box */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#000570] mb-1">
              <Phone className="w-4 h-4" />
              Need Help with Your Order?
            </div>
            <p className="text-[11px] text-neutral-600 mb-2">
              Customer support hotline Phnom Penh:
            </p>
            <a
              href="tel:08030546228"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#000570] hover:underline"
            >
              08030546228
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Phnom Penh Delivery
          </span>
          <span className="font-semibold text-neutral-400">v1.2</span>
        </div>
      </aside>
    </>
  );
};
