"use client"

import { useMemo, useState, type ReactNode } from "react"
import { ArrowLeft, ChevronRight, Clock, Plus, Search, ShoppingBag, SlidersHorizontal, Star } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import DishArt from "./dish-art"
import Sheet from "./sheet"
import { VegMark } from "./bogo-sheets"
import { useBogoApp } from "./app-context"
import { brands, dishById, dishesForBrand, formatINR, type Brand, type Dish } from "@/lib/bogo-data"

const chips = ["All", "Pizza", "Rolls", "Biryani", "Burgers", "Desserts", "Combos", "Sides"]
const cuisineOptions = ["Pizza", "Rolls", "Biryani", "Burgers", "Desserts"]
const mealTypeOptions = ["Combos", "Mains", "Sides"]
const PRICE_MIN = 100
const PRICE_MAX = 500

type SortKey = "popular" | "savings" | "fastest"
const sortLabels: Record<SortKey, string> = {
  popular: "Most Popular in BOGO",
  savings: "Highest Savings",
  fastest: "Fastest Delivery",
}

interface Filters {
  cuisines: string[]
  brands: string[]
  mealTypes: string[]
  price: [number, number]
}

const emptyFilters: Filters = { cuisines: [], brands: [], mealTypes: [], price: [PRICE_MIN, PRICE_MAX] }

const zoneBrands = brands.filter((b) => b.id !== "italian-day")

