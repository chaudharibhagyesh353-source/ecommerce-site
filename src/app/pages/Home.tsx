import { Link } from "react-router";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const featuredProducts = [
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
];

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Love the quality! The fit is perfect and the fabric feels premium. Will definitely order again.",
    product: "Essential White Tee",
  },
  {
    name: "Mike Chen",
    rating: 5,
    text: "Best hoodie I've owned. Super comfortable and the design is exactly what I was looking for.",
    product: "Premium Hoodie",
  },
  {
    name: "Emma Davis",
    rating: 4,
    text: "Great jeans! Sizing was accurate and they arrived quickly. Very happy with my purchase.",
    product: "Classic Denim",
  },
];

export function Home() {
  const sliderRef = useRef<any>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] bg-neutral-100">
        <img
          src="https://images.unsplash.com/photo-1762331614441-dfe446e69c25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHlsaXNoJTIwY2xvdGhpbmclMjB1cmJhbnxlbnwxfHx8fDE3NzA4OTczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl tracking-wider uppercase mb-4">
              Style Your Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neutral-200">
              Fashion-forward essentials for the modern graduate
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 hover:bg-neutral-100 transition-colors"
            >
              <span>Shop Now</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12 uppercase tracking-wider">
            Shop by Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/shop?category=men" className="group relative h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1505940145182-6718fd38efb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZmFzaGlvbiUyMG1pbmltYWwlMjBjbG90aGluZ3xlbnwxfHx8fDE3NzA4ODAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Men's Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl uppercase tracking-wider mb-2">Men's</h3>
                  <p className="text-sm">Explore Collection</p>
                </div>
              </div>
            </Link>
            <Link to="/shop?category=women" className="group relative h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1760551733107-25bd7b041623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwY2FzdWFsJTIwc3RyZWV0d2VhcnxlbnwxfHx8fDE3NzA4OTczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl uppercase tracking-wider mb-2">Women's</h3>
                  <p className="text-sm">Explore Collection</p>
                </div>
              </div>
            </Link>
            <Link to="/shop?category=new" className="group relative h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1770739886778-ab36c4b55dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMGZhc2hpb24lMjBvdXRmaXR8ZW58MXx8fHwxNzcwODk3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="New Arrivals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl uppercase tracking-wider mb-2">New Arrivals</h3>
                  <p className="text-sm">Explore Collection</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl uppercase tracking-wider">Best Sellers</h2>
            <Link
              to="/shop"
              className="flex items-center space-x-2 hover:underline"
            >
              <span>View All</span>
              <ArrowRight size={20} />
            </Link>
          </div>
          <Slider ref={sliderRef} {...sliderSettings}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="px-3">
                <ProductCard {...product} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-20 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl uppercase tracking-wider mb-4">
            End of Season Sale
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-neutral-300">
            Up to 50% off on selected items
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 hover:bg-neutral-100 transition-colors"
          >
            <span>Shop Sale</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12 uppercase tracking-wider">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-neutral-50 p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      className="text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4">&ldquo;{review.text}&rdquo;</p>
                <div>
                  <p className="text-sm">{review.name}</p>
                  <p className="text-sm text-neutral-500">{review.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 uppercase tracking-wider">
            Join Our Community
          </h2>
          <p className="text-neutral-600 mb-8">
            Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border border-neutral-300 focus:outline-none focus:border-black"
            />
            <button className="px-8 py-3 bg-black text-white hover:bg-neutral-800 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
