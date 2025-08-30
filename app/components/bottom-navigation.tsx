"use client"

import { Home, Gift, ShoppingCart, Search, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BottomNavigationProps {
  currentScreen: string
  onNavigate: (screen: string) => void
  cartCount: number
}

export default function BottomNavigation({ currentScreen, onNavigate, cartCount }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "bogo", label: "BOGO Deals", icon: Gift },
    { id: "cart", label: "Cart", icon: ShoppingCart, count: cartCount },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          const isBOGO = item.id === "bogo"

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? isBOGO
                    ? "text-[#5B2B91] bg-gradient-to-br from-[#5B2B91]/10 to-[#FFD200]/10"
                    : "text-[#5B2B91] bg-[#5B2B91]/10"
                  : "text-gray-500 hover:text-[#5B2B91]"
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-lg ${
                    isBOGO && isActive ? "bg-gradient-to-br from-[#5B2B91] to-[#FFD200]" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isBOGO && isActive ? "text-white" : isActive ? "text-[#5B2B91]" : "text-gray-500"
                    }`}
                  />
                </div>
                {item.count > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[#FFD200] text-black hover:bg-[#FFD200] text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                    {item.count}
                  </Badge>
                )}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  isActive ? (isBOGO ? "text-[#5B2B91]" : "text-[#5B2B91]") : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
