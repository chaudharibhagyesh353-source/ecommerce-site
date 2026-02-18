import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Star, ShoppingCart, Heart, Truck, RefreshCw, Shield, Minus, Plus } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

const productDetails: Record<string, any> = {
  "1": {
    id: "1",
    name: "Essential White Tee",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1722310752951-4d459d28c678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cCUyMG1pbmltYWx8ZW58MXx8fHwxNzcwODY3MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1722310752951-4d459d28c678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vY2t1cCUyMG1pbmltYWx8ZW58MXx8fHwxNzcwODY3MDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    category: "Basics",
    rating: 4.8,
    reviewCount: 127,
    description: "Our essential white tee is crafted from premium 100% organic cotton. Designed with a modern fit and reinforced stitching, this versatile piece is perfect for layering or wearing solo. The minimalist design makes it a wardrobe staple that goes with everything.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk fabric",
      "Reinforced shoulder seams",
      "Modern fit",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  "2": {
    id: "2",
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1761891873744-eb181eb1334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzcwODMxODk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    category: "Outerwear",
    rating: 4.6,
    reviewCount: 89,
    discount: 25,
    description: "Timeless denim jacket featuring a classic cut with modern details. Made from premium denim with just the right amount of stretch for comfort. Features functional pockets, adjustable button cuffs, and a versatile medium wash that pairs perfectly with any outfit.",
    features: [
      "Premium stretch denim",
      "Button closure",
      "Chest pockets",
      "Adjustable cuffs",
      "Medium wash",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  "3": {
    id: "3",
    name: "Premium Hoodie",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzcwODg3MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    category: "Streetwear",
    rating: 4.9,
    reviewCount: 203,
    description: "Elevated comfort meets street style. This premium hoodie features a heavyweight brushed fleece construction for ultimate coziness. Oversized fit with dropped shoulders, kangaroo pocket, and ribbed cuffs. Perfect for layering or wearing as a statement piece.",
    features: [
      "Heavyweight fleece",
      "Oversized fit",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Premium quality construction",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
};

const relatedProducts = [
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
];

const reviews = [
  {
    name: "Alex Thompson",
    rating: 5,
    date: "February 8, 2026",
    text: "Absolutely love this! The quality is outstanding and it fits perfectly. Definitely worth the price.",
    verified: true,
  },
  {
    name: "Jordan Lee",
    rating: 5,
    date: "February 5, 2026",
    text: "Best purchase I've made in a while. The fabric feels premium and the fit is exactly what I was looking for.",
    verified: true,
  },
  {
    name: "Sam Martinez",
    rating: 4,
    date: "February 1, 2026",
    text: "Great product overall! Sizing runs slightly large but quality is excellent. Would recommend sizing down.",
    verified: true,
  },
];

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productDetails[id || "1"];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic
    alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
    
    // Update cart in localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, selectedSize, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-black">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate("/shop")} className="hover:text-black">
            Shop
          </button>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="mb-4 aspect-[3/4] bg-neutral-100 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-neutral-100 overflow-hidden border-2 ${
                    selectedImage === index ? "border-black" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-2">
              <span className="uppercase tracking-wider">{product.category}</span>
              {product.inStock && (
                <>
                  <span>•</span>
                  <span className="text-green-600">In Stock</span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className="text-yellow-500"
                    />
                  ))}
                </div>
                <span>{product.rating}</span>
              </div>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600">{product.reviewCount} reviews</span>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    ${product.originalPrice}
                  </span>
                  {product.discount && (
                    <span className="bg-red-500 text-white px-3 py-1 text-sm">
                      -{product.discount}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-neutral-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="uppercase tracking-wider mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2 text-neutral-700">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="uppercase tracking-wider">Select Size</h3>
                <button className="text-sm underline text-neutral-600 hover:text-black">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="uppercase tracking-wider mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-neutral-300 hover:bg-neutral-100"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-neutral-300 hover:bg-neutral-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2 bg-black text-white py-4 hover:bg-neutral-800 transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
                className="flex-1 bg-neutral-100 text-black py-4 hover:bg-neutral-200 transition-colors"
              >
                Buy Now
              </button>
              <button className="px-6 py-4 border border-neutral-300 hover:bg-neutral-100 transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Info Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div className="flex items-center space-x-3">
                <Truck size={24} className="text-neutral-600" />
                <div>
                  <p className="text-sm">Free Shipping</p>
                  <p className="text-xs text-neutral-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw size={24} className="text-neutral-600" />
                <div>
                  <p className="text-sm">Easy Returns</p>
                  <p className="text-xs text-neutral-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield size={24} className="text-neutral-600" />
                <div>
                  <p className="text-sm">Secure Payment</p>
                  <p className="text-xs text-neutral-500">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl uppercase tracking-wider mb-8">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-neutral-200 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span>{review.name}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill="currentColor"
                            className="text-yellow-500"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl md:text-3xl uppercase tracking-wider mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