export default function BOGOZone() {
  const { navigate, bogoChip, setBogoChip, addPaid, addPair, totals } = useBogoApp()
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("popular")
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeFilterCount =
    filters.cuisines.length +
    filters.brands.length +
    filters.mealTypes.length +
    (filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX ? 1 : 0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const chipMealType = bogoChip === "Combos" || bogoChip === "Sides" ? bogoChip : null

    // A brand-name hit keeps every dish of that brand; otherwise the dish name has to match
    const matchesDish = (d: Dish, brandHit: boolean) =>
      (!chipMealType || d.mealType === chipMealType) &&
      (filters.mealTypes.length === 0 || filters.mealTypes.includes(d.mealType)) &&
      d.price >= filters.price[0] &&
      d.price <= filters.price[1] &&
      (brandHit || !q || d.name.toLowerCase().includes(q))

    const list = zoneBrands
      .filter((b) => bogoChip === "All" || chipMealType || b.cuisine === bogoChip)
      .filter((b) => filters.cuisines.length === 0 || filters.cuisines.includes(b.cuisine))
      .filter((b) => filters.brands.length === 0 || filters.brands.includes(b.id))
      .map((b) => {
        const brandHit = Boolean(q) && b.name.toLowerCase().includes(q)
        const matching = dishesForBrand(b.id).filter((d) => matchesDish(d, brandHit))
        return { brand: b, matching }
      })
      .filter((r) => r.matching.length > 0)

    const savings = (b: Brand) => dishById(b.heroPair[1]).price
    return list.sort((a, b) =>
      sort === "popular"
        ? b.brand.popularity - a.brand.popularity
        : sort === "savings"
          ? savings(b.brand) - savings(a.brand)
          : a.brand.deliveryMins - b.brand.deliveryMins,
    )
  }, [bogoChip, filters, query, sort])

  const toggle = (key: "cuisines" | "brands" | "mealTypes", value: string) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }))

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <header className="bg-[#5B2B91] px-4 pt-4 pb-3 text-white">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("home")} aria-label="Back" className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/15">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-extrabold">BOGO Zone</h1>
            <p className="text-sm text-white/80">Buy 1, get 1 free from the same brand</p>
          </div>
          <button
            onClick={() => navigate("cart")}
            aria-label={`Cart, ${totals.itemCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
          >
            <ShoppingBag className="h-5 w-5" />
            {totals.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFD200] px-1 text-[11px] font-extrabold text-[#2b1146]">
                {totals.itemCount}
              </span>
            )}
          </button>
        </div>

        <label className="relative mt-3 block">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-white/60" />
          <span className="sr-only">Search BOGO dishes</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes or brands"
            className="h-11 w-full rounded-xl bg-white/15 pr-3 pl-10 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/40"
          />
        </label>

        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setBogoChip(chip)}
              aria-pressed={bogoChip === chip}
              className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                bogoChip === chip ? "bg-white text-[#5B2B91]" : "text-white ring-1 ring-white/35 hover:bg-white/10"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </header>

      {/* Filter + sort */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-4 py-3">
        <button
          onClick={() => {
            setDraft(filters)
            setFiltersOpen(true)
          }}
          className="flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5B2B91] px-1 text-[11px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-9 w-full appearance-none truncate rounded-xl bg-white pr-8 pl-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 outline-none"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
          <ChevronRight className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 rotate-90 text-gray-500" />
        </label>
      </div>

      <p className="px-4 pt-3 text-sm text-gray-500">
        {results.length} {results.length === 1 ? "brand" : "brands"} on BOGO
        {bogoChip !== "All" && <span> · {bogoChip}</span>}
      </p>

      {/* Brand cards */}
      <div className="space-y-4 px-4 py-3">
        {results.map(({ brand, matching }) => {
          const [paid, free] = brand.heroPair.map(dishById)
          return (
            <article key={brand.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
              <div className="flex items-start justify-between px-4 pt-4">
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">{brand.name}</h2>
                  <p className="text-sm text-gray-500">{brand.tagline}</p>
                </div>
                <div className="text-right text-sm">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-1.5 py-0.5 font-bold text-white">
                    {brand.rating}
                    <Star className="h-3 w-3 fill-white" />
                  </span>
                  <p className="mt-1 flex items-center justify-end gap-1 text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    {brand.deliveryMins} mins
                  </p>
                </div>
              </div>

              <div className="flex items-stretch gap-2 px-4 pt-3">
                <PairTile dish={paid} tag="PAID" />
                <div className="flex items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD200] text-[#2b1146]">
                    <Plus className="h-5 w-5" strokeWidth={3} />
                  </span>
                </div>
                <PairTile dish={free} tag="FREE" />
              </div>

              <div className="px-4 pt-3">
                <button
                  onClick={() => addPair(paid.id, free.id)}
                  className="h-12 w-full rounded-2xl bg-[#5B2B91] text-base font-extrabold text-white transition hover:bg-[#4A2280]"
                >
                  ADD BOTH FOR {formatINR(paid.price)}
                  <span className="ml-2 text-sm font-semibold text-white/70 line-through">{formatINR(paid.price + free.price)}</span>
                </button>
              </div>

              <div className="mt-4 border-t border-gray-100 px-4 pt-3 pb-4">
                <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Or pick your own pair</p>
                <ul className="mt-2 space-y-2">
                  {matching.map((dish) => (
                    <li key={dish.id} className="flex items-center gap-3">
                      <DishArt kind={dish.art} label={dish.name} className="h-12 w-14 shrink-0 rounded-xl" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                          <VegMark veg={dish.veg} />
                          <span className="truncate">{dish.name}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatINR(dish.price)} · {dish.mealType}
                        </p>
                      </div>
                      <button
                        onClick={() => addPaid(dish.id)}
                        className="h-8 shrink-0 rounded-lg border-2 border-[#5B2B91] px-3 text-xs font-extrabold text-[#5B2B91] transition hover:bg-[#5B2B91] hover:text-white"
                      >
                        ADD
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}

        {results.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-gray-100">
            <p className="font-bold text-gray-900">No BOGO deals match that</p>
            <p className="mt-1 text-sm text-gray-500">Try another chip or clear your filters.</p>
            <button
              onClick={() => {
                setFilters(emptyFilters)
                setQuery("")
                setBogoChip("All")
              }}
              className="mt-4 h-10 rounded-xl bg-[#5B2B91] px-5 text-sm font-bold text-white"
            >
              Clear everything
            </button>
          </div>
        )}

        <button
          onClick={() => navigate("italian")}
          className="flex w-full items-center gap-3 rounded-3xl bg-white p-3 text-left ring-1 ring-gray-100"
        >
          <DishArt kind="lasagna-chicken" label="Lasagna" className="h-14 w-16 shrink-0 rounded-xl" />
          <span className="flex-1">
            <span className="block font-extrabold text-gray-900">Italian BOGO Day</span>
            <span className="block text-sm text-gray-500">15 Italian dishes, every Saturday</span>
          </span>
          <ChevronRight className="h-5 w-5 text-[#5B2B91]" />
        </button>
      </div>

      {/* Filters sheet */}
      <Sheet open={filtersOpen} onClose={() => setFiltersOpen(false)} label="Filters">
        <h3 className="pr-10 text-xl font-extrabold">Filters</h3>
        <FilterGroup title="Cuisine">
          {cuisineOptions.map((c) => (
            <CheckRow key={c} id={`f-c-${c}`} label={c} checked={draft.cuisines.includes(c)} onChange={() => toggle("cuisines", c)} />
          ))}
        </FilterGroup>
        <FilterGroup title="Brand">
          {zoneBrands.map((b) => (
            <CheckRow key={b.id} id={`f-b-${b.id}`} label={b.name} checked={draft.brands.includes(b.id)} onChange={() => toggle("brands", b.id)} />
          ))}
        </FilterGroup>
        <FilterGroup title="Meal type">
          {mealTypeOptions.map((m) => (
            <CheckRow key={m} id={`f-m-${m}`} label={m} checked={draft.mealTypes.includes(m)} onChange={() => toggle("mealTypes", m)} />
          ))}
        </FilterGroup>
        <div className="mt-5">
          <h4 className="font-bold">Price range</h4>
          <Slider
            className="mt-4"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={draft.price}
            onValueChange={(v) => setDraft((d) => ({ ...d, price: [v[0], v[1]] }))}
            aria-label="Price range"
          />
          <div className="mt-2 flex justify-between text-sm font-semibold text-gray-600">
            <span>{formatINR(draft.price[0])}</span>
            <span>{formatINR(draft.price[1])}</span>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setDraft(emptyFilters)} className="h-12 flex-1 rounded-2xl font-bold text-[#5B2B91] ring-2 ring-[#5B2B91]">
            Reset
          </button>
          <button
            onClick={() => {
              setFilters(draft)
              setFiltersOpen(false)
            }}
            className="h-12 flex-[2] rounded-2xl bg-[#5B2B91] font-extrabold text-white"
          >
            Show results
          </button>
        </div>
      </Sheet>
    </div>
  )
}

function PairTile({ dish, tag }: { dish: Dish; tag: "PAID" | "FREE" }) {
  const free = tag === "FREE"
  return (
    <div className="min-w-0 flex-1">
      <div className="relative">
        <DishArt kind={dish.art} label={dish.name} className="h-28 w-full rounded-2xl" />
        <span
          className={`absolute top-2 left-2 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${
            free ? "bg-[#FFD200] text-[#2b1146]" : "bg-[#5B2B91] text-white"
          }`}
        >
          {tag}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-tight font-bold text-gray-900">{dish.name}</p>
      {free ? (
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5">
          <span className="rounded-md bg-[#FFD200] px-1.5 py-0.5 text-xs font-extrabold text-[#2b1146]">₹0 – Free</span>
          <span className="text-xs text-gray-400 line-through">{formatINR(dish.price)}</span>
        </p>
      ) : (
        <p className="mt-1 text-base font-extrabold text-[#5B2B91]">{formatINR(dish.price)}</p>
      )}
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="mt-5">
      <legend className="font-bold">{title}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">{children}</div>
    </fieldset>
  )
}

function CheckRow({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl bg-gray-50 px-3 text-sm font-medium">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  )
}
