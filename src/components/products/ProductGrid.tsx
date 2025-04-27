
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <span className="text-5xl mb-4">🧁</span>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or check back later!</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {title && (
        <h2 className="text-2xl font-quicksand font-bold mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
