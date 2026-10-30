"use client"

import { createContext, useContext, type Dispatch } from "react"
import type { CartAction, CartState, Totals } from "@/lib/cart"

export type Screen = "home" | "bogo" | "italian" | "search" | "cart" | "checkout" | "celebration" | "profile"

export interface BogoApp {
  screen: Screen
  navigate: (screen: Screen, options?: { chip?: string }) => void
  bogoChip: string
  setBogoChip: (chip: string) => void
  cart: CartState
  totals: Totals
  dispatch: Dispatch<CartAction>
  // Step 1 of the brief: add a paid dish, then nudge the customer to pick the free one
  addPaid: (dishId: string) => void
  addPair: (paidDishId: string, freeDishId: string) => void
  openFreePicker: (lineId: string) => void
  showToast: (message: string) => void
}

export const BogoAppContext = createContext<BogoApp | null>(null)

export function useBogoApp() {
  const app = useContext(BogoAppContext)
  if (!app) throw new Error("useBogoApp must be used inside BogoAppContext")
  return app
}
