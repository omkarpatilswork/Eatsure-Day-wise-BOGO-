"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Gift, ArrowRight, Clock, MapPin, Phone } from "lucide-react"

interface CelebrationPageProps {
  onNavigate: (screen: string) => void
}

export default function CelebrationPage({ onNavigate }: CelebrationPageProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5B2B91] via-[#6B3EFF] to-[#5B2B91] relative overflow-hidden">
      {/* Confetti Animation in Purple/Yellow */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? (
                <div className="w-4 h-4 bg-[#FFD200] rounded-full shadow-lg"></div>
              ) : (
                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-8 w-24 h-24 border-4 border-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-20 px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {/* Success Icon */}
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white uppercase mb-3 tracking-wide leading-tight">
            ENJOY YOUR
            <br />
            FREEBIE!
          </h1>
          <p className="text-white/90 text-lg max-w-sm mx-auto leading-relaxed">
            Your order has been placed successfully. Get ready for some delicious food!
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="w-full max-w-sm mb-8 p-6 bg-white/95 backdrop-blur border-0 shadow-2xl">
          <div className="text-center mb-6">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-bold mb-3 px-4 py-1">
              Order Confirmed
            </Badge>
            <h3 className="font-bold text-xl text-gray-900 mb-1">Ovenstory</h3>
            <p className="text-gray-600 text-sm">Order #EP2024001</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Margherita Pizza</span>
              <span className="text-sm font-bold">₹399</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium">Cheese Burst Pizza</span>
                <Badge className="ml-2 bg-[#FFD200] text-black hover:bg-[#FFD200] text-xs">FREE</Badge>
              </div>
              <span className="text-sm font-bold text-[#FFD200]">₹0</span>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-[#FFD200]/20 to-[#FFD200]/10 border-0 p-4">
            <div className="flex items-center justify-center">
              <Gift className="w-6 h-6 text-[#5B2B91] mr-2" />
              <span className="text-[#5B2B91] font-bold">Saved ₹399 with BOGO!</span>
            </div>
          </Card>
        </Card>

        {/* Delivery Info */}
        <Card className="w-full max-w-sm mb-8 bg-white/15 backdrop-blur border-0 p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-white font-bold text-lg mb-1">Estimated Delivery</p>
            <p className="text-[#FFD200] text-2xl font-bold">25-30 minutes</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-white/90 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Koramangala, Bangalore</span>
            </div>
            <div className="flex items-center text-white/90 text-sm">
              <Phone className="w-4 h-4 mr-2" />
              <span>We'll call you when it's on the way!</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-sm mb-8">
          <Button
            onClick={() => onNavigate("bogo")}
            className="w-full bg-[#FFD200] text-black hover:bg-[#E6B800] font-bold py-4 text-lg rounded-2xl shadow-lg"
          >
            EXPLORE MORE BOGO DEALS
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>

          <Button
            onClick={() => onNavigate("home")}
            variant="outline"
            className="w-full border-2 border-white text-white hover:bg-white/20 font-bold py-4 text-lg rounded-2xl"
          >
            Back to Home
          </Button>
        </div>

        {/* Fun Message */}
        <div className="text-center">
          <p className="text-white/90 text-base mb-2">🎉 Thanks for choosing EatSure!</p>
          <p className="text-[#FFD200] text-base font-bold">More BOGO deals await you!</p>
        </div>
      </div>
    </div>
  )
}
