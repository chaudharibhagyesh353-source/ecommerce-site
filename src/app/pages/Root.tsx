import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";

export function Root() {
  const [cartItemCount, setCartItemCount] = useState(0);

  // In a real app, this would sync with cart state management
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const items = JSON.parse(cartData);
      setCartItemCount(items.length);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
