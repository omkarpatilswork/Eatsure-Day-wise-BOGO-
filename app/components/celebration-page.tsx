"use client"

import { ArrowRight, Clock, Gift } from "lucide-react"
import { useBogoApp } from "./app-context"
import { brandById, dishById, formatINR } from "@/lib/bogo-data"

// Fixed pseudo-random layout so server and client render the same confetti
const confetti = Array.from({ length: 42 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: ((i * 13) % 20) / 10,
  duration: 2.6 + ((i * 7) % 10) / 5,
  size: 6 + ((i * 5) % 7),
  color: i % 3 === 0 ? "#FFD200" : i % 3 === 1 ? "#ffffff" : "#b892ff",
  round: i % 2 === 0,
}))

export default function CelebrationPage() {
  const { cart, navigate } = useBogoApp()
  const order = cart.orders[0]
  const eta = order ? Math.max(...order.lines.map((l) => brandById(dishById(l.paidDishId).brandId).deliveryMins)) : 25

  return (
    <div className="relative min-h-full overflow-hidden bg-[#5B2B91] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {confetti.map((c, i) => (
          <span
            key={i}
            className="confetti-piece absolute top-0"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.round ? c.size : c.size * 1.8,
              background: c.color,
              borderRadius: c.round ? "999px" : "2px",
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex min-h-full flex-col items-center px-5 pt-14 pb-10 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFD200] text-[#5B2B91] shadow-2xl">
          <Gift className="h-12 w-12" />
        </span>
        <h1 className="mt-6 text-[44px] leading-[0.95] font-black uppercase">
          Enjoy your
          <br />
          <span className="text-[#FFD200]">freebie!</span>
        </h1>
        <p className="mt-3 max-w-xs text-white/85">Your order is confirmed. Two dishes are coming, you paid for one.</p>

        {order && (
          <div className="mt-6 w-full rounded-3xl bg-white p-5 text-left text-gray-900 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-700">Order confirmed</span>
              <span className="text-xs font-semibold text-gray-400">{order.number}</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {order.lines.map((line) => {
                const paid = dishById(line.paidDishId)
                const free = line.freeDishId ? dishById(line.freeDishId) : null
                return (
                  <li key={line.id}>
                    <div className="flex justify-between">
                      <span>
                        {paid.name} ×{line.qty}
                      </span>
                      <span className="font-bold">{formatINR(paid.price * line.qty)}</span>
                    </div>
                    {free && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1.5">
                          {free.name} ×{line.qty}
                          <span className="rounded bg-[#FFD200] px-1 text-[10px] font-extrabold text-[#2b1146]">FREE</span>
                        </span>
                        <span className="font-bold text-green-700">₹0</span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#FFF6CC] px-4 py-3">
              <span className="text-sm font-bold text-[#5B2B91]">Saved with BOGO</span>
              <span className="text-lg font-black text-[#5B2B91]">{formatINR(order.totals.bogoSavings)}</span>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-600">
              <Clock className="h-4 w-4" /> Arriving in {eta}–{eta + 5} mins · paid by {order.payment}
            </p>
          </div>
        )}

        <div className="mt-6 w-full space-y-3">
          <button
            onClick={() => navigate("bogo", { chip: "All" })}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#FFD200] text-base font-extrabold text-[#2b1146] shadow-xl"
          >
            Explore More BOGO Deals <ArrowRight className="h-5 w-5" />
          </button>
          <button onClick={() => navigate("home")} className="h-14 w-full rounded-2xl font-bold text-white ring-2 ring-white/70 hover:bg-white/10">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
