
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  PackageOpen,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  if (!isAuthenticated) {
    return (
      <div className="page-container flex flex-col items-center justify-center py-16 page-transition">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <User className="h-10 w-10 text-bakery-navy" />
        </div>
        <h2 className="text-xl font-bold mb-2">Sign in to your account</h2>
        <p className="text-gray-500 mb-6 text-center">
          Sign in to access your profile, orders, and favorites
        </p>
        <div className="space-x-4">
          <Button 
            onClick={() => navigate('/login')}
            className="bg-bakery-navy hover:bg-bakery-navy/90"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/register')}
            variant="outline"
          >
            Register
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: <PackageOpen className="h-5 w-5" />,
      title: "Order History",
      description: "View your past orders",
      onClick: () => console.log("Orders clicked")
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Payment Methods",
      description: "Manage your payment options",
      onClick: () => console.log("Payment clicked")
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Notifications",
      description: "Manage your notifications",
      onClick: () => console.log("Notifications clicked"),
      toggle: {
        checked: notifications,
        onChange: () => setNotifications(!notifications)
      }
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Dark Mode",
      description: "Toggle dark theme",
      onClick: () => console.log("Dark Mode clicked"),
      toggle: {
        checked: darkMode,
        onChange: () => setDarkMode(!darkMode)
      }
    }
  ];

  return (
    <div className="page-container page-transition">
      {/* User info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-16 w-16 rounded-full overflow-hidden">
          <img 
            src={user?.avatar || "https://i.pravatar.cc/150?img=68"} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
      
      <Separator className="mb-6" />
      
      {/* Menu items */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            onClick={item.onClick}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-soft cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-bakery-navy/10 p-2 rounded-full">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            
            {item.toggle ? (
              <Switch 
                checked={item.toggle.checked}
                onCheckedChange={item.toggle.onChange}
              />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        ))}
        
        {/* Logout button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-soft cursor-pointer mt-4">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <LogOut className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-red-500">Logout</h3>
                  <p className="text-sm text-gray-500">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out of your account and will need to sign in again to access your profile.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={logout}
                className="bg-red-500 hover:bg-red-600"
              >
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProfilePage;
