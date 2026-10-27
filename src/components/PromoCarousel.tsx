import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { PROMO_BANNERS } from '../data/mockData';
import { PromoBanner } from '../types';

interface PromoCarouselProps {
  onSelectBannerPromo: (promo: PromoBanner) => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({
  onSelectBannerPromo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROMO_BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === PROMO_BANNERS.length - 1 ? 0 : prev + 1));
  };

  // Auto-play every 5 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === PROMO_BANNERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentBanner = PROMO_BANNERS[currentIndex];

  return (
    <section
      aria-label="Promotional Offers"
      className="relative w-full overflow-hidden my-1 max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-[518/260] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-900 group">
        {/* Banner Images Track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROMO_BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className="w-full h-full shrink-0 relative cursor-pointer"
              onClick={() => onSelectBannerPromo(banner)}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover object-center select-none"
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow Navigation Button matching Figma visual */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous promotional slide"
          className="absolute left-1 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 z-10 backdrop-blur-xs"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        {/* Right Arrow Navigation Button matching Figma visual */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next promotional slide"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 text-white/80 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 z-10 backdrop-blur-xs"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {PROMO_BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'w-6 bg-white shadow'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Quick Promo Badge trigger */}
        {currentBanner.promoCode && (
          <div className="absolute top-2.5 right-3 z-10 hidden sm:flex items-center gap-1 bg-[#000570]/85 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20 shadow">
            <Tag className="w-3 h-3 text-amber-300" />
            Code: {currentBanner.promoCode}
          </div>
        )}
      </div>
    </section>
  );
};
