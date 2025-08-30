"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RefreshCw, Minus, Plus, Trash2, Gift } from "lucide-react"
import Image from "next/image"

interface CartPageProps {
  onNavigate: (screen: string) => void
  cartCount: number
}

export default function CartPage({ onNavigate, cartCount }: CartPageProps) {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1 })

  const cartItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Ovenstory",
      price: 399,
      image: "/images/pizza-margherita.png",
      isPaid: true,
    },
    {
      id: 2,
      name: "Cheese Burst Pizza",
      restaurant: "Ovenstory",
      price: 399,
      image: "/images/pizza-cheese-burst.png",
      isPaid: false,
      isFree: true,
    },
  ]

  const totalSavings = 399
  const itemTotal = cartItems[0].price * quantities[1]
  const deliveryFee = 29
  const taxes = Math.round(itemTotal * 0.05)
  const grandTotal = itemTotal + deliveryFee + taxes

  const updateQuantity = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + change),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("bogo")}
              className="text-gray-600 hover:bg-gray-100 mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
              <p className="text-sm text-gray-600">{cartCount} items</p>
            </div>
          </div>
          <Badge className="bg-[#FFD200] text-black hover:bg-[#FFD200] font-bold px-3 py-1">BOGO Active</Badge>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Restaurant Header */}
        <Card className="mb-4 p-4 border-0 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#5B2B91]/10 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#5B2B91] font-bold text-lg">O</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">Ovenstory</h2>
                <p className="text-gray-600 text-sm">Pizzas & Italian • 25 mins</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600 text-sm font-medium">
                <Gift className="w-4 h-4 mr-1" />
                BOGO Applied
              </div>
            </div>
          </div>
        </Card>

        {/* Two-Item Pairing View */}
        <Card className="mb-6 p-4 border-0 shadow-sm bg-white">
          <h3 className="font-bold text-lg mb-4 text-center">Your BOGO Pairing</h3>

          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-xl object-cover"
                  />
                  {item.isFree && (
                    <Badge className="absolute -top-2 -right-2 bg-[#FFD200] text-black hover:bg-[#FFD200] text-xs font-bold">
                      FREE
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 pr-2">
                      <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.restaurant}</p>
                    </div>

                    {item.isFree ? (
                      <Button variant="ghost" size="sm" className="text-[#5B2B91] hover:bg-[#5B2B91]/10 px-3 py-1">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Swap
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 px-2 py-1">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {item.isFree ? (
                        <div className="text-lg font-bold text-[#FFD200]">₹0 – Free (BOGO)</div>
                      ) : (
                        <div className="text-lg font-bold text-gray-900">₹{item.price}</div>
                      )}
                    </div>

                    {!item.isFree && (
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 hover:bg-white"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-bold">{quantities[item.id]}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 hover:bg-white"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Savings Banner */}
        <Card className="bg-[#5B2B91] text-white p-6 mb-6 border-0">
          <div className="text-center">
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="text-xl font-bold mb-1">You Saved ₹{totalSavings} with BOGO!</h3>
            <p className="text-white/90 text-sm">Keep adding items to save even more</p>
          </div>
        </Card>

        {/* Upsell Section */}
        <Card className="p-4 border-2 border-[#FFD200] bg-[#FFD200]/10 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/dessert-cake.png"
              alt="Add-on"
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-[#5B2B91] font-bold mb-2">Add drink or dessert for ₹79</p>
              <p className="text-gray-600 text-sm mb-4">Perfect complement to your meal</p>
              <Button
                variant="outline"
                className="border-[#5B2B91] text-[#5B2B91] hover:bg-[#5B2B91]/10 bg-transparent font-bold px-6 py-2"
                onClick={() => onNavigate("bogo")}
              >
                Browse Add-ons
              </Button>
            </div>
          </div>
        </Card>

        {/* Bill Summary */}
        <Card className="p-6 border-0 shadow-sm mb-6 bg-white">
          <h3 className="font-bold text-lg mb-4">Bill Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Item Total</span>
              <span className="font-semibold">₹{itemTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#FFD200] font-medium">BOGO Savings</span>
              <span className="text-[#FFD200] font-bold">-₹{totalSavings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes & Charges</span>
              <span className="font-semibold">₹{taxes}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Amount</span>
              <span className="font-bold text-xl text-[#5B2B91]">₹{grandTotal}</span>
            </div>
          </div>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={() => onNavigate("checkout")}
          className="w-full bg-[#5B2B91] hover:bg-[#4A2280] text-white font-bold py-4 text-lg rounded-2xl shadow-lg"
        >
          Proceed to Checkout • ₹{grandTotal}
        </Button>
      </div>
    </div>
  )
}
