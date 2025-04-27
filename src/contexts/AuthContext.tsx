
import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes we're hardcoding a successful login
      if (email && password) {
        // In a real app we'd validate credentials with an API
        const mockUser = {
          id: "123",
          name: "John Baker",
          email: email,
          avatar: "https://i.pravatar.cc/150?u=123"
        };
        
        setUser(mockUser);
        toast({
          title: "Login successful!",
          description: `Welcome back, ${mockUser.name}!`
        });
        
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      
      return false;
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Something went wrong, please try again",
        variant: "destructive"
      });
      
      return false;
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes we're hardcoding a successful registration
      if (name && email && password) {
        const mockUser = {
          id: "123",
          name: name,
          email: email,
          avatar: "https://i.pravatar.cc/150?u=123"
        };
        
        setUser(mockUser);
        toast({
          title: "Registration successful!",
          description: `Welcome, ${name}!`
        });
        
        return true;
      }
      
      toast({
        title: "Registration failed",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      
      return false;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong, please try again",
        variant: "destructive"
      });
      
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out successfully"
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
