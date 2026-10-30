"use client"

import { useEffect, useState } from "react"
import { Bell, ChevronDown, ChevronRight, MapPin, Search, Star } from "lucide-react"
import DishArt, { type DishArtKind } from "./dish-art"
import { useBogoApp } from "./app-context"
import { brands, dishById, dishes, formatINR, weekThemes } from "@/lib/bogo-data"

const crazyDeals = [
  { brandId: "ovenstory", title: "Pizza BOGO" },
  { brandId: "faasos", title: "Rolls BOGO" },
  { brandId: "behrouz", title: "Biryani BOGO" },
  { brandId: "wendys", title: "Burgers BOGO" },
  { brandId: "sweet-truth", title: "Desserts BOGO" },
]

const quickCategories: { name: string; art: DishArtKind }[] = [
  { name: "Pizza", art: "pizza-margherita" },
  { name: "Rolls", art: "roll-paneer" },
  { name: "Biryani", art: "biryani-chicken" },
  { name: "Burgers", art: "burger-classic" },
  { name: "Desserts", art: "brownie" },
  { name: "Combos", art: "biryani-combo" },
  { name: "Sides", art: "fries" },
  { name: "Italian", art: "pasta-alfredo" },
]

const dayArt: Record<string, DishArtKind> = {
  Combos: "roll-combo",
  Biryani: "biryani-chicken",
  Rolls: "roll-paneer",
  Burgers: "burger-classic",
  Desserts: "cake",
  Pizza: "pizza-pepperoni",
  italian: "lasagna-veg",
}

