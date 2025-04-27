
import { useFavorites } from "@/contexts/FavoritesContext";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="page-container flex flex-col items-center justify-center py-16 page-transition">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Heart className="h-10 w-10 text-bakery-navy" />
        </div>
        <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
        <p className="text-gray-500 mb-6 text-center">
          Start adding your favorite treats to build your collection
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-bakery-navy hover:bg-bakery-navy/90"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container page-transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Favorites</h1>
        <div className="bg-red-50 rounded-full p-2">
          <Heart className="h-5 w-5 text-red-500 fill-current" />
        </div>
      </div>
      
      <ProductGrid products={favorites} />
    </div>
  );
};

export default FavoritesPage;
