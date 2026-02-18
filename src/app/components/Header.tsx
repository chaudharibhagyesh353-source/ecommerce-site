import { Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";

export function Header({ cartItemCount = 0 }: { cartItemCount?: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl tracking-wider uppercase">
            Graduate
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-black" : "text-neutral-600 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`transition-colors ${
                isActive("/shop") ? "text-black" : "text-neutral-600 hover:text-black"
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive("/about") ? "text-black" : "text-neutral-600 hover:text-black"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                isActive("/contact") ? "text-black" : "text-neutral-600 hover:text-black"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <User size={20} />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="px-4 py-4 space-y-4">
            <Link
              to="/"
              className={`block ${
                isActive("/") ? "text-black" : "text-neutral-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`block ${
                isActive("/shop") ? "text-black" : "text-neutral-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`block ${
                isActive("/about") ? "text-black" : "text-neutral-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block ${
                isActive("/contact") ? "text-black" : "text-neutral-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
