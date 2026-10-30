"use client"

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import HomePage from "./components/home-page"
import BOGOZone from "./components/bogo-zone"
import CartPage from "./components/cart-page"
import CheckoutPage from "./components/checkout-page"
import CelebrationPage from "./components/celebration-page"
import ItalianBOGODay from "./components/italian-bogo-day"
import SearchPage from "./components/search-page"
import ProfilePage from "./components/profile-page"
import BottomNavigation from "./components/bottom-navigation"
import CaseStudyPanel from "./components/case-study-panel"
import Toast from "./components/toast"
import { FreeDishPicker, PairingSheet } from "./components/bogo-sheets"
import { BogoAppContext, type BogoApp, type Screen } from "./components/app-context"
import { cartReducer, computeTotals, initialCart } from "@/lib/cart"
import { dishById } from "@/lib/bogo-data"

const NAV_SCREENS: Screen[] = ["home", "search", "bogo", "italian", "cart", "profile"]

export default function EatSureApp() {
  const [screen, setScreen] = useState<Screen>("home")
  const [bogoChip, setBogoChip] = useState("All")
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const [toast, setToast] = useState<string | null>(null)
  const [pairingLineId, setPairingLineId] = useState<string | null>(null)
  const [pickerLineId, setPickerLineId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const totals = useMemo(() => computeTotals(cart.lines, cart.addOns), [cart.lines, cart.addOns])

  const navigate = useCallback((next: Screen, options?: { chip?: string }) => {
    if (options?.chip) setBogoChip(options.chip)
    setScreen(next)
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
  }, [])

  const addPaid = useCallback(
    (dishId: string) => {
      // Work out which line the dish lands on so the pairing sheet can point at it
      const existing = cart.lines.find((l) => l.paidDishId === dishId && l.freeDishId === null)
      const lineId = existing?.id ?? `line-${cart.nextLineId}`
      dispatch({ type: "add-paid", dishId })
      showToast("Great choice! Your free item is waiting.")
      setPairingLineId(lineId)
    },
    [cart.lines, cart.nextLineId, showToast],
  )

  const addPair = useCallback(
    (paidDishId: string, freeDishId: string) => {
      dispatch({ type: "add-pair", paidDishId, freeDishId })
      showToast(`Pair added · you save ₹${dishById(freeDishId).price}`)
    },
    [showToast],
  )

  const openFreePicker = useCallback((lineId: string) => {
    setPairingLineId(null)
    setPickerLineId(lineId)
  }, [])

  const app: BogoApp = {
    screen,
    navigate,
    bogoChip,
    setBogoChip,
    cart,
    totals,
    dispatch,
    addPaid,
    addPair,
    openFreePicker,
    showToast,
  }

  // The case-study panel can jump to any step; later steps need something in the cart to show
  const jumpToStep = (step: number) => {
    setPairingLineId(null)
    setPickerLineId(null)
    const seedPair = () => {
      if (cart.lines.length === 0) dispatch({ type: "add-pair", paidDishId: "os-margherita", freeDishId: "os-cheese-burst" })
    }
    switch (step) {
      case 1:
        return navigate("home")
      case 2:
        return navigate("bogo", { chip: "All" })
      case 3:
        navigate("bogo", { chip: "All" })
        return addPaid("os-margherita")
      case 4:
        seedPair()
        return navigate("cart")
      case 5:
        seedPair()
        return navigate("checkout")
      case 6:
        if (cart.orders.length === 0) {
          seedPair()
          dispatch({ type: "place-order", address: "Home", payment: "UPI" })
        }
        return navigate("celebration")
    }
  }

  return (
    <BogoAppContext.Provider value={app}>
      <div className="min-h-[100dvh] bg-[#efe9f7] md:flex md:items-center md:justify-center md:gap-12 md:px-8 md:py-6 lg:gap-20">
        <CaseStudyPanel screen={screen} onJump={jumpToStep} />

        <div className="relative isolate h-[100dvh] w-full overflow-hidden bg-white md:h-[min(860px,calc(100dvh-48px))] md:w-[400px] md:shrink-0 md:rounded-[48px] md:border-[10px] md:border-[#17141d] md:shadow-[0_40px_80px_-20px_rgba(43,17,70,0.45)]">
          <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain">
            <div className={NAV_SCREENS.includes(screen) ? "pb-24" : ""}>
              {screen === "home" && <HomePage />}
              {screen === "bogo" && <BOGOZone />}
              {screen === "italian" && <ItalianBOGODay />}
              {screen === "search" && <SearchPage />}
              {screen === "cart" && <CartPage />}
              {screen === "checkout" && <CheckoutPage />}
              {screen === "celebration" && <CelebrationPage />}
              {screen === "profile" && <ProfilePage />}
            </div>
          </div>

          {NAV_SCREENS.includes(screen) && <BottomNavigation />}

          <PairingSheet lineId={pairingLineId} onClose={() => setPairingLineId(null)} onPick={openFreePicker} />
          <FreeDishPicker lineId={pickerLineId} onClose={() => setPickerLineId(null)} />
          <Toast message={toast} />
        </div>
      </div>
    </BogoAppContext.Provider>
  )
}
