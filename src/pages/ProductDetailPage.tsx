
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getProductById, getRelatedProducts } from "@/data/mockData";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, Minus, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/products/ProductGrid";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(foundProduct));
        
        // Set default selected size if product has sizes
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="page-container flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="page-container pb-24 page-transition">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-4"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </button>

      {/* Product image */}
      <div className="relative mb-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl"
        />
        
        <button
          onClick={() => product && toggleFavorite(product)}
          className={`absolute top-4 right-4 bg-white rounded-full p-2 ${
            isFavorite(product.id) ? "text-red-500" : "text-gray-400"
          }`}
        >
          <Heart className={`h-6 w-6 ${
            isFavorite(product.id) ? "fill-current" : ""
          }`} />
        </button>
      </div>

      {/* Product info */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">{product.rating.toFixed(1)} Rating</span>
        </div>

        {/* Tabs for details/ingredients */}
        <Tabs defaultValue="description" className="mb-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-4">
            <p className="text-gray-700">{product.description}</p>
            
            {/* Dietary information */}
            {product.dietary && (
              <div className="flex mt-4 space-x-2">
                {product.dietary.glutenFree && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Gluten-Free
                  </span>
                )}
                {product.dietary.vegan && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Vegan
                  </span>
                )}
                {product.dietary.nutFree && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Nut-Free
                  </span>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ingredients" className="pt-4">
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>

        {/* Size selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded-md ${
                    selectedSize === size 
                      ? "border-bakery-navy bg-bakery-navy text-white" 
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Quantity</h3>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="mx-4 font-medium">{quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Add to cart */}
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-bakery-navy hover:bg-bakery-navy/90 py-6"
        >
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <ProductGrid products={relatedProducts} title="You might also like" />
      )}
    </div>
  );
};

export default ProductDetailPage;
