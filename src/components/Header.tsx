import React, { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleMobileMenu: () => void;
  onSelectPromoCode: (code: string) => void;
  onOpenLocationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onToggleMobileMenu,
  onSelectPromoCode,
  onOpenLocationModal,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <header className="bg-[#000570] text-white pt-6 pb-5 px-5 md:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Top row: Greeting & Profile / Hamburger Actions */}
        <div className="flex items-start justify-between gap-4 mb-4 relative">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={onToggleMobileMenu}
              aria-label="Open navigation menu"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 text-white shrink-0"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Semantic Greeting */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Welcome <br />
                <span className="font-extrabold">back Dara!</span>
              </h1>
            </div>
          </div>

          {/* Profile Icon Action */}
          <div className="relative">
            <button
              type="button"
              id="user-profile-button"
              aria-haspopup="true"
              aria-expanded={isProfileOpen}
              aria-label="User profile and account options"
              onClick={toggleProfile}
              className="w-11 h-11 rounded-full bg-neutral-200/90 text-[#000570] hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <User className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Profile Dropdown Menu */}
            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              onSelectPromoCode={onSelectPromoCode}
              onOpenLocationModal={onOpenLocationModal}
            />
          </div>
        </div>

        {/* Search Bar matching Figma visual */}
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          className="relative w-full"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search food, coffee, or dishes"
              className="w-full bg-[#d8d8d8] text-neutral-800 placeholder:text-neutral-500 font-medium text-sm sm:text-base py-3 pl-5 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-white/80 focus:bg-white transition-all duration-200 shadow-inner"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-4 p-1 text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <div className="absolute right-4 pointer-events-none text-neutral-600">
                <Search className="w-5 h-5 stroke-[2.2]" />
              </div>
            )}
          </div>
        </form>
      </div>
    </header>
  );
};
