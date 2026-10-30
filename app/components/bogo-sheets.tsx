"use client"

import { Check, Gift } from "lucide-react"
import Sheet from "./sheet"
import DishArt from "./dish-art"
import { useBogoApp } from "./app-context"
import { brandById, dishById, formatINR, freeOptionsFor } from "@/lib/bogo-data"

interface PairingSheetProps {
  lineId: string | null
  onClose: () => void
  onPick: (lineId: string) => void
}

// Step 2 of the brief: a purple pairing prompt with a yellow "Pick Your Free Dish Now" CTA.
export function PairingSheet({ lineId, onClose, onPick }: PairingSheetProps) {
  const { cart } = useBogoApp()
  const line = cart.lines.find((l) => l.id === lineId)

  return (
    <Sheet open={Boolean(line)} onClose={onClose} label="Pick your free dish" tone="purple">
      {line && (
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD200] text-[#5B2B91]">
            <Gift className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-extrabold">Great choice!</h3>
          <p className="mt-1 text-white/85">
            {dishById(line.paidDishId).name} is in your cart. Your free dish is waiting.
          </p>
          <p className="mt-1 text-sm text-white/70">
            Pick anything from {brandById(dishById(line.paidDishId).brandId).name} up to{" "}
            {formatINR(dishById(line.paidDishId).price)}, at ₹0.
          </p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => onPick(line.id)}
              className="h-14 w-full rounded-2xl bg-[#FFD200] text-base font-extrabold text-[#2b1146] shadow-lg transition hover:brightness-95"
            >
              Pick Your Free Dish Now
            </button>
            <button
              onClick={onClose}
              className="h-14 w-full rounded-2xl bg-white text-base font-bold text-[#5B2B91] transition hover:bg-white/90"
            >
              Browse All
            </button>
          </div>
        </div>
      )}
    </Sheet>
  )
}

interface FreePickerProps {
  lineId: string | null
  onClose: () => void
}

// Step 3: the chosen free dish lands in the cart with a ₹0 tag.
export function FreeDishPicker({ lineId, onClose }: FreePickerProps) {
  const { cart, dispatch, showToast } = useBogoApp()
  const line = cart.lines.find((l) => l.id === lineId)

  return (
    <Sheet open={Boolean(line)} onClose={onClose} label="Choose your free dish">
      {line && (
        <>
          <p className="text-xs font-bold tracking-wider text-[#5B2B91] uppercase">Your free dish</p>
          <h3 className="mt-1 pr-10 text-xl font-extrabold">
            Free with {dishById(line.paidDishId).name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Same brand, same price or less. It is added at ₹0.
          </p>
          <ul className="mt-4 space-y-3">
            {freeOptionsFor(line.paidDishId).map((dish) => {
              const selected = line.freeDishId === dish.id
              return (
                <li key={dish.id}>
                  <button
                    onClick={() => {
                      dispatch({ type: "set-free", lineId: line.id, dishId: dish.id })
                      showToast(`${dish.name} added at ₹0`)
                      onClose()
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 p-2.5 text-left transition ${
                      selected ? "border-[#5B2B91] bg-[#5B2B91]/5" : "border-gray-100 hover:border-[#5B2B91]/40"
                    }`}
                  >
                    <DishArt kind={dish.art} label={dish.name} className="h-16 w-20 shrink-0 rounded-xl" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <VegMark veg={dish.veg} />
                        <span className="truncate font-bold">{dish.name}</span>
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="rounded-md bg-[#FFD200] px-1.5 py-0.5 text-xs font-extrabold text-[#2b1146]">₹0 – Free</span>
                        <span className="text-sm text-gray-400 line-through">{formatINR(dish.price)}</span>
                      </span>
                    </span>
                    {selected && <Check className="h-5 w-5 text-[#5B2B91]" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </Sheet>
  )
}

export function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] ${
        veg ? "border-green-600" : "border-red-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-green-600" : "bg-red-700"}`} />
    </span>
  )
}
