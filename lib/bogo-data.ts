import type { DishArtKind } from "@/app/components/dish-art"

export type Cuisine = "Pizza" | "Rolls" | "Biryani" | "Burgers" | "Desserts" | "Italian"
export type MealType = "Mains" | "Combos" | "Sides" | "Desserts"

export interface Brand {
  id: string
  name: string
  tagline: string
  cuisine: Cuisine
  rating: number
  deliveryMins: number
  // Share of BOGO orders in the prototype's made-up ranking, used for "Most Popular in BOGO"
  popularity: number
  // The pair shown on the brand card: [paid dish, suggested free dish]
  heroPair: [string, string]
}

export interface Dish {
  id: string
  brandId: string
  name: string
  description: string
  price: number
  veg: boolean
  mealType: MealType
  art: DishArtKind
}

export interface DayTheme {
  day: string
  short: string
  title: string
  // Which BOGO Zone chip the day opens, or the dedicated Italian Day screen
  chip: string | "italian"
}

export const BRAND_PURPLE = "#5B2B91"
export const BRAND_YELLOW = "#FFD200"

export const brands: Brand[] = [
  {
    id: "ovenstory",
    name: "Ovenstory Pizza",
    tagline: "Pizzas & Italian",
    cuisine: "Pizza",
    rating: 4.3,
    deliveryMins: 25,
    popularity: 92,
    heroPair: ["os-margherita", "os-cheese-burst"],
  },
  {
    id: "faasos",
    name: "Faasos",
    tagline: "Rolls & Wraps",
    cuisine: "Rolls",
    rating: 4.1,
    deliveryMins: 20,
    popularity: 88,
    heroPair: ["fa-paneer-tikka", "fa-veg-seekh"],
  },
  {
    id: "behrouz",
    name: "Behrouz Biryani",
    tagline: "Royal Biryani",
    cuisine: "Biryani",
    rating: 4.5,
    deliveryMins: 30,
    popularity: 95,
    heroPair: ["bb-chicken-dum", "bb-veg"],
  },
  {
    id: "wendys",
    name: "Wendy's",
    tagline: "Burgers & Fries",
    cuisine: "Burgers",
    rating: 4.2,
    deliveryMins: 22,
    popularity: 80,
    heroPair: ["we-classic", "we-chicken"],
  },
  {
    id: "sweet-truth",
    name: "Sweet Truth",
    tagline: "Desserts & Cakes",
    cuisine: "Desserts",
    rating: 4.6,
    deliveryMins: 18,
    popularity: 74,
    heroPair: ["st-brownie", "st-cake"],
  },
  {
    id: "italian-day",
    name: "Italian BOGO Day",
    tagline: "Pizza, pasta & dolci",
    cuisine: "Italian",
    rating: 4.4,
    deliveryMins: 28,
    popularity: 70,
    heroPair: ["it-lasagna-chicken", "it-pesto"],
  },
]

