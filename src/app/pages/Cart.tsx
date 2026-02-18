import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Trash2, Plus, Minus, Tag } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

export function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "GRAD20") {
      setDiscount(20);
      alert("Coupon applied! 20% discount");
    } else if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(10);
      alert("Coupon applied! 10% discount");
    } else {
      alert("Invalid coupon code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl uppercase tracking-wider mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl uppercase tracking-wider mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 p-4 border border-neutral-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-40 sm:h-32 object-cover bg-neutral-100"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-neutral-600">
                        Size: {item.selectedSize}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 hover:bg-neutral-100 rounded transition-colors h-fit"
                    >
                      <Trash2 size={18} className="text-neutral-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="p-1 border border-neutral-300 hover:bg-neutral-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="p-1 border border-neutral-300 hover:bg-neutral-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-neutral-200 p-6 sticky top-24">
              <h2 className="text-xl uppercase tracking-wider mb-6">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="text-sm uppercase tracking-wider mb-2 block">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    <Tag size={18} />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  Try: GRAD20 or WELCOME10
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 50 && shipping > 0 && (
                  <p className="text-xs text-neutral-500">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-3 hover:bg-neutral-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="w-full border border-neutral-300 py-3 hover:bg-neutral-100 transition-colors"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-2">
                <p className="text-xs text-neutral-600 flex items-center space-x-2">
                  <span>✓</span>
                  <span>Secure checkout</span>
                </p>
                <p className="text-xs text-neutral-600 flex items-center space-x-2">
                  <span>✓</span>
                  <span>Free returns within 30 days</span>
                </p>
                <p className="text-xs text-neutral-600 flex items-center space-x-2">
                  <span>✓</span>
                  <span>2-5 business days delivery</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
