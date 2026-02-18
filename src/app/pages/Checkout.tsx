import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";

export function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    upiId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    alert("Order placed successfully! Thank you for your purchase.");
    localStorage.removeItem("cart");
    navigate("/");
  };

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl uppercase tracking-wider mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 border border-neutral-200">
                <h2 className="text-xl uppercase tracking-wider mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 border border-neutral-200">
                <h2 className="text-xl uppercase tracking-wider mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 border border-neutral-200">
                <h2 className="text-xl uppercase tracking-wider mb-6">
                  Payment Method
                </h2>

                {/* Payment Options */}
                <div className="space-y-4 mb-6">
                  <label
                    className={`flex items-center space-x-3 p-4 border-2 cursor-pointer transition-colors ${
                      paymentMethod === "card"
                        ? "border-black bg-neutral-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CreditCard size={24} />
                    <span>Credit / Debit Card</span>
                  </label>

                  <label
                    className={`flex items-center space-x-3 p-4 border-2 cursor-pointer transition-colors ${
                      paymentMethod === "upi"
                        ? "border-black bg-neutral-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Smartphone size={24} />
                    <span>UPI Payment</span>
                  </label>

                  <label
                    className={`flex items-center space-x-3 p-4 border-2 cursor-pointer transition-colors ${
                      paymentMethod === "cod"
                        ? "border-black bg-neutral-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Banknote size={24} />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {/* Payment Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-6 border-t border-neutral-200">
                    <div>
                      <label className="block text-sm mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required={paymentMethod === "card"}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required={paymentMethod === "card"}
                          className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVV</label>
                        <input
                          type="text"
                          name="cardCVV"
                          value={formData.cardCVV}
                          onChange={handleInputChange}
                          required={paymentMethod === "card"}
                          className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="pt-6 border-t border-neutral-200">
                    <label className="block text-sm mb-2">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      required={paymentMethod === "upi"}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black"
                      placeholder="yourname@upi"
                    />
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="pt-6 border-t border-neutral-200">
                    <div className="flex items-start space-x-3 p-4 bg-neutral-50">
                      <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm">
                          Pay with cash when your order is delivered. Please keep exact change handy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 border border-neutral-200 sticky top-24">
                <h2 className="text-xl uppercase tracking-wider mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                  {cartItems.map((item: any, index: number) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover bg-neutral-100"
                      />
                      <div className="flex-1">
                        <p className="text-sm mb-1">{item.name}</p>
                        <p className="text-xs text-neutral-600">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
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
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 hover:bg-neutral-800 transition-colors"
                >
                  Place Order
                </button>

                <p className="text-xs text-center text-neutral-500 mt-4">
                  By placing your order, you agree to our Terms & Conditions and
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
