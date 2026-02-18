import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Essential White Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1722310752951-4d459d28c678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cCUyMG1pbmltYWx8ZW58MXx8fHwxNzcwODY3MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Basics",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1761891873744-eb181eb1334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzcwODMxODk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Outerwear",
    rating: 4.6,
    discount: 25,
  },
  {
    id: "3",
    name: "Premium Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzcwODg3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Streetwear",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Leather Biker Jacket",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d5504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0JTIwZmFzaGlvbiUyMHN0eWxlfGVufDF8fHx8MTc3MDg5NzM2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Outerwear",
    rating: 4.7,
    discount: 20,
  },
  {
    id: "5",
    name: "Classic White Sneakers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1759542890353-35f5568c1c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwZmFzaGlvbiUyMHdoaXRlfGVufDF8fHx8MTc3MDgyOTE0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Footwear",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Elegant Casual Dress",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1757607715843-35349ddda681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRyZXNzJTIwZWxlZ2FudCUyMGNhc3VhbHxlbnwxfHx8fDE3NzA4OTczNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Women",
    rating: 4.8,
  },
  {
    id: "7",
    name: "Urban Streetwear Set",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1731012106552-3e85ed12d420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBjbG90aGluZyUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NzA4OTczNTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Streetwear",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Minimalist Fashion Outfit",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1762343291672-4434dbabb537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYnJhbmQlMjBsaWZlc3R5bGUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwODk3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Collections",
    rating: 4.9,
    discount: 25,
  },
  {
    id: "9",
    name: "College Campus Style",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1770739886778-ab36c4b55dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMGZhc2hpb24lMjBvdXRmaXR8ZW58MXx8fHwxNzcwODk3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Basics",
    rating: 4.6,
  },
];

const categories = ["All", "Basics", "Outerwear", "Streetwear", "Footwear", "Women", "Collections"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Gray", "Beige", "Blue", "Red"];
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

export function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const filteredProducts = products
    .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
    .filter((product) => {
      if (selectedPriceRange === null) return true;
      const range = priceRanges[selectedPriceRange];
      return product.price >= range.min && product.price < range.max;
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl uppercase tracking-wider text-center">Shop All</h1>
          <p className="text-center text-neutral-600 mt-4">
            Discover our latest collection of fashion-forward essentials
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="uppercase tracking-wider mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 transition-colors ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="uppercase tracking-wider mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 border transition-colors ${
                        selectedSizes.includes(size)
                          ? "bg-black text-white border-black"
                          : "border-neutral-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="uppercase tracking-wider mb-4">Color</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="w-4 h-4"
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="uppercase tracking-wider mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === index}
                        onChange={() => setSelectedPriceRange(index)}
                        className="w-4 h-4"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSizes([]);
                  setSelectedColors([]);
                  setSelectedPriceRange(null);
                }}
                className="w-full py-2 border border-neutral-300 hover:bg-neutral-100 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 w-full justify-center"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-neutral-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-300 pl-4 pr-10 py-2 focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-neutral-600 text-lg">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSizes([]);
                    setSelectedColors([]);
                    setSelectedPriceRange(null);
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
