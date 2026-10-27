import { FoodItem, PromoBanner, UserProfile } from '../types';

export const USER_PROFILE: UserProfile = {
  name: 'Dara Sovan',
  email: 'sovandara095611065@gmail.com',
  tier: 'Gold Member',
  points: 480,
  location: 'Phnom Penh',
  address: 'Street 51, Pasteur, BKK1, Phnom Penh',
};

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'jumpstart',
    title: 'Jump Start Coffee',
    subtitle: 'BUY 1 GET 1 FREE',
    discountText: 'BUY 1 Coffee Caramel Clouds GET 1 Americano',
    promoCode: 'JUMPSTART',
    image: '/assets/banners/banner1_jumpstart.png',
  },
  {
    id: 'specialburger',
    title: 'Special Burger',
    subtitle: '30% DISCOUNT',
    discountText: 'Gourmet double beef patty with crispy bacon & melted cheddar',
    promoCode: 'BURGER30',
    phone: '08030546228',
    image: '/assets/banners/banner2_burger.png',
  },
  {
    id: 'pizzahut',
    title: 'Pizza Hut Special',
    subtitle: 'BUY 1 GET 1 FREE*',
    discountText: 'On any medium pan pizza · Coupon Code: PHE01',
    promoCode: 'PHE01',
    image: '/assets/banners/banner3_pizzahut.png',
  },
];

export const TOP_RECOMMENDATIONS: FoodItem[] = [
  {
    id: 'chicken-mashed-potato',
    name: 'Chicken & Mashed Potato',
    price: 5.99,
    image: '/assets/food/chicken_mashed_potato.png',
    category: 'fastfood',
    description: 'Tender oven-roasted seasoned chicken breast served alongside silky butter mashed potatoes, roasted diced carrots, and savory cranberry compote.',
    rating: 4.9,
    calories: '540 kcal',
    prepTime: '15-20 min',
    isTopRecommendation: true,
  },
  {
    id: 'steak-fries',
    name: 'Steak & Fries',
    price: 14.99,
    image: '/assets/food/steak_fries.png',
    category: 'fastfood',
    description: 'Juicy, char-grilled ribeye steak paired with golden crispy French fries, grilled blistered cherry tomatoes, and fresh garden herb salad.',
    rating: 4.8,
    calories: '680 kcal',
    prepTime: '20-25 min',
    isTopRecommendation: true,
  },
  {
    id: 'hawaii-pizza',
    name: 'Hawaii Pizza',
    price: 19.99,
    image: '/assets/food/hawaii_pizza.png',
    category: 'fastfood',
    description: 'Freshly baked pan pizza topped with sweet Hawaiian pineapple chunks, savory cured ham, aromatic oregano, and generous melted mozzarella cheese.',
    rating: 4.7,
    calories: '820 kcal',
    prepTime: '25-30 min',
    isTopRecommendation: true,
  },
];

export const MOST_POPULAR: FoodItem[] = [
  {
    id: 'pink-coconut-mojito',
    name: 'Pink Coconut Mojito',
    price: 8.99,
    image: '/assets/food/pink_coconut_mojito.png',
    category: 'drinks',
    description: 'Tropical artisanal iced cooler crafted with fresh tender coconut water, natural pink pitaya blend, crushed garden mint, and zesty fresh lime.',
    rating: 4.9,
    calories: '160 kcal',
    prepTime: '5-8 min',
    isPopular: true,
  },
  {
    id: '12-pieces-fried-chickens',
    name: '12-pieces Fried Chickens',
    price: 11.99,
    image: '/assets/food/fried_chickens.png',
    category: 'fastfood',
    description: 'Family feast bucket containing 12 pieces of ultra-crispy, golden fried chicken battered with secret 11 herbs and spices.',
    rating: 4.9,
    calories: '1150 kcal',
    prepTime: '15-20 min',
    isPopular: true,
  },
  {
    id: 'egg-meat-ramen',
    name: 'Egg & Meat Ramen',
    price: 5.99,
    image: '/assets/food/egg_meat_ramen.png',
    category: 'noodles',
    description: 'Authentic Japanese ramen with springy handmade noodles, tender braised beef slices, seasoned soft-boiled ajitsuke egg, chopped scallions, and chili flakes in rich broth.',
    rating: 4.8,
    calories: '590 kcal',
    prepTime: '12-15 min',
    isPopular: true,
  },
];

export const ALL_FOOD_ITEMS: FoodItem[] = [
  ...TOP_RECOMMENDATIONS,
  ...MOST_POPULAR,
];

export const PHNOM_PENH_LOCATIONS = [
  'Boeung Keng Kang 1 (BKK1)',
  'Daun Penh',
  'Toul Kork',
  'Chamkarmon',
  'Chroy Changvar',
  'Sen Sok',
  'Mean Chey',
];
