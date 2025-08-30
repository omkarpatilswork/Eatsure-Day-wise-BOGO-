"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MapPin, Clock, CreditCard, Wallet, Banknote, Plus, Edit, Gift } from "lucide-react"
import Image from "next/image"

interface CheckoutPageProps {
  onNavigate: (screen: string) => void
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Order Summary in Purple */}
      <div className="bg-[#5B2B91] px-4 py-6 text-white">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("cart")}
            className="text-white hover:bg-white/20 mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Checkout</h1>
            <p className="text-white/80 text-sm">Review your order</p>
          </div>
        </div>

        {/* Order Summary Header */}
        <Card className="bg-white/15 backdrop-blur border-0 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm">Ovenstory • 2 items</p>
              <p className="font-bold text-lg">₹428</p>
              <div className="flex items-center mt-1">
                <span className="text-[#FFD200] text-sm font-medium">BOGO Savings Applied</span>
                <Badge className="ml-2 bg-[#FFD200] text-black hover:bg-[#FFD200] text-xs">-₹399</Badge>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-bold px-3 py-1">BOGO Applied</Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Upsell Card - Add drink for ₹79 */}
        <Card className="p-4 border-2 border-[#FFD200] bg-[#FFD200]/10">
          <div className="flex items-center gap-4">
            <Image
              src="/images/dessert-cake.png"
              alt="Drink"
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-base">Add drink or dessert for ₹79</h3>
              <p className="text-sm text-gray-600 mb-2">Coca Cola • 300ml or Chocolate Cake</p>
              <p className="text-xs text-[#5B2B91] font-medium">Perfect with your pizza!</p>
            </div>
            <Button size="sm" className="bg-[#5B2B91] hover:bg-[#4A2280] text-white px-4 py-2 rounded-xl">
              <Plus className="w-4 h-4 mr-1" />
              ADD
            </Button>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-4 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[#5B2B91]" />
              Delivery Address
            </h3>
            <Button variant="ghost" size="sm" className="text-[#5B2B91] hover:bg-[#5B2B91]/10">
              <Edit className="w-4 h-4 mr-1" />
              Change
            </Button>
          </div>
          <Card className="bg-gray-50 border-0 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-base mb-1">Home</p>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  123 Koramangala 5th Block, Near Forum Mall, Bangalore - 560095
                </p>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  Delivery in 25-30 mins
                </div>
              </div>
            </div>
          </Card>
        </Card>

        {/* Payment Options */}
        <Card className="p-4 bg-white border-0 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-[#5B2B91]" />
            Payment Options
          </h3>

          <RadioGroup defaultValue="upi" className="space-y-4">
            <Card className="border border-gray-200 hover:border-[#5B2B91] transition-colors">
              <div className="flex items-center space-x-4 p-4">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center flex-1 cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">UPI</p>
                    <p className="text-sm text-gray-600">Pay using any UPI app</p>
                  </div>
                </Label>
                <Badge variant="secondary" className="text-xs">
                  Recommended
                </Badge>
              </div>
            </Card>

            <Card className="border border-gray-200 hover:border-[#5B2B91] transition-colors">
              <div className="flex items-center space-x-4 p-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center flex-1 cursor-pointer">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, Rupay</p>
                  </div>
                </Label>
              </div>
            </Card>

            <Card className="border border-gray-200 hover:border-[#5B2B91] transition-colors">
              <div className="flex items-center space-x-4 p-4">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center flex-1 cursor-pointer">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Banknote className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when food arrives</p>
                  </div>
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </Card>

        {/* Final Bill */}
        <Card className="p-4 bg-white border-0 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Bill Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Margherita Pizza</span>
              <span className="font-semibold">₹399</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-[#FFD200] font-medium">Cheese Burst Pizza</span>
                <Badge className="ml-2 bg-[#FFD200] text-black hover:bg-[#FFD200] text-xs">FREE</Badge>
              </div>
              <span className="text-[#FFD200] font-bold">₹0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold">₹29</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes & Charges</span>
              <span className="font-semibold">₹20</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Amount</span>
              <span className="font-bold text-xl text-[#5B2B91]">₹448</span>
            </div>
            <Card className="bg-[#FFD200]/20 border-0 p-3 mt-4">
              <div className="flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#5B2B91] mr-2" />
                <span className="text-[#5B2B91] font-bold text-sm">You saved ₹399 with BOGO! 🎉</span>
              </div>
            </Card>
          </div>
        </Card>

        {/* Place Order Button */}
        <div className="pb-6">
          <Button
            onClick={() => onNavigate("celebration")}
            className="w-full bg-[#5B2B91] hover:bg-[#4A2280] text-white font-bold py-4 text-lg rounded-2xl shadow-lg"
          >
            Place Order • ₹448
          </Button>
          <p className="text-center text-xs text-gray-500 mt-3">
            By placing this order, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  )
}
