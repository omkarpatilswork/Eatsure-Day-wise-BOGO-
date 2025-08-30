"use client"

import { useState } from "react"
import HomePage from "./components/home-page"
import BOGOZone from "./components/bogo-zone"
import CartPage from "./components/cart-page"
import CheckoutPage from "./components/checkout-page"
import CelebrationPage from "./components/celebration-page"
import ItalianBOGODay from "./components/italian-bogo-day"
import BottomNavigation from "./components/bottom-navigation"

export default function EatSureApp() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [cartCount, setCartCount] = useState(0)

  const screens = {
    home: <HomePage onNavigate={setCurrentScreen} onAddToCart={() => setCartCount((prev) => prev + 1)} />,
    bogo: <BOGOZone onNavigate={setCurrentScreen} onAddToCart={() => setCartCount((prev) => prev + 1)} />,
    italian: <ItalianBOGODay onNavigate={setCurrentScreen} onAddToCart={() => setCartCount((prev) => prev + 1)} />,
    cart: <CartPage onNavigate={setCurrentScreen} cartCount={cartCount} />,
    checkout: <CheckoutPage onNavigate={setCurrentScreen} />,
    celebration: <CelebrationPage onNavigate={setCurrentScreen} />,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pb-20">{screens[currentScreen]}</div>

      {/* Bottom Navigation - Only show on main screens */}
      {["home", "bogo", "italian", "cart"].includes(currentScreen) && (
        <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} cartCount={cartCount} />
      )}
    </div>
  )
}
