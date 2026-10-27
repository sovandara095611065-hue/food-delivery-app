import React from 'react';
import { Plus } from 'lucide-react';
import { FoodItem } from '../types';

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
  onOpenDetails: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onAddToCart,
  onOpenDetails,
}) => {
  return (
    <article
      onClick={() => onOpenDetails(item)}
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-98 select-none focus-within:ring-2 focus-within:ring-[#000570]"
    >
      {/* Top Half: Light Gray container with Dish Image */}
      <div className="bg-[#d8d8d8] aspect-square flex items-center justify-center p-2.5 sm:p-3 relative overflow-hidden transition-colors group-hover:bg-[#cecece]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-108"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Quick Add floating button on hover / touch */}
        <button
          type="button"
          aria-label={`Add ${item.name} to cart`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#000570] shadow-md flex items-center justify-center opacity-90 group-hover:opacity-100 hover:bg-[#000570] hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Half: Solid Deep Blue container with Title and Price */}
      <div className="bg-[#000570] text-white p-2.5 sm:p-3 flex flex-col justify-between min-h-[72px] sm:min-h-[80px]">
        <h3 className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-end mt-1.5">
          <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
};
