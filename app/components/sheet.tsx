"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open: boolean
  onClose: () => void
  label: string
  tone?: "light" | "purple"
  children: ReactNode
}

// A bottom sheet that stays inside the phone frame (Radix dialogs portal to the page body,
// which breaks the framed desktop view).
export default function Sheet({ open, onClose, label, tone = "light", children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    // preventScroll matters: focusing an off-screen panel would scroll the clipped phone frame
    panelRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <div className={cn("absolute inset-0 z-40", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-black/45 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 max-h-[88%] overflow-y-auto rounded-t-[28px] px-5 pt-3 pb-8 shadow-2xl outline-none transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
          tone === "purple" ? "bg-[#5B2B91] text-white" : "bg-white text-gray-900",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className={cn("mx-auto h-1.5 w-10 rounded-full", tone === "purple" ? "bg-white/30" : "bg-gray-200")} />
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className={cn(
            "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full",
            tone === "purple" ? "bg-white/15 text-white hover:bg-white/25" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          )}
        >
          <X className="h-4 w-4" />
        </button>
        {open && children}
      </div>
    </div>
  )
}