export const dishes: Dish[] = [
  // Ovenstory
  { id: "os-margherita", brandId: "ovenstory", name: "Margherita Pizza", description: "Tomato, mozzarella, basil", price: 399, veg: true, mealType: "Mains", art: "pizza-margherita" },
  { id: "os-cheese-burst", brandId: "ovenstory", name: "Cheese Burst Pizza", description: "Molten cheese-filled crust", price: 399, veg: true, mealType: "Mains", art: "pizza-cheese-burst" },
  { id: "os-farmhouse", brandId: "ovenstory", name: "Farmhouse Pizza", description: "Capsicum, onion, tomato, corn", price: 379, veg: true, mealType: "Mains", art: "pizza-farmhouse" },
  { id: "os-pepperoni", brandId: "ovenstory", name: "Chicken Pepperoni Pizza", description: "Chicken pepperoni, mozzarella", price: 449, veg: false, mealType: "Mains", art: "pizza-pepperoni" },
  { id: "os-breadsticks", brandId: "ovenstory", name: "Garlic Breadsticks", description: "With cheesy dip", price: 149, veg: true, mealType: "Sides", art: "breadsticks" },

  // Faasos
  { id: "fa-paneer-tikka", brandId: "faasos", name: "Paneer Tikka Roll", description: "Tandoori paneer, onions, mint mayo", price: 249, veg: true, mealType: "Mains", art: "roll-paneer" },
  { id: "fa-veg-seekh", brandId: "faasos", name: "Veg Seekh Roll", description: "Spiced veg seekh, pickled onions", price: 249, veg: true, mealType: "Mains", art: "roll-veg-seekh" },
  { id: "fa-chicken-tikka", brandId: "faasos", name: "Chicken Tikka Roll", description: "Smoky chicken tikka, green chutney", price: 269, veg: false, mealType: "Mains", art: "roll-chicken" },
  { id: "fa-roll-combo", brandId: "faasos", name: "Roll + Fries Combo", description: "Any classic roll with peri-peri fries", price: 299, veg: true, mealType: "Combos", art: "roll-combo" },

  // Behrouz
  { id: "bb-chicken-dum", brandId: "behrouz", name: "Chicken Dum Biryani", description: "Slow-cooked, saffron rice", price: 329, veg: false, mealType: "Mains", art: "biryani-chicken" },
  { id: "bb-veg", brandId: "behrouz", name: "Veg Biryani", description: "Seasonal veg, fried onions", price: 329, veg: true, mealType: "Mains", art: "biryani-veg" },
  { id: "bb-kebab-combo", brandId: "behrouz", name: "Biryani + Kebab Combo", description: "Chicken biryani with seekh kebab", price: 449, veg: false, mealType: "Combos", art: "biryani-combo" },

  // Wendy's
  { id: "we-classic", brandId: "wendys", name: "Classic Burger", description: "Patty, cheese, lettuce, tomato", price: 299, veg: false, mealType: "Mains", art: "burger-classic" },
  { id: "we-chicken", brandId: "wendys", name: "Crispy Chicken Burger", description: "Crunchy fillet, house mayo", price: 299, veg: false, mealType: "Mains", art: "burger-chicken" },
  { id: "we-veg", brandId: "wendys", name: "Veggie Burger", description: "Spiced veg patty, cheese", price: 249, veg: true, mealType: "Mains", art: "burger-veg" },
  { id: "we-fries", brandId: "wendys", name: "Natural-cut Fries", description: "Sea-salted, medium", price: 129, veg: true, mealType: "Sides", art: "fries" },

  // Sweet Truth
  { id: "st-brownie", brandId: "sweet-truth", name: "Chocolate Brownies", description: "Two fudgy walnut brownies", price: 199, veg: true, mealType: "Desserts", art: "brownie" },
  { id: "st-cake", brandId: "sweet-truth", name: "Chocolate Truffle Cake", description: "Slice, with a cherry on top", price: 199, veg: true, mealType: "Desserts", art: "cake" },
  { id: "st-lava", brandId: "sweet-truth", name: "Choco Lava Cake", description: "Molten centre", price: 149, veg: true, mealType: "Desserts", art: "lava-cake" },

  // Italian BOGO Day
  { id: "it-margherita", brandId: "italian-day", name: "Margherita Pizza", description: "Fresh basil, mozzarella, tomato sauce", price: 299, veg: true, mealType: "Mains", art: "pizza-margherita" },
  { id: "it-pepperoni", brandId: "italian-day", name: "Pepperoni Pizza", description: "Spicy pepperoni, tangy tomato base", price: 399, veg: false, mealType: "Mains", art: "pizza-pepperoni" },
  { id: "it-four-cheese", brandId: "italian-day", name: "Four Cheese Pizza", description: "Mozzarella, parmesan, cheddar, gouda", price: 449, veg: true, mealType: "Mains", art: "pizza-four-cheese" },
  { id: "it-pesto", brandId: "italian-day", name: "Pesto Penne Pasta", description: "Basil pesto, toasted pine nuts", price: 349, veg: true, mealType: "Mains", art: "pasta-pesto" },
  { id: "it-alfredo", brandId: "italian-day", name: "Alfredo Fettuccine", description: "Parmesan cream sauce, garlic", price: 379, veg: true, mealType: "Mains", art: "pasta-alfredo" },
  { id: "it-aglio", brandId: "italian-day", name: "Spaghetti Aglio e Olio", description: "Olive oil, garlic, chilli flakes", price: 299, veg: true, mealType: "Mains", art: "pasta-aglio" },
  { id: "it-lasagna-chicken", brandId: "italian-day", name: "Chicken Lasagna", description: "Chicken ragù, béchamel, cheese", price: 449, veg: false, mealType: "Mains", art: "lasagna-chicken" },
  { id: "it-lasagna-veg", brandId: "italian-day", name: "Veg Lasagna", description: "Spinach, zucchini, ricotta, marinara", price: 429, veg: true, mealType: "Mains", art: "lasagna-veg" },
  { id: "it-risotto", brandId: "italian-day", name: "Mushroom Risotto", description: "Arborio rice, mushrooms, parmesan", price: 399, veg: true, mealType: "Mains", art: "risotto" },
  { id: "it-bruschetta", brandId: "italian-day", name: "Bruschetta", description: "Grilled bread, tomatoes, basil", price: 249, veg: true, mealType: "Sides", art: "bruschetta" },
  { id: "it-garlic-bread", brandId: "italian-day", name: "Cheesy Garlic Bread", description: "Golden crust, gooey cheese", price: 199, veg: true, mealType: "Sides", art: "garlic-bread" },
  { id: "it-tiramisu", brandId: "italian-day", name: "Tiramisu", description: "Espresso sponge, mascarpone", price: 249, veg: true, mealType: "Desserts", art: "tiramisu" },
  { id: "it-panna-cotta", brandId: "italian-day", name: "Panna Cotta", description: "Vanilla, berry coulis", price: 229, veg: true, mealType: "Desserts", art: "panna-cotta" },
  { id: "it-cannoli", brandId: "italian-day", name: "Cannoli", description: "Crisp shells, sweet ricotta", price: 249, veg: true, mealType: "Desserts", art: "cannoli" },
  { id: "it-gelato", brandId: "italian-day", name: "Gelato (2 scoops)", description: "Pistachio and strawberry", price: 199, veg: true, mealType: "Desserts", art: "gelato" },
]

