"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin, Search, Bell } from "lucide-react"
import Image from "next/image"

interface HomePageProps {
  onNavigate: (screen: string) => void
  onAddToCart: () => void
}

export default function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const cuisineSlides = [
    {
      name: "Pizza",
      image: "/images/pizza-margherita.png",
      color: "from-red-500 to-orange-500",
      description: "Italian classics",
    },
    {
      name: "Rolls",
      image: "/images/rolls-paneer.png",
      color: "from-green-500 to-teal-500",
      description: "Fresh wraps",
    },
    {
      name: "Biryani",
      image: "/images/biryani-chicken.png",
      color: "from-yellow-500 to-orange-500",
      description: "Aromatic rice",
    },
    {
      name: "Desserts",
      image: "/images/dessert-brownies.png",
      color: "from-pink-500 to-purple-500",
      description: "Sweet treats",
    },
  ]

  const bogoDeals = [
    {
      name: "Margherita Pizza",
      restaurant: "Ovenstory",
      originalPrice: 399,
      image: "/images/pizza-margherita.png",
      rating: 4.3,
      time: "25-30 min",
      description: "Buy 1 Get 1 Free",
    },
    {
      name: "Paneer Tikka Roll",
      restaurant: "Faasos",
      originalPrice: 249,
      image: "/images/rolls-paneer.png",
      rating: 4.1,
      time: "20-25 min",
      description: "Buy 1 Get 1 Free",
    },
    {
      name: "Chicken Dum Biryani",
      restaurant: "Behrouz Biryani",
      originalPrice: 329,
      image: "/images/biryani-chicken.png",
      rating: 4.5,
      time: "30-35 min",
      description: "Buy 1 Get 1 Free",
    },
    {
      name: "Classic Burger",
      restaurant: "Wendy's",
      originalPrice: 299,
      image: "/images/burgers-classic.png",
      rating: 4.2,
      time: "20-25 min",
      description: "Buy 1 Get 1 Free",
    },
    {
      name: "Chocolate Brownies",
      restaurant: "Sweet Truth",
      originalPrice: 199,
      image: "/images/dessert-brownies.png",
      rating: 4.6,
      time: "15-20 min",
      description: "Buy 1 Get 1 Free",
    },
  ]

  const quickCategories = [
    { name: "Pizza", icon: "🍕", image: "/images/pizza-margherita.png" },
    { name: "Rolls", icon: "🌯", image: "/images/rolls-paneer.png" },
    { name: "Biryani", icon: "🍛", image: "/images/biryani-chicken.png" },
    { name: "Burgers", icon: "🍔", image: "/images/burgers-classic.png" },
    { name: "Desserts", icon: "🍰", image: "/images/dessert-brownies.png" },
    { name: "Combos", icon: "🍽️", image: "/images/pizza-margherita.png" },
    { name: "Sides", icon: "🍟", image: "/images/rolls-paneer.png" },
    { name: "Beverages", icon: "🥤", image: "/images/dessert-cake.png" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#5B2B91]">EatSure</h1>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">Koramangala, Bangalore</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-[#5B2B91] rounded-full flex items-center justify-center text-white font-bold text-lg">
              U
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for dishes, restaurants..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B2B91]/20"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-[#5B2B91] px-4 py-8 overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white uppercase mb-2 tracking-wide">UNLIMITED BUY 1 GET 1</h2>
            <p className="text-white/90 text-base mb-4">
              Buy 1 Get 1 <span className="bg-[#FFD200] text-black px-3 py-1 rounded-full font-bold text-sm">FREE</span>{" "}
              on everything!
            </p>
            <p className="text-white/80 text-sm">No minimum order • No delivery fee</p>
          </div>

          {/* Cuisine Carousel */}
          <div className="relative mb-6">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {cuisineSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white/10 backdrop-blur p-6 rounded-2xl text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.name}
                          width={140}
                          height={100}
                          className="mx-auto mb-3 rounded-xl shadow-lg object-cover"
                        />
                        <h3 className="text-white font-bold text-xl mb-1">{slide.name}</h3>
                        <p className="text-white/80 text-sm mb-3">{slide.description}</p>
                        <Badge className="bg-[#FFD200] text-black hover:bg-[#FFD200] font-bold px-4 py-1">
                          1+1 FREE
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {cuisineSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-[#FFD200] w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur rounded-full p-3 disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(cuisineSlides.length - 1, currentSlide + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur rounded-full p-3 disabled:opacity-50"
              disabled={currentSlide === cuisineSlides.length - 1}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => onNavigate("bogo")}
            className="w-full bg-white text-[#5B2B91] hover:bg-gray-100 font-bold py-4 rounded-2xl text-lg shadow-lg"
          >
            EXPLORE BOGO ZONE
          </Button>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-8 w-24 h-24 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-4 w-8 h-8 border-2 border-white rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="px-4 py-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Categories</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => onNavigate("bogo")}
              className="text-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#5B2B91]/10 to-[#FFD200]/10 rounded-2xl flex items-center justify-center mx-auto mb-2 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="rounded-xl object-cover"
                />
              </div>
              <p className="text-xs font-medium text-gray-700 leading-tight">{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Crazy Deals Section */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Crazy Deals</h3>
          <Button variant="ghost" className="text-[#5B2B91] font-semibold" onClick={() => onNavigate("bogo")}>
            View All
          </Button>
        </div>

        {/* BOGO Cards Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {bogoDeals.map((deal, index) => (
            <Card key={index} className="flex-shrink-0 w-80 relative overflow-hidden border-0 shadow-lg bg-white">
              <div className="relative">
                <Image
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  width={320}
                  height={180}
                  className="w-full h-44 object-cover"
                />

                {/* BOGO Overlay */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#FFD200] text-black hover:bg-[#FFD200] font-bold text-sm px-4 py-2 shadow-lg">
                    1+1 FREE
                  </Badge>
                </div>

                {/* Restaurant Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                  <h4 className="text-white font-bold text-lg mb-1">{deal.name}</h4>
                  <p className="text-white/90 text-sm mb-1">
                    {deal.description} – {deal.restaurant}
                  </p>
                  <p className="text-white/80 text-xs mb-3">
                    ★{deal.rating} • {deal.time}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <div className="text-lg font-bold">₹{deal.originalPrice}</div>
                      <div className="text-[#FFD200] text-sm font-bold">+ 1 FREE</div>
                    </div>

                    <Button
                      onClick={() => {
                        onAddToCart()
                        onNavigate("bogo")
                      }}
                      size="sm"
                      className="bg-white text-[#5B2B91] hover:bg-gray-100 font-bold px-4 py-2 rounded-xl shadow-lg"
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Special Offers Banner */}
      <div className="px-4 py-6">
        {/* Italian BOGO Day Special Banner */}
        <Card className="bg-gradient-to-r from-red-500 via-white to-green-500 p-6 border-0 text-center mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-black font-bold text-xl mb-2">🇮🇹 Italian BOGO Day 🍕🍝</h3>
            <p className="text-black/80 text-sm mb-4">Buy 1 Get 1 FREE on all Italian favorites!</p>
            <Button
              className="bg-[#5B2B91] text-white hover:bg-[#4A2280] font-bold px-6 py-2 rounded-xl"
              onClick={() => onNavigate("italian")}
            >
              Explore Italian Menu
            </Button>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-[#FFD200] to-[#FFA500] p-6 border-0 text-center">
          <h3 className="text-black font-bold text-xl mb-2">🎉 Weekend Special!</h3>
          <p className="text-black/80 text-sm mb-4">Extra 20% off on orders above ₹299</p>
          <Button
            className="bg-[#5B2B91] text-white hover:bg-[#4A2280] font-bold px-6 py-2 rounded-xl"
            onClick={() => onNavigate("bogo")}
          >
            Claim Now
          </Button>
        </Card>
      </div>
    </div>
  )
}
