export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'all' | 'fastfood' | 'coffee' | 'noodles' | 'drinks';
  description: string;
  rating?: number;
  calories?: string;
  prepTime?: string;
  isPopular?: boolean;
  isTopRecommendation?: boolean;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
  instructions?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  promoCode?: string;
  image: string;
  discountText: string;
  phone?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  tier: string;
  points: number;
  location: string;
  address: string;
}
