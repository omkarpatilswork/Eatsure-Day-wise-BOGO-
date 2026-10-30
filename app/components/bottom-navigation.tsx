"use client"

import { Home, Search, ShoppingBag, User, type LucideIcon } from "lucide-react"
import { useBogoApp, type Screen } from "./app-context"

const navItems: { id: Screen; label: string; icon?: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  // Replaces the old Multi-Resto tab, per the brief
  { id: "bogo", label: "BOGO Deals" },
  { id: "cart", label: "Cart", icon: ShoppingBag },
  { id: "profile", label: "Account", icon: User },
]

export default function BottomNavigation() {
  const { screen, navigate, totals } = useBogoApp()
  const current = screen === "italian" ? "bogo" : screen

  return (
    <nav aria-label="Main" className="absolute inset-x-0 bottom-0 z-30 border-t border-gray-100 bg-white/95 px-2 pt-1.5 pb-3 backdrop-blur">
      <ul className="flex items-end justify-around">
        {navItems.map((item) => {
          const active = current === item.id
          const isBogo = item.id === "bogo"
          return (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.id, isBogo ? { chip: "All" } : undefined)}
                aria-current={active ? "page" : undefined}
                className="flex min-w-14 flex-col items-center gap-1 px-1 py-1"
              >
                {isBogo ? (
                  <span
                    className={`-mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5B2B91] text-sm font-black text-[#FFD200] shadow-lg ring-4 ring-white transition ${
                      active ? "scale-105" : ""
                    }`}
                  >
                    1+1
                  </span>
                ) : (
                  <span className="relative">
                    {item.icon && <item.icon className={`h-6 w-6 ${active ? "text-[#5B2B91]" : "text-gray-400"}`} strokeWidth={active ? 2.4 : 2} />}
                    {item.id === "cart" && totals.itemCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFD200] px-1 text-[11px] font-extrabold text-[#2b1146]">
                        {totals.itemCount}
                      </span>
                    )}
                  </span>
                )}
                <span className={`text-[11px] font-semibold ${active ? "text-[#5B2B91]" : "text-gray-500"}`}>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
