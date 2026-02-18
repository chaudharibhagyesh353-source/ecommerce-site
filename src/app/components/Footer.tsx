import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl tracking-wider uppercase mb-4">Graduate</h3>
            <p className="text-neutral-400 text-sm">
              Fashion-forward clothing for the modern generation. Style that defines you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-neutral-400 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-l focus:outline-none focus:border-neutral-500 text-sm"
              />
              <button className="px-4 py-2 bg-white text-black rounded-r hover:bg-neutral-200 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
          </div>
          <p className="text-neutral-400 text-sm">
            © 2026 Graduate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
