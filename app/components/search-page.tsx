"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Search, TrendingUp } from "lucide-react"
import DishArt from "./dish-art"
import { VegMark } from "./bogo-sheets"
import { useBogoApp } from "./app-context"
import { brandById, dishes, formatINR } from "@/lib/bogo-data"

const popular = ["Biryani", "Pizza", "Brownie", "Pasta", "Roll", "Burger"]

export default function SearchPage() {
  const { navigate, addPaid } = useBogoApp()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [])

  const q = query.trim().toLowerCase()
  const results = q
    ? dishes.filter((d) => d.name.toLowerCase().includes(q) || brandById(d.brandId).name.toLowerCase().includes(q))
    : []

  return (
    <div className="min-h-full bg-white">
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-white px-4 pt-4 pb-3">
        <button onClick={() => navigate("home")} aria-label="Back" className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <label className="relative flex-1">
          <span className="sr-only">Search dishes or brands</span>
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes or brands"
            className="h-12 w-full rounded-2xl bg-gray-50 pr-3 pl-10 text-sm outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-[#5B2B91]/30"
          />
        </label>
      </header>

      {!q && (
        <section className="px-4 pt-2">
          <h2 className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <TrendingUp className="h-4 w-4" /> Popular on BOGO
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {popular.map((term) => (
              <button key={term} onClick={() => setQuery(term)} className="h-9 rounded-full bg-[#5B2B91]/8 px-4 text-sm font-semibold text-[#5B2B91]">
                {term}
              </button>
            ))}
          </div>
        </section>
      )}

      {q && (
        <section className="px-4">
          <p className="text-sm text-gray-500">
            {results.length} {results.length === 1 ? "dish" : "dishes"} on Buy 1 Get 1
          </p>
          <ul className="mt-3 divide-y divide-gray-100">
            {results.map((dish) => (
              <li key={dish.id} className="flex items-center gap-3 py-3">
                <DishArt kind={dish.art} label={dish.name} className="h-16 w-20 shrink-0 rounded-2xl" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-bold text-gray-900">
                    <VegMark veg={dish.veg} />
                    <span className="truncate">{dish.name}</span>
                  </p>
                  <p className="truncate text-xs text-gray-500">{brandById(dish.brandId).name}</p>
                  <p className="mt-0.5 text-sm">
                    <span className="font-extrabold text-gray-900">{formatINR(dish.price)}</span>
                    <span className="ml-1.5 text-xs font-bold text-green-700">+ 1 free</span>
                  </p>
                </div>
                <button
                  onClick={() => addPaid(dish.id)}
                  className="h-9 shrink-0 rounded-xl border-2 border-[#5B2B91] px-3 text-xs font-extrabold text-[#5B2B91]"
                >
                  ADD
                </button>
              </li>
            ))}
          </ul>
          {results.length === 0 && <p className="py-10 text-center text-sm text-gray-500">Nothing on BOGO matches “{query}” yet.</p>}
        </section>
      )}
    </div>
  )
}
