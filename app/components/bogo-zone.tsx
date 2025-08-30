"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Filter, ChevronDown, Star, Clock, Plus, Search } from "lucide-react"
import Image from "next/image"

interface BOGOZoneProps {
  onNavigate: (screen: string) => void
  onAddToCart: () => void
}

export default function BOGOZone({ onNavigate, onAddToCart }: BOGOZoneProps) {
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [showPairingModal, setShowPairingModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const cuisines = ["All", "Pizza", "Rolls", "Biryani", "Burgers", "Desserts", "Combos", "Sides"]

  const restaurants = [
    {
      id: 1,
      name: "Ovenstory",
      cuisine: "Pizzas & Italian",
      rating: 4.3,
      time: "25 mins",
      mainDish: "Margherita Pizza",
      mainPrice: 399,
      freeDish: "Cheese Burst Pizza",
      freePrice: 399,
      image: "/images/pizza-margherita.png",
      freeImage: "/images/pizza-cheese-burst.png",
      category: "Pizza",
    },
    {
      id: 2,
      name: "Faasos",
      cuisine: "Rolls & Wraps",
      rating: 4.1,
      time: "20 mins",
      mainDish: "Paneer Tikka Roll",
      mainPrice: 249,
      freeDish: "Veg Seekh Roll",
      freePrice: 249,
      image: "/images/rolls-paneer.png",
      freeImage: "/images/rolls-veg-seekh.png",
      category: "Rolls",
    },
    {
      id: 3,
      name: "Behrouz Biryani",
      cuisine: "Biryani",
      rating: 4.5,
      time: "30 mins",
      mainDish: "Chicken Dum Biryani",
      mainPrice: 329,
      freeDish: "Veg Biryani",
      freePrice: 329,
      image: "/images/biryani-chicken.png",
      freeImage: "/images/biryani-veg.png",
      category: "Biryani",
    },
    {
      id: 4,
      name: "Wendy's",
      cuisine: "Burgers & Fast Food",
      rating: 4.2,
      time: "22 mins",
      mainDish: "Classic Burger",
      mainPrice: 299,
      freeDish: "Chicken Burger",
      freePrice: 299,
      image: "/images/burgers-classic.png",
      freeImage: "/images/burgers-chicken.png",
      category: "Burgers",
    },
    {
      id: 5,
      name: "Sweet Truth",
      cuisine: "Desserts",
      rating: 4.6,
      time: "18 mins",
      mainDish: "Chocolate Brownies",
      mainPrice: 199,
      freeDish: "Chocolate Cake",
      freePrice: 199,
      image: "/images/dessert-brownies.png",
      freeImage: "/images/dessert-cake.png",
      category: "Desserts",
    },
  ]

  const filteredRestaurants =
    selectedCuisine === "All"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.category === selectedCuisine)

  const handleAddToCart = (restaurant) => {
    setSelectedItem(restaurant)
    setShowPairingModal(true)
    onAddToCart()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#5B2B91] px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("home")}
              className="text-white hover:bg-white/20 mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">BOGO Zone</h1>
              <p className="text-white/80 text-sm">Buy 1 Get 1 Free on everything!</p>
            </div>
          </div>
          <Badge className="bg-[#FFD200] text-black hover:bg-[#FFD200] font-bold px-3 py-1">1+1 FREE</Badge>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search dishes..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur rounded-xl border-0 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {/* Cuisine Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {cuisines.map((cuisine) => (
            <Button
              key={cuisine}
              variant={selectedCuisine === cuisine ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCuisine(cuisine)}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-medium ${
                selectedCuisine === cuisine
                  ? "bg-white text-[#5B2B91] hover:bg-gray-100"
                  : "border-white/30 text-white hover:bg-white/20 bg-transparent"
              }`}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="px-4 py-4 bg-gray-50 border-b flex items-center justify-between">
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Cuisine</h4>
                <div className="space-y-3">
                  {["Pizza", "Rolls", "Biryani", "Burgers", "Desserts"].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-3">
                      <Checkbox id={cuisine} />
                      <label htmlFor={cuisine} className="text-sm font-medium">
                        {cuisine}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Brand</h4>
                <div className="space-y-3">
                  {["Ovenstory", "Faasos", "Behrouz Biryani", "Wendy's", "Sweet Truth"].map((brand) => (
                    <div key={brand} className="flex items-center space-x-3">
                      <Checkbox id={brand} />
                      <label htmlFor={brand} className="text-sm font-medium">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Meal Type</h4>
                <div className="space-y-3">
                  {["Combos", "Mains", "Sides"].map((meal) => (
                    <div key={meal} className="flex items-center space-x-3">
                      <Checkbox id={meal} />
                      <label htmlFor={meal} className="text-sm font-medium">
                        {meal}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <Slider defaultValue={[100, 500]} max={1000} step={50} className="w-full" />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹100</span>
                  <span>₹500</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white">
          Most Popular in BOGO
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Results Count */}
      <div className="px-4 py-3 bg-white border-b">
        <p className="text-sm text-gray-600">{filteredRestaurants.length} restaurants available with BOGO offer</p>
      </div>

      {/* Restaurant Cards */}
      <div className="px-4 py-4">
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden border-0 shadow-lg bg-white">
              {/* Restaurant Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-sm">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{restaurant.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOGO Deal */}
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Main Dish */}
                  <div className="flex-1">
                    <div className="relative">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.mainDish}
                        width={150}
                        height={120}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <Badge className="absolute top-2 left-2 bg-[#5B2B91] text-white hover:bg-[#5B2B91] text-xs font-bold">
                        PAID
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-bold text-base text-gray-900">{restaurant.mainDish}</h4>
                      <p className="text-lg font-bold text-[#5B2B91]">₹{restaurant.mainPrice}</p>
                    </div>
                  </div>

                  {/* Plus Sign */}
                  <div className="flex items-center justify-center px-2">
                    <div className="w-8 h-8 bg-[#FFD200] rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5 text-black font-bold" />
                    </div>
                  </div>

                  {/* Free Dish */}
                  <div className="flex-1">
                    <div className="relative">
                      <Image
                        src={restaurant.freeImage || "/placeholder.svg"}
                        alt={restaurant.freeDish}
                        width={150}
                        height={120}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <Badge className="absolute top-2 left-2 bg-[#FFD200] text-black hover:bg-[#FFD200] text-xs font-bold">
                        FREE
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-bold text-base text-gray-900">{restaurant.freeDish}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-[#FFD200]">₹0 – Free</p>
                        <p className="text-sm text-gray-500 line-through">₹{restaurant.freePrice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Button */}
                <Button
                  onClick={() => handleAddToCart(restaurant)}
                  className="w-full bg-[#5B2B91] hover:bg-[#4A2280] text-white font-bold py-3 text-base rounded-xl mt-4"
                >
                  ADD BOTH FOR ₹{restaurant.mainPrice}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add-to-Cart Guided Pairing Modal */}
      <Dialog open={showPairingModal} onOpenChange={setShowPairingModal}>
        <DialogContent className="max-w-sm mx-4">
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-[#5B2B91] rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#5B2B91] mb-2">Great choice!</h3>
            <p className="text-gray-600 mb-2 text-base">Your free item is waiting.</p>
            <p className="text-sm text-gray-500 mb-6">Pick your free dish now</p>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  setShowPairingModal(false)
                  onNavigate("cart")
                }}
                className="w-full bg-[#FFD200] text-black hover:bg-[#E6B800] font-bold py-4 text-base rounded-xl"
              >
                Pick Your Free Dish Now
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPairingModal(false)}
                className="w-full border-[#5B2B91] text-[#5B2B91] hover:bg-[#5B2B91]/10 py-4 text-base rounded-xl"
              >
                Browse All
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
