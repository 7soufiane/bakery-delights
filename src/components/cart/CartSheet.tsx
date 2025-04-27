
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { SheetClose } from "../ui/sheet";
import { useToast } from "@/components/ui/use-toast";

const CartSheet = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast({
        title: "Order placed successfully!",
        description: "Your delicious treats are on the way.",
      });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="text-6xl">🛒</div>
        <h3 className="text-xl font-semibold text-center">Your cart is empty</h3>
        <p className="text-gray-500 text-center">Add some delicious treats to get started!</p>
        <SheetClose asChild>
          <Button variant="default" className="mt-4 bg-bakery-navy">
            Continue Shopping
          </Button>
        </SheetClose>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto py-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center py-4 border-b">
            <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-bakery-navy hover:bg-bakery-navy/90" 
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={clearCart}
            disabled={isCheckingOut}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSheet;
