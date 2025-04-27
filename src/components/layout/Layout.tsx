
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, List, Heart, User, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../cart/CartSheet";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getTotalItems());
  }, [getTotalItems]);

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/" },
    { icon: <List className="w-6 h-6" />, label: "Categories", path: "/categories" },
    { icon: <Heart className="w-6 h-6" />, label: "Favorites", path: "/favorites" },
    { icon: <User className="w-6 h-6" />, label: "Profile", path: "/profile" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-bakery-white flex flex-col">
      {/* Header with search and cart */}
      <header className="bg-bakery-navy text-white p-4 flex items-center justify-between shadow-md">
        <div onClick={() => navigate("/")} className="font-quicksand font-bold text-2xl cursor-pointer">
          Crumb & Co
        </div>
        
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white hover:bg-bakery-navy/80"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <CartSheet />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center p-1 rounded-md transition-colors ${
              isActive(item.path) ? "text-bakery-navy" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
