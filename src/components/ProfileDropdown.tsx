import React, { useEffect, useRef } from 'react';
import { User, Tag, Clock, MapPin, CreditCard, Settings, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { USER_PROFILE, PROMO_BANNERS } from '../data/mockData';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPromoCode: (code: string) => void;
  onOpenLocationModal: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onSelectPromoCode,
  onOpenLocationModal,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      role="menu"
      aria-label="User Profile Menu"
      className="absolute right-0 top-14 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-neutral-100 z-50 overflow-hidden text-neutral-800 animate-in fade-in zoom-in-95 duration-150 origin-top-right"
    >
      {/* Profile Header */}
      <div className="bg-[#000570] text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white shrink-0 shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base text-white truncate">{USER_PROFILE.name}</h3>
            <p className="text-xs text-white/80 truncate">{USER_PROFILE.email}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-400 text-neutral-900 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                {USER_PROFILE.tier} ({USER_PROFILE.points} pts)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Promos & Vouchers from visual banners */}
      <div className="p-3 bg-neutral-50 border-b border-neutral-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-600 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#000570]" />
            Your Active Deals
          </span>
          <span className="text-[11px] text-[#000570] font-semibold">3 Available</span>
        </div>
        <div className="space-y-1.5">
          {PROMO_BANNERS.map((promo) => (
            <button
              key={promo.id}
              onClick={() => {
                if (promo.promoCode) onSelectPromoCode(promo.promoCode);
                onClose();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200 text-left hover:border-[#000570] hover:bg-blue-50/50 transition-all duration-200 group"
            >
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 group-hover:text-[#000570]">
                  {promo.promoCode}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">{promo.discountText}</div>
              </div>
              <span className="text-[10px] font-bold text-[#000570] bg-blue-100/70 px-2 py-0.5 rounded-md shrink-0">
                Apply
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Options */}
      <div className="p-2 space-y-0.5 text-xs font-medium">
        <button
          onClick={() => {
            onOpenLocationModal();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-700 hover:text-neutral-900"
        >
          <span className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#000570]" />
            Delivery Location ({USER_PROFILE.location})
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-700 hover:text-neutral-900"
        >
          <span className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#000570]" />
            Order History & Tracking
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-700 hover:text-neutral-900"
        >
          <span className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-[#000570]" />
            Payment Methods (ABA Pay / Cash)
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-700 hover:text-neutral-900"
        >
          <span className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-[#000570]" />
            Preferences & Settings
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>

      {/* Footer Sign out */}
      <div className="p-2 border-t border-neutral-100 bg-neutral-50/50">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
