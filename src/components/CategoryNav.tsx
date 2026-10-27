import React from 'react';
import { Home } from 'lucide-react';

export type CategoryType = 'all' | 'fastfood' | 'coffee' | 'noodles';

interface CategoryNavProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <nav aria-label="Food Categories" className="px-5 py-3 max-w-4xl mx-auto">
      <div className="bg-white rounded-full border-2 border-[#000570] p-1 flex items-center justify-between shadow-sm">
        {/* Category 1: Home / All */}
        <button
          onClick={() => onSelectCategory('all')}
          aria-label="All food items and home"
          aria-pressed={activeCategory === 'all'}
          className={`flex items-center justify-center transition-all duration-200 rounded-full cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#000570] text-white px-5 sm:px-7 py-2 shadow-sm'
              : 'text-[#000570] hover:bg-neutral-100 px-4 py-2 hover:scale-105 active:scale-95'
          }`}
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
        </button>

        {/* Category 2: Fast Food / Burger & Drink */}
        <button
          onClick={() => onSelectCategory('fastfood')}
          aria-label="Burgers and fast food meals"
          aria-pressed={activeCategory === 'fastfood'}
          className={`flex items-center justify-center transition-all duration-200 rounded-full cursor-pointer ${
            activeCategory === 'fastfood'
              ? 'bg-[#000570] text-white px-5 sm:px-7 py-2 shadow-sm'
              : 'text-[#000570] hover:bg-neutral-100 px-4 py-2 hover:scale-105 active:scale-95'
          }`}
        >
          {/* Custom Burger & Drink Silhouette matching Figma */}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cup with straw */}
            <path d="M17 8h4l-1 12H18l-1-12z" />
            <path d="M19 4v4" />
            <path d="M21 2l-2 2" />
            {/* Burger */}
            <path d="M4 11a5 5 0 0 1 10 0v1H4v-1z" />
            <path d="M3 15h12" />
            <path d="M4 18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1H4v1z" />
          </svg>
        </button>

        {/* Category 3: Coffee Mug */}
        <button
          onClick={() => onSelectCategory('coffee')}
          aria-label="Coffee, beverages and Jump Start"
          aria-pressed={activeCategory === 'coffee'}
          className={`flex items-center justify-center transition-all duration-200 rounded-full cursor-pointer ${
            activeCategory === 'coffee'
              ? 'bg-[#000570] text-white px-5 sm:px-7 py-2 shadow-sm'
              : 'text-[#000570] hover:bg-neutral-100 px-4 py-2 hover:scale-105 active:scale-95'
          }`}
        >
          {/* Custom Coffee Cup with Steam matching Figma */}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Steam trails */}
            <path d="M8 2c0 2-1 2-1 4" />
            <path d="M12 2c0 2-1 2-1 4" />
            <path d="M16 2c0 2-1 2-1 4" />
            {/* Cup body & handle */}
            <path d="M4 9h14v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z" />
            <path d="M18 11h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
            <path d="M3 21h16" />
          </svg>
        </button>

        {/* Category 4: Noodles & Ramen Bowl */}
        <button
          onClick={() => onSelectCategory('noodles')}
          aria-label="Ramen, Asian dishes and noodles"
          aria-pressed={activeCategory === 'noodles'}
          className={`flex items-center justify-center transition-all duration-200 rounded-full cursor-pointer ${
            activeCategory === 'noodles'
              ? 'bg-[#000570] text-white px-5 sm:px-7 py-2 shadow-sm'
              : 'text-[#000570] hover:bg-neutral-100 px-4 py-2 hover:scale-105 active:scale-95'
          }`}
        >
          {/* Custom Ramen / Noodle Bowl with Chopsticks matching Figma */}
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 11h16a8 8 0 0 1-16 0z" />
            <path d="M8 19h8" />
            <path d="M8 8c1-2 3-2 4 0s3 2 4 0" />
            <path d="M19 4L7 8" />
            <path d="M21 7L6 10" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
