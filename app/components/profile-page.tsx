"use client"

import { Gift, Receipt } from "lucide-react"
import { useBogoApp } from "./app-context"
import { formatINR } from "@/lib/bogo-data"
import { lineLabel } from "@/lib/cart"

const rules = [
  "Buy any BOGO dish and get one more from the same brand for ₹0.",
  "The free dish can cost the same or less than the one you pay for.",
  "Order two, get two. Each paid dish unlocks one free dish.",
  "No minimum order and no code. Savings show up in the cart.",
]

export default function ProfilePage() {
  const { cart, navigate } = useBogoApp()
  const saved = cart.orders.reduce((sum, o) => sum + o.totals.bogoSavings, 0)

  return (
    <div className="min-h-full bg-gray-50">
      <header className="bg-white px-4 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5B2B91] text-2xl font-black text-white">G</span>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Guest</h1>
            <p className="text-sm text-gray-500">Koramangala, Bengaluru</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#5B2B91] p-4 text-white">
            <p className="text-xs font-semibold text-white/75">Saved with BOGO</p>
            <p className="mt-1 text-2xl font-black text-[#FFD200]">{formatINR(saved)}</p>
          </div>
          <div className="rounded-2xl bg-[#FFF6CC] p-4 text-[#2b1146]">
            <p className="text-xs font-semibold text-[#5B2B91]">BOGO orders</p>
            <p className="mt-1 text-2xl font-black">{cart.orders.length}</p>
          </div>
        </div>
      </header>

      <section className="px-4 pt-5">
        <h2 className="flex items-center gap-2 font-extrabold text-gray-900">
          <Receipt className="h-5 w-5 text-[#5B2B91]" /> Your orders
        </h2>
        {cart.orders.length === 0 ? (
          <div className="mt-3 rounded-2xl bg-white p-5 text-center text-sm text-gray-500 ring-1 ring-gray-100">
            No orders yet.
            <button onClick={() => navigate("bogo", { chip: "All" })} className="mt-3 block w-full font-bold text-[#5B2B91]">
              Find a BOGO deal
            </button>
          </div>
        ) : (
          <ul className="mt-3 space-y-3">
            {cart.orders.map((order) => (
              <li key={order.number} className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-gray-900">{order.number}</span>
                  <span className="font-extrabold text-[#5B2B91]">{formatINR(order.totals.grandTotal)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{order.lines.map(lineLabel).join(", ")}</p>
                <p className="mt-1 text-xs font-bold text-green-700">Saved {formatINR(order.totals.bogoSavings)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="px-4 pt-6 pb-4">
        <h2 className="flex items-center gap-2 font-extrabold text-gray-900">
          <Gift className="h-5 w-5 text-[#5B2B91]" /> How BOGO works
        </h2>
        <ol className="mt-3 space-y-2">
          {rules.map((rule, i) => (
            <li key={rule} className="flex gap-3 rounded-2xl bg-white p-3 text-sm text-gray-700 ring-1 ring-gray-100">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFD200] text-xs font-extrabold text-[#2b1146]">
                {i + 1}
              </span>
              {rule}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-center text-xs leading-relaxed text-gray-400">
          Concept prototype by Omkar Patil. Not affiliated with EatSure. Nothing here is ordered, and everything resets when you reload.
        </p>
      </section>
    </div>
  )
}
