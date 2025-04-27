
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  ingredients: string[];
  dietary?: {
    glutenFree: boolean;
    vegan: boolean;
    nutFree?: boolean;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export type FilterOptions = {
  priceRange: [number, number];
  dietary: {
    glutenFree: boolean;
    vegan: boolean;
  };
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'newest';
}
