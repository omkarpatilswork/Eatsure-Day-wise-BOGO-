"use client"

import { useState } from "react"
import { ArrowLeft, Banknote, Check, Clock, CreditCard, Home, MapPin, Smartphone, Briefcase } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BillSummary } from "./cart-page"
import { useBogoApp } from "./app-context"
import { brandById, dishById, formatINR } from "@/lib/bogo-data"

const addresses = [
  { id: "Home", icon: Home, line: "5th Block, Koramangala, Bengaluru 560095" },
  { id: "Work", icon: Briefcase, line: "Embassy Tech Village, Outer Ring Road, Bengaluru 560103" },
]

const payments = [
  { id: "UPI", title: "UPI", detail: "Pay with any UPI app", icon: Smartphone, tag: "Recommended" },
  { id: "Card", title: "Credit / Debit card", detail: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "COD", title: "Cash on delivery", detail: "Pay when the food arrives", icon: Banknote },
]

export default function CheckoutPage() {
  const { cart, totals, dispatch, navigate } = useBogoApp()
  const [address, setAddress] = useState("Home")
  const [changingAddress, setChangingAddress] = useState(false)
  const [payment, setPayment] = useState("UPI")

  const brandNames = [...new Set(cart.lines.map((l) => brandById(dishById(l.paidDishId).brandId).name))]
  const eta = Math.max(0, ...cart.lines.map((l) => brandById(dishById(l.paidDishId).brandId).deliveryMins))
  const selectedAddress = addresses.find((a) => a.id === address)!

  if (cart.lines.length === 0) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
        <p className="font-bold text-gray-900">Nothing to check out yet.</p>
        <button onClick={() => navigate("bogo", { chip: "All" })} className="mt-4 h-12 rounded-2xl bg-[#5B2B91] px-6 font-bold text-white">
          Explore BOGO Zone
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50">
      <header className="bg-[#5B2B91] px-4 pt-4 pb-5 text-white">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("cart")} aria-label="Back" className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/15">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold">Checkout</h1>
            <p className="text-sm text-white/75">Review and place your order</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-white/12 p-4 ring-1 ring-white/15">
          <p className="text-sm text-white/80">
            {brandNames.join(" + ")} · {totals.itemCount} items
          </p>
          <p className="mt-0.5 text-3xl font-black">{formatINR(totals.grandTotal)}</p>
          {totals.bogoSavings > 0 && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#FFD200] px-2 py-1 text-xs font-extrabold text-[#2b1146]">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              BOGO Savings Applied · −{formatINR(totals.bogoSavings)}
            </p>
          )}
        </div>
      </header>

      <div className="space-y-4 px-4 py-4">
        <section className="rounded-3xl bg-white p-4 ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-extrabold text-gray-900">
              <MapPin className="h-5 w-5 text-[#5B2B91]" /> Deliver to
            </h2>
            <button onClick={() => setChangingAddress((v) => !v)} className="text-sm font-bold text-[#5B2B91]">
              {changingAddress ? "Done" : "Change"}
            </button>
          </div>
          {changingAddress ? (
            <div className="mt-3 space-y-2">
              {addresses.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAddress(a.id)
                    setChangingAddress(false)
                  }}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ring-2 ${
                    address === a.id ? "ring-[#5B2B91]" : "ring-gray-100"
                  }`}
                >
                  <a.icon className="mt-0.5 h-5 w-5 text-[#5B2B91]" />
                  <span>
                    <span className="block font-bold text-gray-900">{a.id}</span>
                    <span className="block text-sm text-gray-500">{a.line}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3 rounded-2xl bg-gray-50 p-3">
              <p className="font-bold text-gray-900">{selectedAddress.id}</p>
              <p className="text-sm text-gray-500">{selectedAddress.line}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" /> Arrives in {eta}–{eta + 5} mins
              </p>
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-white p-4 ring-1 ring-gray-100">
          <h2 className="flex items-center gap-2 font-extrabold text-gray-900">
            <CreditCard className="h-5 w-5 text-[#5B2B91]" /> Pay with
          </h2>
          <RadioGroup value={payment} onValueChange={setPayment} className="mt-3 gap-2">
            {payments.map((p) => (
              <Label
                key={p.id}
                htmlFor={`pay-${p.id}`}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl p-3 ring-2 transition ${
                  payment === p.id ? "ring-[#5B2B91]" : "ring-gray-100"
                }`}
              >
                <RadioGroupItem value={p.id} id={`pay-${p.id}`} />
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B2B91]/10">
                  <p.icon className="h-5 w-5 text-[#5B2B91]" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold text-gray-900">{p.title}</span>
                  <span className="block text-xs font-normal text-gray-500">{p.detail}</span>
                </span>
                {p.tag && <span className="rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-bold text-green-700">{p.tag}</span>}
              </Label>
            ))}
          </RadioGroup>
        </section>

        <section className="rounded-3xl bg-white p-4 ring-1 ring-gray-100">
          <h2 className="font-extrabold text-gray-900">Your order</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {cart.lines.map((line) => {
              const paid = dishById(line.paidDishId)
              const free = line.freeDishId ? dishById(line.freeDishId) : null
              return (
                <li key={line.id}>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {paid.name} ×{line.qty}
                    </span>
                    <span className="font-semibold">{formatINR(paid.price * line.qty)}</span>
                  </div>
                  {free && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 text-gray-700">
                        {free.name} ×{line.qty}
                        <span className="rounded bg-[#FFD200] px-1 text-[10px] font-extrabold text-[#2b1146]">FREE</span>
                      </span>
                      <span className="font-semibold text-green-700">₹0</span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <BillSummary totals={totals} title="Bill details" />

        <div className="pb-6">
          <button
            onClick={() => {
              dispatch({ type: "place-order", address, payment })
              navigate("celebration")
            }}
            className="flex h-14 w-full items-center justify-between rounded-2xl bg-[#5B2B91] px-5 text-base font-extrabold text-white shadow-xl transition hover:bg-[#4A2280]"
          >
            <span>{formatINR(totals.grandTotal)}</span>
            <span>Place Order</span>
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">Prototype only: no order is placed and no payment is taken.</p>
        </div>
      </div>
    </div>
  )
}
