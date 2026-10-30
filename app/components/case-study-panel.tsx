"use client"

import { ArrowUpRight } from "lucide-react"
import type { Screen } from "./app-context"

const steps: { n: number; title: string; detail: string; screens: Screen[] }[] = [
  { n: 1, title: "Home entry points", detail: "Hero banner, BOGO tab in the nav, Crazy Deals, a theme for every day", screens: ["home", "search", "profile"] },
  { n: 2, title: "BOGO Zone", detail: "Cuisine chips, filters, sort, paid + free pairs", screens: ["bogo", "italian"] },
  { n: 3, title: "Add & pair", detail: "Toast, purple pairing prompt, pick the free dish", screens: [] },
  { n: 4, title: "Cart review", detail: "Two-item pairing, savings banner, ₹79 upsell", screens: ["cart"] },
  { n: 5, title: "Checkout", detail: "BOGO savings applied, address, payment", screens: ["checkout"] },
  { n: 6, title: "Celebration", detail: "Confetti and a nudge back to more deals", screens: ["celebration"] },
]

export default function CaseStudyPanel({ screen, onJump }: { screen: Screen; onJump: (step: number) => void }) {
  return (
    <aside className="hidden max-w-[420px] md:block">
      <p className="text-xs font-bold tracking-[0.18em] text-[#5B2B91] uppercase">Product case study · EatSure</p>
      <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-[#1d0d33] lg:text-[44px]">
        Always-on Buy 1 Get 1, with{" "}
        <span className="box-decoration-clone bg-[linear-gradient(transparent_60%,#FFD200_60%)]">a theme for every day.</span>
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[#4a3a5e]">
        The brief: design the full customer journey for a permanent BOGO programme inside the EatSure app, in its own purple and yellow. This
        is a clickable prototype of that journey. Try it on the phone, or jump to a step.
      </p>

      <ol className="mt-6 space-y-1.5">
        {steps.map((step) => {
          const active = step.screens.includes(screen)
          return (
            <li key={step.n}>
              <button
                onClick={() => onJump(step.n)}
                className={`group flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                  active ? "bg-white shadow-sm" : "hover:bg-white/60"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    active ? "bg-[#5B2B91] text-[#FFD200]" : "bg-[#5B2B91]/10 text-[#5B2B91]"
                  }`}
                >
                  {step.n}
                </span>
                <span>
                  <span className="block font-bold text-[#1d0d33]">{step.title}</span>
                  <span className="block text-sm text-[#6b5a80]">{step.detail}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-xs leading-relaxed text-[#6b5a80]">
        An unofficial concept by Omkar Patil for an interview case study. Not affiliated with EatSure or Rebel Foods. Dishes, prices and ratings are
        illustrative and nothing is ordered.{" "}
        <a
          href="https://github.com/omkarpatilswork/Eatsure-Day-wise-BOGO-"
          className="inline-flex items-center font-semibold text-[#5B2B91] underline-offset-2 hover:underline"
        >
          Read the case study
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </p>
    </aside>
  )
}
