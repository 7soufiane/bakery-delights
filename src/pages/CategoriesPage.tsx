import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, FilterOptions, Product } from "@/types/product";
import { categories, getProductsByCategory, products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import ProductGrid from "@/components/products/ProductGrid";
import { Search, FilterX, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [0, 50],
    dietary: {
      glutenFree: false,
      vegan: false
    },
    sortBy: 'popularity'
  });

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    applyFilters(categoryParam, searchParam);
  }, [searchParams]);

  const applyFilters = (categoryId?: string | null, search?: string | null) => {
    let filtered = [...products];
    
    // Filter by category
    if (categoryId) {
      filtered = filtered.filter(p => p.category === categoryId);
    }
    
    // Filter by search
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(p => 
      p.price >= filterOptions.priceRange[0] && 
      p.price <= filterOptions.priceRange[1]
    );
    
    // Filter by dietary restrictions
    if (filterOptions.dietary.glutenFree) {
      filtered = filtered.filter(p => p.dietary?.glutenFree);
    }
    
    if (filterOptions.dietary.vegan) {
      filtered = filtered.filter(p => p.dietary?.vegan);
    }
    
    // Sort
    switch (filterOptions.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = filtered.filter(p => p.isNew).concat(filtered.filter(p => !p.isNew));
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      // If search is empty and there's a category selected, keep that parameter
      if (selectedCategory) {
        setSearchParams({ category: selectedCategory });
      } else {
        setSearchParams({});
      }
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
  };

  const handleFilterChange = (newOptions: Partial<FilterOptions>) => {
    const updatedOptions = { ...filterOptions, ...newOptions };
    setFilterOptions(updatedOptions);
    applyFilters(selectedCategory, searchQuery);
  };

  const resetFilters = () => {
    setFilterOptions({
      priceRange: [0, 50],
      dietary: {
        glutenFree: false,
        vegan: false
      },
      sortBy: 'popularity'
    });
    applyFilters(selectedCategory, searchQuery);
  };

  return (
    <div className="page-container page-transition">
      {/* Search and Filter Header */}
      <div className="flex items-center gap-2 mb-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100 border-none rounded-full"
            placeholder="Search treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex-shrink-0" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Options</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <Slider 
                    defaultValue={filterOptions.priceRange}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${filterOptions.priceRange[0]}</span>
                    <span>${filterOptions.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Dietary Restrictions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gluten-free">Gluten Free</Label>
                    <Switch 
                      id="gluten-free"
                      checked={filterOptions.dietary.glutenFree}
                      onCheckedChange={(checked) => handleFilterChange({ 
                        dietary: { ...filterOptions.dietary, glutenFree: checked } 
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vegan">Vegan</Label>
                    <Switch 
                      id="vegan"
                      checked={filterOptions.dietary.vegan}
                      onCheckedChange={(checked) => handleFilterChange({ 
                        dietary: { ...filterOptions.dietary, vegan: checked } 
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <RadioGroup 
                  value={filterOptions.sortBy}
                  onValueChange={(value) => handleFilterChange({ 
                    sortBy: value as FilterOptions['sortBy'] 
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="popularity" id="popularity" />
                    <Label htmlFor="popularity">Popularity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-asc" id="price-asc" />
                    <Label htmlFor="price-asc">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-desc" id="price-desc" />
                    <Label htmlFor="price-desc">Price: High to Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="newest" />
                    <Label htmlFor="newest">New Arrivals</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  <FilterX className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
                <SheetClose asChild>
                  <Button className="bg-bakery-navy hover:bg-bakery-navy/90">Apply Filters</Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue={selectedCategory || "all"} onValueChange={(value) => {
        if (value !== "all") {
          handleCategoryClick(value);
        } else {
          setSelectedCategory(null);
          setSearchParams({});
        }
      }}>
        <TabsList className="grid grid-cols-5 mb-4 overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default CategoriesPage;
