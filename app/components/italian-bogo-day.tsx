"use client"

import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import DishArt from "./dish-art"
import { VegMark } from "./bogo-sheets"
import { useBogoApp } from "./app-context"
import { dishesForBrand, formatINR, type Dish } from "@/lib/bogo-data"

const tabs = ["All", "Pizza", "Pasta & Risotto", "Starters", "Dolci"] as const
type Tab = (typeof tabs)[number]

const tabOf = (dish: Dish): Tab => {
  if (dish.art.startsWith("pizza")) return "Pizza"
  if (dish.mealType === "Sides") return "Starters"
  if (dish.mealType === "Desserts") return "Dolci"
  return "Pasta & Risotto"
}

export default function ItalianBOGODay() {
  const { navigate, addPaid, totals } = useBogoApp()
  const [tab, setTab] = useState<Tab>("All")
  const italian = dishesForBrand("italian-day")
  const visible = tab === "All" ? italian : italian.filter((d) => tabOf(d) === tab)

  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 pt-4 pb-3 backdrop-blur">
        <div className="flex items-start gap-2">
          <button onClick={() => navigate("home")} aria-label="Back" className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <div className="min-w-0">
            <div className="flex h-1.5 w-16 overflow-hidden rounded-full" aria-hidden>
              <span className="flex-1 bg-[#1f6f43]" />
              <span className="flex-1 bg-gray-200" />
              <span className="flex-1 bg-[#c8333b]" />
            </div>
            <h1 className="mt-1.5 text-2xl font-black text-gray-900">Italian BOGO Day</h1>
            <p className="text-sm text-gray-500">Every Saturday. Buy any Italian dish, get one of equal or lower price free.</p>
          </div>
        </div>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                tab === t ? "bg-[#5B2B91] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        {visible.map((dish) => (
          <article key={dish.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="relative">
              <DishArt kind={dish.art} label={dish.name} className="h-28 w-full" />
              <span className="absolute top-2 right-2 rounded-md bg-[#c8333b] px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow">
                BOGO
              </span>
            </div>
            <div className="p-3">
              <h2 className="flex items-start gap-1.5 text-sm leading-tight font-bold text-gray-900">
                <VegMark veg={dish.veg} />
                {dish.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs text-gray-500">{dish.description}</p>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <p className="text-base font-extrabold text-[#5B2B91]">{formatINR(dish.price)}</p>
                  <p className="text-[11px] font-bold text-green-700">+ 1 FREE</p>
                </div>
                <button
                  onClick={() => addPaid(dish.id)}
                  aria-label={`Add ${dish.name}`}
                  className="flex h-9 items-center gap-1 rounded-xl bg-[#5B2B91] px-3 text-xs font-extrabold text-white"
                >
                  <Plus className="h-4 w-4" />
                  ADD
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totals.itemCount > 0 && (
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate("cart")}
            className="h-14 w-full rounded-2xl bg-[#FFD200] text-base font-extrabold text-[#2b1146] shadow-lg"
          >
            View cart · {totals.itemCount} items
          </button>
        </div>
      )}
    </div>
  )
}
