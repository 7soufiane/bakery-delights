
import { Category } from "@/types/product";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categories?category=${category.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="relative rounded-lg overflow-hidden group cursor-pointer h-24"
    >
      <img 
        src={category.image} 
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
        <h3 className="text-white font-medium">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
