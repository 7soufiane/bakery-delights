
import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "cakes",
    name: "Cakes",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Delicious cakes for every occasion"
  },
  {
    id: "cookies",
    name: "Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Freshly baked cookies to satisfy your sweet tooth"
  },
  {
    id: "breads",
    name: "Breads",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Artisan breads baked daily"
  },
  {
    id: "pastries",
    name: "Pastries",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Flaky and buttery pastries"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Chocolate Layer Cake",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    category: "cakes",
    description: "Rich chocolate cake with layers of smooth chocolate ganache and buttercream frosting. Perfect for celebrations and special occasions.",
    ingredients: ["Flour", "Sugar", "Cocoa", "Butter", "Eggs", "Milk", "Vanilla extract"],
    dietary: {
      glutenFree: false,
      vegan: false
    },
    isFeatured: true,
    sizes: ["6 inch", "8 inch", "10 inch"]
  },
  {
    id: "2",
    name: "Blueberry Muffins",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    category: "pastries",
    description: "Fluffy muffins packed with fresh blueberries and topped with a crunchy streusel topping.",
    ingredients: ["Flour", "Sugar", "Blueberries", "Butter", "Eggs", "Milk", "Baking powder"],
    dietary: {
      glutenFree: false,
      vegan: false
    }
  },
  {
    id: "3",
    name: "Sourdough Bread",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1585478259715-4d3f99ebdeca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    category: "breads",
    description: "Artisan sourdough bread with a crispy crust and chewy interior, made with our 100-year-old starter.",
    ingredients: ["Flour", "Water", "Salt", "Sourdough starter"],
    dietary: {
      glutenFree: false,
      vegan: true
    },
    sizes: ["Small", "Medium", "Large"]
  },
  {
    id: "4",
    name: "Chocolate Chip Cookies",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    category: "cookies",
    description: "Classic chocolate chip cookies made with premium chocolate and a hint of sea salt.",
    ingredients: ["Flour", "Sugar", "Brown sugar", "Butter", "Eggs", "Chocolate chips", "Vanilla extract", "Sea salt"],
    dietary: {
      glutenFree: false,
      vegan: false
    },
    isFeatured: true
  },
  {
    id: "5",
    name: "Croissants",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    category: "pastries",
    description: "Buttery and flaky croissants made using traditional French techniques.",
    ingredients: ["Flour", "Butter", "Sugar", "Yeast", "Salt", "Milk"],
    dietary: {
      glutenFree: false,
      vegan: false
    },
    isFeatured: true
  },
  {
    id: "6",
    name: "Carrot Cake",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    category: "cakes",
    description: "Moist carrot cake with walnuts, spices, and cream cheese frosting.",
    ingredients: ["Flour", "Sugar", "Carrots", "Walnuts", "Cinnamon", "Eggs", "Oil", "Cream cheese"],
    dietary: {
      glutenFree: false,
      vegan: false
    },
    sizes: ["6 inch", "8 inch", "10 inch"]
  },
  {
    id: "7",
    name: "Gluten-Free Brownies",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1590841609987-4ac211afdde1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    category: "cookies",
    description: "Rich and fudgy gluten-free brownies that everyone will love.",
    ingredients: ["Gluten-free flour", "Sugar", "Cocoa", "Butter", "Eggs", "Vanilla extract"],
    dietary: {
      glutenFree: true,
      vegan: false
    },
    isNew: true
  },
  {
    id: "8",
    name: "Baguette",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    category: "breads",
    description: "Traditional French baguette with a crispy crust and soft interior.",
    ingredients: ["Flour", "Water", "Salt", "Yeast"],
    dietary: {
      glutenFree: false,
      vegan: true
    }
  },
  {
    id: "9",
    name: "Vegan Banana Bread",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1605286658744-7ff7c72e0d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    category: "breads",
    description: "Moist and delicious banana bread made without animal products.",
    ingredients: ["Flour", "Bananas", "Sugar", "Plant-based milk", "Vegetable oil", "Cinnamon"],
    dietary: {
      glutenFree: false,
      vegan: true
    },
    isNew: true
  },
  {
    id: "10",
    name: "Strawberry Tart",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    category: "pastries",
    description: "Buttery tart shell filled with vanilla pastry cream and topped with fresh strawberries.",
    ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla bean", "Strawberries"],
    dietary: {
      glutenFree: false,
      vegan: false
    },
    isFeatured: true
  },
  {
    id: "11",
    name: "Cinnamon Rolls",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1583527976767-a57eb12514d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    category: "pastries",
    description: "Soft and gooey cinnamon rolls with cream cheese frosting.",
    ingredients: ["Flour", "Sugar", "Butter", "Cinnamon", "Yeast", "Eggs", "Cream cheese"],
    dietary: {
      glutenFree: false,
      vegan: false
    }
  },
  {
    id: "12",
    name: "Macarons Assortment",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    category: "cookies",
    description: "Assortment of delicate French macarons in various flavors.",
    ingredients: ["Almond flour", "Egg whites", "Sugar", "Food coloring", "Various fillings"],
    dietary: {
      glutenFree: true,
      vegan: false
    },
    isNew: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
};