export interface AddOn {
  id: string
  name: string
  price: number
  art: DishArtKind
}

export const addOns: AddOn[] = [
  { id: "addon-cola", name: "Coke (300 ml)", price: 79, art: "cola" },
  { id: "addon-lava", name: "Choco Lava Cake", price: 79, art: "lava-cake" },
]

// One cuisine gets the spotlight each day; BOGO itself stays on every day.
export const weekThemes: DayTheme[] = [
  { day: "Sunday", short: "Sun", title: "Family Combo Sunday", chip: "Combos" },
  { day: "Monday", short: "Mon", title: "Biryani Monday", chip: "Biryani" },
  { day: "Tuesday", short: "Tue", title: "Roll Tuesday", chip: "Rolls" },
  { day: "Wednesday", short: "Wed", title: "Burger Wednesday", chip: "Burgers" },
  { day: "Thursday", short: "Thu", title: "Dessert Thursday", chip: "Desserts" },
  { day: "Friday", short: "Fri", title: "Pizza Friday", chip: "Pizza" },
  { day: "Saturday", short: "Sat", title: "Italian BOGO Day", chip: "italian" },
]

export const dishById = (id: string) => {
  const dish = dishes.find((d) => d.id === id)
  if (!dish) throw new Error(`Unknown dish ${id}`)
  return dish
}

export const brandById = (id: string) => {
  const brand = brands.find((b) => b.id === id)
  if (!brand) throw new Error(`Unknown brand ${id}`)
  return brand
}

export const addOnById = (id: string) => {
  const addOn = addOns.find((a) => a.id === id)
  if (!addOn) throw new Error(`Unknown add-on ${id}`)
  return addOn
}

export const dishesForBrand = (brandId: string) => dishes.filter((d) => d.brandId === brandId)

// The BOGO rule used throughout the prototype: the free dish comes from the same brand
// and costs the same or less than the dish you paid for.
export const freeOptionsFor = (paidDishId: string) => {
  const paid = dishById(paidDishId)
  return dishes
    .filter((d) => d.brandId === paid.brandId && d.price <= paid.price)
    .sort((a, b) => b.price - a.price)
}

export const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`
