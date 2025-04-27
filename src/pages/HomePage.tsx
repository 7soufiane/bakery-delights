
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryCard from "@/components/categories/CategoryCard";
import { categories, getFeaturedProducts, getNewProducts } from "@/data/mockData";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
    setNewProducts(getNewProducts());
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="page-container page-transition">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10 bg-gray-100 border-none rounded-full"
          placeholder="Search for treats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-6">
        <img
          src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Seasonal Specials"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bakery-navy/80 to-transparent flex flex-col justify-center p-6">
          <h1 className="text-white text-2xl font-bold mb-2">Summer Specials</h1>
          <p className="text-white text-sm mb-3">Enjoy our seasonal treats</p>
          <button 
            onClick={() => navigate('/categories?category=seasonal')}
            className="bg-white text-bakery-navy px-4 py-1.5 rounded-full text-sm font-medium w-max"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-2xl font-quicksand font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <ProductGrid products={featuredProducts} title="Featured Treats" />

      {/* New Arrivals */}
      <ProductGrid products={newProducts} title="New Arrivals" />
    </div>
  );
};

export default HomePage;
