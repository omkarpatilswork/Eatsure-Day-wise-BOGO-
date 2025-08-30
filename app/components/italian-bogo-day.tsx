"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Filter, Plus } from "lucide-react"
import Image from "next/image"

interface ItalianBOGODayProps {
  onNavigate: (screen: string) => void
  onAddToCart: () => void
}

export default function ItalianBOGODay({ onNavigate, onAddToCart }: ItalianBOGODayProps) {
  const italianDishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      description: "Fresh basil, mozzarella, tomato sauce.",
      image: "/images/italian/margherita-pizza.png",
      category: "Pizza",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 399,
      description: "Spicy pepperoni, mozzarella, tangy tomato base.",
      image: "/images/italian/pepperoni-pizza.png",
      category: "Pizza",
    },
    {
      id: 3,
      name: "Four Cheese Pizza",
      price: 449,
      description: "Mozzarella, parmesan, cheddar, gouda.",
      image: "/images/italian/four-cheese-pizza.png",
      category: "Pizza",
    },
    {
      id: 4,
      name: "Pesto Penne Pasta",
      price: 349,
      description: "Creamy basil pesto with toasted pine nuts.",
      image: "/images/italian/pesto-penne.png",
      category: "Pasta",
    },
    {
      id: 5,
      name: "Alfredo Fettuccine",
      price: 379,
      description: "Rich parmesan cream sauce with garlic.",
      image: "/images/italian/alfredo-fettuccine.png",
      category: "Pasta",
    },
    {
      id: 6,
      name: "Spaghetti Aglio e Olio",
      price: 299,
      description: "Olive oil, garlic, chili flakes.",
      image: "/images/italian/spaghetti-aglio-olio.png",
      category: "Pasta",
    },
    {
      id: 7,
      name: "Chicken Lasagna",
      price: 449,
      description: "Layers of pasta, chicken, béchamel, cheese.",
      image: "/images/italian/chicken-lasagna.png",
      category: "Pasta",
    },
    {
      id: 8,
      name: "Veg Lasagna",
      price: 429,
      description: "Spinach, zucchini, ricotta, marinara sauce.",
      image: "/images/italian/veg-lasagna.png",
      category: "Pasta",
    },
    {
      id: 9,
      name: "Mushroom Risotto",
      price: 399,
      description: "Arborio rice, porcini mushrooms, parmesan.",
      image: "/images/italian/mushroom-risotto.png",
      category: "Rice",
    },
    {
      id: 10,
      name: "Bruschetta",
      price: 249,
      description: "Grilled bread, tomatoes, basil, olive oil.",
      image: "/images/italian/bruschetta.png",
      category: "Appetizer",
    },
    {
      id: 11,
      name: "Garlic Bread with Cheese",
      price: 199,
      description: "Golden crust, gooey cheese topping.",
      image: "/images/italian/garlic-bread-cheese.png",
      category: "Appetizer",
    },
    {
      id: 12,
      name: "Tiramisu",
      price: 249,
      description: "Espresso-soaked sponge, mascarpone cream.",
      image: "/images/italian/tiramisu.png",
      category: "Dessert",
    },
    {
      id: 13,
      name: "Panna Cotta",
      price: 229,
      description: "Creamy vanilla set dessert with berry coulis.",
      image: "/images/italian/panna-cotta.png",
      category: "Dessert",
    },
    {
      id: 14,
      name: "Cannoli",
      price: 249,
      description: "Crispy shell with sweet ricotta filling.",
      image: "/images/italian/cannoli.png",
      category: "Dessert",
    },
    {
      id: 15,
      name: "Gelato (2 scoops)",
      price: 199,
      description: "Italian-style ice cream, assorted flavors.",
      image: "/images/italian/gelato.png",
      category: "Dessert",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("home")}
              className="text-gray-600 hover:bg-gray-100 mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Italian BOGO Day 🍕🍝</h1>
              <p className="text-gray-600 text-sm mt-1">Buy 1, Get 1 Free on all Italian favorites today only!</p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="border-gray-200 bg-transparent">
            <Filter className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Dish Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {italianDishes.map((dish) => (
            <Card
              key={dish.id}
              className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="relative">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  width={200}
                  height={140}
                  className="w-full h-36 object-cover"
                />

                {/* BOGO Badge - Red Corner Ribbon */}
                <div className="absolute top-0 right-0">
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-1 shadow-lg">
                    BOGO
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-bold text-base text-gray-900 leading-tight mb-1">{dish.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{dish.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-[#5B2B91]">₹{dish.price}</span>
                    <span className="text-xs text-green-600 font-medium">+ 1 FREE</span>
                  </div>

                  <Button
                    onClick={() => onAddToCart()}
                    size="sm"
                    className="bg-[#5B2B91] hover:bg-[#4A2280] text-white font-bold px-4 py-2 rounded-lg shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    ADD
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-6 bg-gradient-to-r from-[#5B2B91] to-[#6B3EFF] mx-4 mb-6 rounded-2xl">
        <div className="text-center text-white">
          <h3 className="text-xl font-bold mb-2">🇮🇹 Buongiorno Special!</h3>
          <p className="text-white/90 text-sm mb-4">Every Italian dish comes with a free pair. Limited time offer!</p>
          <Button
            onClick={() => onNavigate("cart")}
            className="bg-[#FFD200] text-black hover:bg-[#E6B800] font-bold px-8 py-3 rounded-xl"
          >
            View Cart & Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
