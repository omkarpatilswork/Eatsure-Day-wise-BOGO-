"use client"

import { ArrowLeft, Gift, Minus, Plus, RefreshCw, ShoppingBag, Trash2 } from "lucide-react"
import DishArt from "./dish-art"
import { VegMark } from "./bogo-sheets"
import { useBogoApp } from "./app-context"
import { addOns, brandById, dishById, formatINR } from "@/lib/bogo-data"
import type { CartLine, Totals } from "@/lib/cart"

export default function CartPage() {
  const { cart, totals, dispatch, navigate, openFreePicker } = useBogoApp()
  const pending = cart.lines.find((l) => l.freeDishId === null)
  const brandIds = [...new Set(cart.lines.map((l) => dishById(l.paidDishId).brandId))]

  if (cart.lines.length === 0) {
    return (
      <div className="flex min-h-full flex-col">
        <CartHeader count={0} onBack={() => navigate("bogo")} />
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5B2B91]/10">
            <ShoppingBag className="h-9 w-9 text-[#5B2B91]" />
          </span>
          <h2 className="mt-4 text-xl font-extrabold text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Every dish in the BOGO Zone comes with a second one free.</p>
          <button onClick={() => navigate("bogo", { chip: "All" })} className="mt-6 h-12 rounded-2xl bg-[#5B2B91] px-6 font-extrabold text-white">
            Explore BOGO Zone
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50">
      <CartHeader count={totals.itemCount} onBack={() => navigate("bogo")} />

      <div className="space-y-4 px-4 py-4">
        {brandIds.map((brandId) => {
          const brand = brandById(brandId)
          const lines = cart.lines.filter((l) => dishById(l.paidDishId).brandId === brandId)
          return (
            <section key={brandId} className="overflow-hidden rounded-3xl bg-white ring-1 ring-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B2B91]/10 font-black text-[#5B2B91]">
                    {brand.name[0]}
                  </span>
                  <div>
                    <h2 className="font-extrabold text-gray-900">{brand.name}</h2>
                    <p className="text-xs text-gray-500">
                      {brand.tagline} · {brand.deliveryMins} mins
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-green-700">
                  <Gift className="h-4 w-4" /> BOGO applied
                </span>
              </div>
              <ul className="divide-y divide-dashed divide-gray-200">
                {lines.map((line) => (
                  <PairRow key={line.id} line={line} onPick={() => openFreePicker(line.id)} />
                ))}
              </ul>
            </section>
          )
        })}

        {/* Savings banner */}
        {totals.bogoSavings > 0 && (
          <div className="relative overflow-hidden rounded-3xl bg-[#5B2B91] px-5 py-5 text-center text-white">
            <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-white/10" aria-hidden />
            <div className="absolute -right-6 -bottom-10 h-24 w-24 rounded-full bg-[#FFD200]/20" aria-hidden />
            <p className="relative text-2xl font-black">
              You Saved <span className="text-[#FFD200]">{formatINR(totals.bogoSavings)}</span> with BOGO
            </p>
            <p className="relative mt-1 text-sm text-white/80">Free dishes are already taken off your bill.</p>
          </div>
        )}

        {/* Upsell */}
        <section className="rounded-3xl bg-[#FFF6CC] p-4 ring-1 ring-[#FFD200]/70">
          <h2 className="font-extrabold text-[#2b1146]">Add a drink or dessert for ₹79</h2>
          <p className="text-sm text-[#5b4a20]">Not part of BOGO, just a good add-on.</p>
          <ul className="mt-3 space-y-2">
            {addOns.map((addOn) => {
              const qty = cart.addOns[addOn.id] ?? 0
              return (
                <li key={addOn.id} className="flex items-center gap-3 rounded-2xl bg-white p-2 pr-3">
                  <DishArt kind={addOn.art} label={addOn.name} className="h-12 w-14 shrink-0 rounded-xl" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{addOn.name}</p>
                    <p className="text-sm font-extrabold text-[#5B2B91]">{formatINR(addOn.price)}</p>
                  </div>
                  {qty === 0 ? (
                    <button
                      onClick={() => dispatch({ type: "change-add-on", addOnId: addOn.id, delta: 1 })}
                      className="h-9 rounded-xl border-2 border-[#5B2B91] px-4 text-xs font-extrabold text-[#5B2B91]"
                    >
                      ADD
                    </button>
                  ) : (
                    <Stepper
                      qty={qty}
                      label={addOn.name}
                      onChange={(delta) => dispatch({ type: "change-add-on", addOnId: addOn.id, delta })}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <BillSummary totals={totals} />
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-24 px-4 pb-2">
        {pending ? (
          <button
            onClick={() => openFreePicker(pending.id)}
            className="h-14 w-full rounded-2xl bg-[#FFD200] text-base font-extrabold text-[#2b1146] shadow-xl"
          >
            Pick your free dish first
          </button>
        ) : (
          <button
            onClick={() => navigate("checkout")}
            className="flex h-14 w-full items-center justify-between rounded-2xl bg-[#5B2B91] px-5 text-base font-extrabold text-white shadow-xl"
          >
            <span>{formatINR(totals.grandTotal)}</span>
            <span>Proceed to Checkout</span>
          </button>
        )}
      </div>
    </div>
  )
}

function CartHeader({ count, onBack }: { count: number; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-100 bg-white px-4 py-3">
      <button onClick={onBack} aria-label="Back" className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
        <ArrowLeft className="h-6 w-6 text-gray-700" />
      </button>
      <div className="flex-1">
        <h1 className="text-lg font-extrabold text-gray-900">Your Cart</h1>
        <p className="text-xs text-gray-500">{count} items</p>
      </div>
      {count > 0 && <span className="rounded-lg bg-[#FFD200] px-2 py-1 text-xs font-extrabold text-[#2b1146]">BOGO Active</span>}
    </header>
  )
}

function PairRow({ line, onPick }: { line: CartLine; onPick: () => void }) {
  const { dispatch } = useBogoApp()
  const paid = dishById(line.paidDishId)
  const free = line.freeDishId ? dishById(line.freeDishId) : null

  return (
    <li className="space-y-3 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <DishArt kind={paid.art} label={paid.name} className="h-16 w-20 rounded-2xl" />
          <span className="absolute -top-1.5 -left-1.5 rounded-md bg-[#5B2B91] px-1.5 py-0.5 text-[10px] font-extrabold text-white">PAID</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-start gap-1.5 leading-tight font-bold text-gray-900">
            <span className="mt-0.5">
              <VegMark veg={paid.veg} />
            </span>
            <span className="line-clamp-2">{paid.name}</span>
          </p>
          <p className="mt-0.5 font-extrabold text-gray-900">{formatINR(paid.price * line.qty)}</p>
        </div>
        <Stepper qty={line.qty} label={paid.name} onChange={(delta) => dispatch({ type: "change-qty", lineId: line.id, delta })} />
      </div>

      {free ? (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <DishArt kind={free.art} label={free.name} className="h-16 w-20 rounded-2xl" />
            <span className="absolute -top-1.5 -left-1.5 rounded-md bg-[#FFD200] px-1.5 py-0.5 text-[10px] font-extrabold text-[#2b1146]">FREE</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-start gap-1.5 leading-tight font-bold text-gray-900">
              <span className="mt-0.5">
                <VegMark veg={free.veg} />
              </span>
              <span className="line-clamp-2">
                {free.name}
                {line.qty > 1 && <span className="text-gray-500"> ×{line.qty}</span>}
              </span>
            </p>
            <p className="mt-1 flex items-center gap-2">
              <span className="rounded-md whitespace-nowrap bg-[#FFD200] px-1.5 py-0.5 text-xs font-extrabold text-[#2b1146]">₹0 – Free (BOGO)</span>
              <span className="text-xs text-gray-400 line-through">{formatINR(free.price * line.qty)}</span>
            </p>
          </div>
          <button onClick={onPick} className="flex h-9 items-center gap-1 rounded-xl px-2 text-xs font-bold text-[#5B2B91] hover:bg-[#5B2B91]/10">
            <RefreshCw className="h-3.5 w-3.5" /> Swap
          </button>
        </div>
      ) : (
        <button
          onClick={onPick}
          className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-[#FFD200] bg-[#FFF9DB] p-3 text-left"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFD200] text-[#2b1146]">
            <Gift className="h-6 w-6" />
          </span>
          <span className="flex-1">
            <span className="block font-extrabold text-[#2b1146]">Pick your free dish</span>
            <span className="block text-xs text-[#5b4a20]">Anything up to {formatINR(paid.price)} from this brand</span>
          </span>
        </button>
      )}

      <button
        onClick={() => dispatch({ type: "remove-line", lineId: line.id })}
        className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-red-600"
      >
        <Trash2 className="h-3.5 w-3.5" /> Remove pair
      </button>
    </li>
  )
}

function Stepper({ qty, label, onChange }: { qty: number; label: string; onChange: (delta: number) => void }) {
  return (
    <div className="flex h-9 items-center rounded-xl bg-[#5B2B91] text-white">
      <button onClick={() => onChange(-1)} aria-label={`One less ${label}`} className="flex h-9 w-9 items-center justify-center">
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-5 text-center text-sm font-extrabold" aria-live="polite">
        {qty}
      </span>
      <button onClick={() => onChange(1)} aria-label={`One more ${label}`} className="flex h-9 w-9 items-center justify-center">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export function BillSummary({ totals, title = "Bill summary" }: { totals: Totals; title?: string }) {
  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-gray-100">
      <h2 className="font-extrabold text-gray-900">{title}</h2>
      <dl className="mt-3 space-y-2.5 text-sm">
        <Row label="Item total" value={formatINR(totals.itemTotal)} />
        {totals.bogoSavings > 0 && <Row label="BOGO savings" value={`−${formatINR(totals.bogoSavings)}`} accent />}
        {totals.addOnTotal > 0 && <Row label="Add-ons" value={formatINR(totals.addOnTotal)} />}
        <Row label="Delivery fee" value={formatINR(totals.deliveryFee)} />
        <Row label="Taxes (5% GST)" value={formatINR(totals.taxes)} />
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <dt className="text-base font-extrabold text-gray-900">To pay</dt>
          <dd className="text-xl font-black text-[#5B2B91]">{formatINR(totals.grandTotal)}</dd>
        </div>
      </dl>
    </section>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={accent ? "font-bold text-green-700" : "text-gray-600"}>{label}</dt>
      <dd className={accent ? "font-extrabold text-green-700" : "font-semibold text-gray-900"}>{value}</dd>
    </div>
  )
}
