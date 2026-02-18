import { Link } from "react-router";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  category?: string;
  discount?: number;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating = 4.5,
  category,
  discount,
}: ProductCardProps) {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4] mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-sm">
            -{discount}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Add to cart functionality
          }}
          className="absolute bottom-3 left-3 right-3 bg-white text-black py-2 px-4 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
      <div>
        {category && (
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {category}
          </p>
        )}
        <h3 className="mb-1 group-hover:underline">{name}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            <Star size={14} fill="currentColor" className="text-yellow-500" />
            <span className="text-sm text-neutral-600">{rating}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-black">${price}</span>
          {originalPrice && (
            <span className="text-neutral-400 line-through text-sm">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
