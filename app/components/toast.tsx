"use client"

import { Sparkles } from "lucide-react"

export default function Toast({ message }: { message: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none absolute inset-x-4 top-4 z-50 flex justify-center transition-all duration-300 ${
        message ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      {message && (
        <div className="flex items-center gap-2 rounded-2xl bg-[#2b1146] px-4 py-3 text-sm font-semibold text-white shadow-xl">
          <Sparkles className="h-4 w-4 shrink-0 text-[#FFD200]" />
          {message}
        </div>
      )}
    </div>
  )
}
