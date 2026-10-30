import { addOnById, dishById } from "@/lib/bogo-data"

export interface CartLine {
  id: string
  paidDishId: string
  // null until the customer picks their free dish
  freeDishId: string | null
  qty: number
}

export interface Order {
  number: string
  lines: CartLine[]
  addOns: Record<string, number>
  totals: Totals
  address: string
  payment: string
}

export interface CartState {
  lines: CartLine[]
  addOns: Record<string, number>
  orders: Order[]
  nextLineId: number
}

export type CartAction =
  | { type: "add-paid"; dishId: string }
  | { type: "add-pair"; paidDishId: string; freeDishId: string }
  | { type: "set-free"; lineId: string; dishId: string }
  | { type: "change-qty"; lineId: string; delta: number }
  | { type: "remove-line"; lineId: string }
  | { type: "change-add-on"; addOnId: string; delta: number }
  | { type: "place-order"; address: string; payment: string }

export const initialCart: CartState = { lines: [], addOns: {}, orders: [], nextLineId: 1 }

export const DELIVERY_FEE = 29
export const TAX_RATE = 0.05

export interface Totals {
  // Menu value of everything in the cart, free dishes included
  itemTotal: number
  bogoSavings: number
  addOnTotal: number
  deliveryFee: number
  taxes: number
  grandTotal: number
  itemCount: number
}

export function computeTotals(lines: CartLine[], addOns: Record<string, number>): Totals {
  let itemTotal = 0
  let bogoSavings = 0
  let itemCount = 0

  for (const line of lines) {
    itemTotal += dishById(line.paidDishId).price * line.qty
    itemCount += line.qty
    if (line.freeDishId) {
      const free = dishById(line.freeDishId).price * line.qty
      itemTotal += free
      bogoSavings += free
      itemCount += line.qty
    }
  }

  let addOnTotal = 0
  for (const [id, qty] of Object.entries(addOns)) {
    addOnTotal += addOnById(id).price * qty
    itemCount += qty
  }

  const payable = itemTotal - bogoSavings + addOnTotal
  const deliveryFee = itemCount > 0 ? DELIVERY_FEE : 0
  const taxes = Math.round(payable * TAX_RATE)

  return {
    itemTotal,
    bogoSavings,
    addOnTotal,
    deliveryFee,
    taxes,
    grandTotal: payable + deliveryFee + taxes,
    itemCount,
  }
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add-paid":
    case "add-pair": {
      const paidDishId = action.type === "add-paid" ? action.dishId : action.paidDishId
      const freeDishId = action.type === "add-pair" ? action.freeDishId : null
      // Adding the same pair again bumps the quantity instead of creating a duplicate line
      const existing = state.lines.find(
        (l) => l.paidDishId === paidDishId && (freeDishId === null ? l.freeDishId === null : l.freeDishId === freeDishId),
      )
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) => (l.id === existing.id ? { ...l, qty: l.qty + 1 } : l)),
        }
      }
      return {
        ...state,
        lines: [...state.lines, { id: `line-${state.nextLineId}`, paidDishId, freeDishId, qty: 1 }],
        nextLineId: state.nextLineId + 1,
      }
    }
    case "set-free":
      return {
        ...state,
        lines: state.lines.map((l) => (l.id === action.lineId ? { ...l, freeDishId: action.dishId } : l)),
      }
    case "change-qty":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.id === action.lineId ? { ...l, qty: l.qty + action.delta } : l))
          .filter((l) => l.qty > 0),
      }
    case "remove-line":
      return { ...state, lines: state.lines.filter((l) => l.id !== action.lineId) }
    case "change-add-on": {
      const qty = Math.max(0, (state.addOns[action.addOnId] ?? 0) + action.delta)
      const addOns = { ...state.addOns, [action.addOnId]: qty }
      if (qty === 0) delete addOns[action.addOnId]
      return { ...state, addOns }
    }
    case "place-order": {
      if (state.lines.length === 0) return state
      const order: Order = {
        number: `ES-BOGO-${String(1041 + state.orders.length)}`,
        lines: state.lines,
        addOns: state.addOns,
        totals: computeTotals(state.lines, state.addOns),
        address: action.address,
        payment: action.payment,
      }
      return { ...state, lines: [], addOns: {}, orders: [order, ...state.orders] }
    }
  }
}

export const lineLabel = (line: CartLine) => {
  const paid = dishById(line.paidDishId)
  return line.freeDishId ? `${paid.name} + ${dishById(line.freeDishId).name}` : paid.name
}
