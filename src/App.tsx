import React, { useState, useMemo } from 'react';
import { Smartphone, Monitor, CheckCircle, Tag, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { CategoryNav, CategoryType } from './components/CategoryNav';
import { PromoCarousel } from './components/PromoCarousel';
import { FoodCard } from './components/FoodCard';
import { BottomBar } from './components/BottomBar';
import { MobileDrawer } from './components/MobileDrawer';
import { CartDrawer } from './components/CartDrawer';
import { ItemModal } from './components/ItemModal';
import { LocationModal } from './components/LocationModal';
import { TOP_RECOMMENDATIONS, MOST_POPULAR, ALL_FOOD_ITEMS } from './data/mockData';
import { FoodItem, CartItem, PromoBanner } from './types';

export default function App() {
  // Device view switcher for testing/demonstrating both exact iPhone mockup & fluid responsive layout
  const [deviceView, setDeviceView] = useState<'iphone' | 'fluid'>('iphone');

  // Navigation & Filter States
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart State (Initialized with 1 Chicken & Mashed Potato for quick interaction)
  const [cart, setCart] = useState<CartItem[]>([
    { item: TOP_RECOMMENDATIONS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState('');

  // Modals & Active Selections
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [location, setLocation] = useState('Phnom Penh');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart Operations
  const handleAddToCart = (item: FoodItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { item, quantity }];
    });
    showToast(`Added ${quantity}x ${item.name} to cart!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleApplyPromo = (code: string) => {
    setAppliedPromo(code);
    if (code) {
      showToast(`Promo code "${code}" activated!`);
    }
  };

  const handleSelectBannerPromo = (banner: PromoBanner) => {
    if (banner.promoCode) {
      handleApplyPromo(banner.promoCode);
    } else {
      showToast(`${banner.title}: ${banner.subtitle}`);
    }
  };

  // Filtered Food Lists based on Category & Search
  const filteredRecommendations = useMemo(() => {
    let list = TOP_RECOMMENDATIONS;
    if (activeCategory === 'fastfood') {
      list = list.filter((i) => i.category === 'fastfood');
    } else if (activeCategory === 'coffee') {
      list = list.filter((i) => i.category === 'coffee' || i.category === 'drinks');
    } else if (activeCategory === 'noodles') {
      list = list.filter((i) => i.category === 'noodles');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const filteredPopular = useMemo(() => {
    let list = MOST_POPULAR;
    if (activeCategory === 'fastfood') {
      list = list.filter((i) => i.category === 'fastfood');
    } else if (activeCategory === 'coffee') {
      list = list.filter((i) => i.category === 'coffee' || i.category === 'drinks');
    } else if (activeCategory === 'noodles') {
      list = list.filter((i) => i.category === 'noodles');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Core App UI Content
  const appContent = (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-blue-100 selection:text-[#000570]">
      {/* 1. Header with semantic <header>, search, profile toggle, hamburger button */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        onSelectPromoCode={handleApplyPromo}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* 2. Navigation Pill Bar with 4 category icons */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto pb-4">
        {/* 3. Promotional Carousel Banner with Left/Right arrows */}
        <PromoCarousel onSelectBannerPromo={handleSelectBannerPromo} />

        {/* Search Results Summary if searching */}
        {searchQuery.trim() && (
          <div className="px-5 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-neutral-500">
            <span>
              Search results for &quot;<span className="text-neutral-900">{searchQuery}</span>&quot;
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#000570] hover:underline"
            >
              Reset
            </button>
          </div>
        )}

        {/* 4. Top Recommendation Section */}
        <section aria-labelledby="top-recommendation-heading" className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h2
              id="top-recommendation-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#000570] tracking-tight"
            >
              Top Recommendation
            </h2>
          </div>

          {filteredRecommendations.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400 bg-neutral-50 rounded-2xl border border-neutral-100">
              No recommendations match &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {filteredRecommendations.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onAddToCart={(food) => handleAddToCart(food, 1)}
                  onOpenDetails={setSelectedItem}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Most Popular Section */}
        <section aria-labelledby="most-popular-heading" className="px-5 py-3">
          <div className="flex items-center justify-between mb-3">
            <h2
              id="most-popular-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#000570] tracking-tight"
            >
              Most Popular
            </h2>
          </div>

          {filteredPopular.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400 bg-neutral-50 rounded-2xl border border-neutral-100">
              No popular items match &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {filteredPopular.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onAddToCart={(food) => handleAddToCart(food, 1)}
                  onOpenDetails={setSelectedItem}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 6. Sticky Bottom Bar with Location & View Your Cart */}
      <BottomBar
        location={location}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={setActiveCategory}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        location={location}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        location={location}
      />

      {/* Dish Details Modal */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={location}
        onSelectLocation={setLocation}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-full shadow-2xl flex items-center gap-2 border border-neutral-700 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top Controls Bar for Reviewer (Switch between iPhone Figma Frame and Responsive View) */}
      <div className="bg-neutral-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Figma Design Implementation
          </span>
          <span className="hidden sm:inline text-neutral-400">·</span>
          <span className="hidden sm:inline text-neutral-300">
            Dara Food & Coffee Delivery App (Phnom Penh)
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
          <button
            onClick={() => setDeviceView('iphone')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all duration-200 cursor-pointer ${
              deviceView === 'iphone'
                ? 'bg-[#000570] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Preview inside iPhone 16/17 Pro Max container matching Figma mockup"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone Frame (440px)</span>
          </button>

          <button
            onClick={() => setDeviceView('fluid')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all duration-200 cursor-pointer ${
              deviceView === 'fluid'
                ? 'bg-[#000570] text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Expand to fluid responsive desktop layout"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Fluid Responsive</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex items-start justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
        {deviceView === 'iphone' ? (
          /* Exact iPhone 16/17 Pro Max Frame matching the Figma specification */
          <div className="w-full max-w-[440px] bg-black sm:rounded-[50px] sm:p-3 sm:shadow-2xl sm:ring-1 sm:ring-neutral-800 my-auto">
            {/* Dynamic Island / Speaker cutout simulation for realistic iPhone preview */}
            <div className="hidden sm:flex justify-center items-center py-1.5">
              <div className="w-24 h-4 bg-neutral-900 rounded-full flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
              </div>
            </div>

            {/* Inner App Container with rounded corners */}
            <div className="bg-white sm:rounded-[40px] overflow-hidden shadow-inner flex flex-col min-h-[880px]">
              {appContent}
            </div>
          </div>
        ) : (
          /* Responsive Fluid Layout */
          <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden my-auto">
            {appContent}
          </div>
        )}
      </div>
    </div>
  );
}