export default function HomePage() {
  const { navigate, addPaid, cart } = useBogoApp()
  // Today's weekday is only known in the browser, so it is filled in after mount
  const [today, setToday] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    const day = new Date().getDay()
    setToday(day)
    setSelectedDay(day)
  }, [])

  const openChip = (chip: string) => (chip === "italian" || chip === "Italian" ? navigate("italian") : navigate("bogo", { chip }))
  const bogoDishCount = dishes.length
  const brandCount = brands.filter((b) => b.id !== "italian-day").length
  const theme = selectedDay === null ? null : weekThemes[selectedDay]

  return (
    <div className="bg-white">
      <div className="bg-[#5B2B91]/8 px-4 py-1.5 text-center text-[11px] font-medium text-[#5B2B91] md:hidden">
        Concept prototype · not the real EatSure app
      </div>

      {/* Header */}
      <header className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-2xl font-black tracking-tight text-[#5B2B91]">
              Eat<span className="text-[#1d0d33]">Sure</span>
            </p>
            <button className="mt-0.5 flex items-center text-sm text-gray-600">
              <MapPin className="mr-1 h-4 w-4 text-[#5B2B91]" />
              <span className="truncate font-semibold text-gray-800">Koramangala</span>
              <span className="ml-1 truncate">· Bengaluru</span>
              <ChevronDown className="ml-0.5 h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <button
              aria-label="Account"
              onClick={() => navigate("profile")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B2B91] text-lg font-bold text-white"
            >
              G
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("search")}
          className="mt-3 flex h-12 w-full items-center gap-2 rounded-2xl bg-gray-50 px-3 text-left text-sm text-gray-400 ring-1 ring-gray-100"
        >
          <Search className="h-5 w-5" />
          Search for dishes, brands…
        </button>
      </header>

      {/* Hero banner */}
      <section className="relative mx-4 overflow-hidden rounded-[28px] bg-[#5B2B91] px-5 pt-6 pb-5 text-white">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" aria-hidden />
        <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#FFD200]/15" aria-hidden />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.2em] text-[#FFD200] uppercase">Always on · every day</p>
          <h1 className="mt-2 text-[34px] leading-[0.95] font-black uppercase">
            Unlimited
            <br />
            Buy 1 Get 1{" "}
            <span className="inline-block -rotate-3 rounded-lg bg-[#FFD200] px-2 py-0.5 text-[#2b1146]">Free</span>
          </h1>
          <p className="mt-3 text-sm text-white/85">
            {bogoDishCount} dishes from {brandCount} brands and Italian Day. No minimum order, no code to apply.
          </p>

          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
            {quickCategories.slice(0, 5).map((c) => (
              <button
                key={c.name}
                onClick={() => openChip(c.name)}
                className="w-[132px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white/12 text-left ring-1 ring-white/15"
              >
                <DishArt kind={c.art} label={c.name} className="h-[84px] w-full" />
                <span className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-bold">{c.name}</span>
                  <span className="rounded-md bg-[#FFD200] px-1.5 text-[11px] font-extrabold text-[#2b1146]">1+1</span>
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("bogo", { chip: "All" })}
            className="mt-4 h-12 w-full rounded-2xl bg-white text-base font-extrabold tracking-wide text-[#5B2B91] shadow-lg"
          >
            EXPLORE BOGO ZONE
          </button>
        </div>
      </section>

      {/* Day-wise themes */}
      <section className="px-4 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">BOGO all week</h2>
            <p className="text-xs text-gray-500">Every brand is on BOGO daily. One cuisine gets the spotlight.</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {weekThemes.map((d, i) => {
            const active = selectedDay === i
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(i)}
                aria-pressed={active}
                className={`flex h-14 flex-col items-center justify-center rounded-2xl text-xs font-bold transition ${
                  active ? "bg-[#5B2B91] text-white shadow-md" : "bg-gray-50 text-gray-600"
                }`}
              >
                {d.short}
                <span className={`mt-1 h-1.5 w-1.5 rounded-full ${today === i ? "bg-[#FFD200]" : "bg-transparent"}`} />
              </button>
            )
          })}
        </div>
        {theme && (
          <button
            onClick={() => openChip(theme.chip)}
            className="mt-3 flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-[#FFF6CC] p-2 pr-3 text-left ring-1 ring-[#FFD200]/60"
          >
            <DishArt kind={dayArt[theme.chip]} label={theme.title} className="h-16 w-20 shrink-0 rounded-xl" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold tracking-wider text-[#5B2B91] uppercase">
                {selectedDay === today ? "Today" : theme.day}
              </span>
              <span className="block truncate font-extrabold text-gray-900">{theme.title}</span>
              <span className="block text-xs text-gray-600">Spotlight deals, still Buy 1 Get 1</span>
            </span>
            <ChevronRight className="h-5 w-5 text-[#5B2B91]" />
          </button>
        )}
      </section>

      {/* Quick categories */}
      <section className="px-4 pt-6">
        <h2 className="text-lg font-extrabold text-gray-900">What are you craving?</h2>
        <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-3">
          {quickCategories.map((c) => (
            <button key={c.name} onClick={() => openChip(c.name)} className="text-center">
              <DishArt kind={c.art} label={c.name} className="mx-auto h-16 w-16 rounded-2xl" />
              <span className="mt-1.5 block text-xs font-semibold text-gray-700">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Crazy Deals */}
      <section className="mt-6 bg-gray-50 py-5">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-extrabold text-gray-900">Crazy Deals</h2>
          <button onClick={() => navigate("bogo", { chip: "All" })} className="text-sm font-bold text-[#5B2B91]">
            View all
          </button>
        </div>
        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          {crazyDeals.map((deal) => {
            const brand = brands.find((b) => b.id === deal.brandId)!
            const paid = dishById(brand.heroPair[0])
            const inCart = cart.lines.some((l) => l.paidDishId === paid.id)
            return (
              <article key={deal.brandId} className="w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl bg-white shadow-md">
                <div className="relative">
                  <DishArt kind={paid.art} label={paid.name} className="h-36 w-full" />
                  <span className="absolute top-3 left-3 rounded-lg bg-[#FFD200] px-2 py-1 text-xs font-extrabold text-[#2b1146] shadow">
                    1+1 FREE
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="text-xs font-bold tracking-wider text-[#5B2B91] uppercase">{deal.title}</p>
                  <h3 className="mt-0.5 font-extrabold text-gray-900">Buy 1 Get 1 Free – {brand.name.replace(" Pizza", "")}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                    <Star className="h-3.5 w-3.5 fill-green-600 text-green-600" />
                    {brand.rating} · {brand.deliveryMins} mins
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <span className="text-base font-extrabold text-gray-900">{formatINR(paid.price)}</span> for 2
                    </p>
                    <button
                      onClick={() => addPaid(paid.id)}
                      className="h-9 rounded-xl border-2 border-[#5B2B91] px-4 text-sm font-extrabold text-[#5B2B91] transition hover:bg-[#5B2B91] hover:text-white"
                    >
                      {inCart ? "ADD +1" : "ADD"}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Italian day banner */}
      <section className="px-4 py-6">
        <button
          onClick={() => navigate("italian")}
          className="relative flex w-full items-center overflow-hidden rounded-3xl bg-[#1f6f43] text-left text-white"
        >
          <span className="absolute inset-y-0 right-0 w-2/5 bg-[#c8333b]" aria-hidden />
          <span className="absolute inset-y-0 right-[40%] w-[14%] bg-white" aria-hidden />
          <span className="relative z-10 flex-1 p-5">
            <span className="block text-[11px] font-bold tracking-[0.18em] text-[#FFD200] uppercase">Every Saturday</span>
            <span className="mt-1 block text-2xl leading-tight font-black">Italian BOGO Day</span>
            <span className="mt-1 block text-sm text-white/85">Pizza, pasta and dolci. Buy 1, get 1 free.</span>
            <span className="mt-3 inline-flex items-center rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-[#1f6f43]">
              See the menu <ChevronRight className="h-4 w-4" />
            </span>
          </span>
          <DishArt kind="pasta-pesto" label="Pesto pasta" className="relative z-10 mr-3 h-28 w-28 shrink-0 rounded-2xl shadow-lg" />
        </button>
      </section>
    </div>
  )
}
