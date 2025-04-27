
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="rounded-lg overflow-hidden bg-white shadow-soft hover:shadow-md transition-all cursor-pointer"
    >
      <div className="relative h-48">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
        
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 bg-white rounded-full p-1.5 ${
            isFavorite(product.id) ? "text-red-500" : "text-gray-400"
          }`}
        >
          <Heart className={`h-5 w-5 ${
            isFavorite(product.id) ? "fill-current" : ""
          }`} />
        </button>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">{product.rating.toFixed(1)}</span>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full mt-3 bg-bakery-navy hover:bg-bakery-navy/90"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
