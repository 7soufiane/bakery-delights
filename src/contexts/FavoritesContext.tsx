
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        setFavorites([]);
      }
    }
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => [...prev, product]);
    toast({
      title: "Added to favorites",
      description: `${product.name} has been added to your favorites`,
    });
  };

  const removeFromFavorites = (productId: string) => {
    const productToRemove = favorites.find(p => p.id === productId);
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
    
    if (productToRemove) {
      toast({
        title: "Removed from favorites",
        description: `${productToRemove.name} has been removed from your favorites`,
      });
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  
  return context;
};
