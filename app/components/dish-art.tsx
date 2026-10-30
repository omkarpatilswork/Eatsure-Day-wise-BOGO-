import { useId, type ReactNode } from "react"

// Flat food illustrations drawn in SVG. They replace the photo files the original v0 export
// referenced but never committed, so the prototype has no broken images and no licensing questions.

export type DishArtKind =
  | "pizza-margherita"
  | "pizza-cheese-burst"
  | "pizza-pepperoni"
  | "pizza-four-cheese"
  | "pizza-farmhouse"
  | "breadsticks"
  | "roll-paneer"
  | "roll-veg-seekh"
  | "roll-chicken"
  | "roll-combo"
  | "biryani-chicken"
  | "biryani-veg"
  | "biryani-combo"
  | "burger-classic"
  | "burger-chicken"
  | "burger-veg"
  | "fries"
  | "brownie"
  | "cake"
  | "lava-cake"
  | "pasta-pesto"
  | "pasta-alfredo"
  | "pasta-aglio"
  | "lasagna-chicken"
  | "lasagna-veg"
  | "risotto"
  | "bruschetta"
  | "garlic-bread"
  | "tiramisu"
  | "panna-cotta"
  | "cannoli"
  | "gelato"
  | "cola"

const tints: Record<string, [string, string]> = {
  pizza: ["#FFF1E6", "#FFD9BF"],
  roll: ["#FFF6DA", "#FFE0A0"],
  biryani: ["#FFF3E0", "#F8D3A0"],
  burger: ["#FFF0E0", "#FFD0A0"],
  dessert: ["#FCEFF3", "#F3CAD8"],
  pasta: ["#F1F8E8", "#D3E9BD"],
  bread: ["#FFF6E5", "#F4D9A8"],
  dolci: ["#F6EEFF", "#DFCDF9"],
  drink: ["#EAF6FF", "#C6E3F8"],
}

const familyOf = (kind: DishArtKind) => {
  if (kind.startsWith("pizza")) return "pizza"
  if (kind.startsWith("roll")) return "roll"
  if (kind.startsWith("biryani")) return "biryani"
  if (kind.startsWith("burger") || kind === "fries") return "burger"
  if (kind === "brownie" || kind === "cake" || kind === "lava-cake") return "dessert"
  if (kind.startsWith("pasta") || kind.startsWith("lasagna") || kind === "risotto") return "pasta"
  if (kind === "bruschetta" || kind === "garlic-bread" || kind === "breadsticks") return "bread"
  if (kind === "cola") return "drink"
  return "dolci"
}

interface DishArtProps {
  kind: DishArtKind
  label: string
  className?: string
}

export default function DishArt({ kind, label, className }: DishArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "")
  const [top, bottom] = tints[familyOf(kind)]

  return (
    <svg
      viewBox="0 0 200 150"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={className}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <radialGradient id={`glow${uid}`} cx="0.5" cy="0.35" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="150" fill={`url(#bg${uid})`} />
      <rect width="200" height="150" fill={`url(#glow${uid})`} />
      {renderDish(kind)}
    </svg>
  )
}

function renderDish(kind: DishArtKind): ReactNode {
  switch (kind) {
    case "pizza-margherita":
    case "pizza-cheese-burst":
    case "pizza-pepperoni":
    case "pizza-four-cheese":
    case "pizza-farmhouse":
      return <Pizza variant={kind} />
    case "breadsticks":
      return <Breadsticks />
    case "roll-paneer":
    case "roll-veg-seekh":
    case "roll-chicken":
      return <Roll variant={kind} />
    case "roll-combo":
      return (
        <>
          <g transform="translate(-26 6) translate(100 80) scale(0.86) translate(-100 -80)">
            <Roll variant="roll-paneer" />
          </g>
          <g transform="translate(52 10) translate(100 80) scale(0.72) translate(-100 -80)">
            <Fries />
          </g>
        </>
      )
    case "biryani-chicken":
    case "biryani-veg":
      return <Biryani veg={kind === "biryani-veg"} />
    case "biryani-combo":
      return (
        <>
          <g transform="translate(-24 4) translate(100 90) scale(0.84) translate(-100 -90)">
            <Biryani veg={false} />
          </g>
          <Kebab />
        </>
      )
    case "burger-classic":
    case "burger-chicken":
    case "burger-veg":
      return <Burger variant={kind} />
    case "fries":
      return <Fries />
    case "brownie":
      return <Brownies />
    case "cake":
      return <CakeSlice />
    case "lava-cake":
      return <LavaCake />
    case "pasta-pesto":
    case "pasta-alfredo":
    case "pasta-aglio":
      return <Pasta variant={kind} />
    case "lasagna-chicken":
    case "lasagna-veg":
      return <Lasagna veg={kind === "lasagna-veg"} />
    case "risotto":
      return <Risotto />
    case "bruschetta":
      return <Bruschetta />
    case "garlic-bread":
      return <GarlicBread />
    case "tiramisu":
      return <Tiramisu />
    case "panna-cotta":
      return <PannaCotta />
    case "cannoli":
      return <Cannoli />
    case "gelato":
      return <Gelato />
    case "cola":
      return <Cola />
  }
}

/* ---------- shared bits ---------- */

const Shadow = ({ cx = 100, cy = 128, rx = 62, ry = 7 }: { cx?: number; cy?: number; rx?: number; ry?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#3b1d0a" opacity="0.14" />
)

const Plate = ({ cy = 110, rx = 70, ry = 18 }: { cy?: number; rx?: number; ry?: number }) => (
  <>
    <Shadow cy={cy + 6} rx={rx + 2} ry={ry * 0.55} />
    <ellipse cx="100" cy={cy} rx={rx} ry={ry} fill="#ffffff" />
    <ellipse cx="100" cy={cy - 1} rx={rx - 12} ry={ry - 5} fill="#f2efe9" />
  </>
)

const Leaf = ({ x, y, r = 0, s = 1, fill = "#2f8f3a" }: { x: number; y: number; r?: number; s?: number; fill?: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-7 0 Q0 -5 7 0 Q0 5 -7 0 Z" fill={fill} />
    <path d="M-6 0 L6 0" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="0.8" />
  </g>
)

const Board = () => (
  <>
    <Shadow cy={130} rx={70} ry={8} />
    <rect x="28" y="96" width="144" height="30" rx="10" fill="#b8763b" />
    <rect x="28" y="92" width="144" height="30" rx="10" fill="#d0904f" />
    <path d="M40 101 H160 M44 110 H150" stroke="#b8763b" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" />
  </>
)

/* ---------- pizza ---------- */

function Pizza({ variant }: { variant: DishArtKind }) {
  const sauce = variant === "pizza-cheese-burst" ? "#f6c445" : variant === "pizza-four-cheese" ? "#f3cb6b" : "#d8432a"
  const crust = variant === "pizza-cheese-burst" ? "#e8a03a" : "#e7a44f"
  const cuts = [0, 45, 90, 135]

  return (
    <>
      <Shadow cy={130} rx={72} ry={9} />
      <g transform="translate(100 80) scale(1 0.78)">
        <circle r="66" fill="#b8763b" />
        <circle r="62" fill="#d0904f" />
        <circle r="56" fill={crust} />
        <circle r="56" fill="none" stroke="#c47f2c" strokeWidth="2" />
        <circle r="48" fill={sauce} />

        {variant === "pizza-margherita" && (
          <>
            {[
              [-20, -18, 11],
              [18, -24, 10],
              [25, 12, 12],
              [-8, 18, 12],
              [-30, 6, 9],
              [2, -2, 9],
              [36, -6, 7],
            ].map(([x, y, r], i) => (
              <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.9} fill="#fff4da" />
            ))}
            <Leaf x={-14} y={-4} r={30} />
            <Leaf x={10} y={-32} r={-20} />
            <Leaf x={32} y={-2} r={70} />
            <Leaf x={-2} y={30} r={10} />
            <Leaf x={-32} y={-16} r={-40} />
          </>
        )}

        {variant === "pizza-cheese-burst" && (
          <>
            {[
              [-18, -16, 14],
              [16, -20, 12],
              [20, 14, 15],
              [-14, 18, 13],
              [0, 0, 10],
            ].map(([x, y, r], i) => (
              <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.8} fill="#fbdc7a" />
            ))}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2
              return <ellipse key={i} cx={Math.cos(a) * 52} cy={Math.sin(a) * 52} rx="6" ry="4" fill="#ffd95a" />
            })}
            {[
              [-26, 4],
              [8, -34],
              [30, -8],
              [-4, 30],
              [12, 22],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.6" fill="#4a7a2a" />
            ))}
          </>
        )}

        {variant === "pizza-pepperoni" && (
          <>
            <circle r="45" fill="#f5c46a" opacity="0.9" />
            {[
              [-22, -18],
              [14, -26],
              [30, 4],
              [6, 4],
              [-30, 10],
              [-6, 28],
              [24, 28],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="9" fill="#b3261e" stroke="#8e1b15" strokeWidth="1.2" />
                <circle cx={x - 3} cy={y - 2} r="1.4" fill="#7c1611" />
                <circle cx={x + 3} cy={y + 2} r="1.2" fill="#7c1611" />
              </g>
            ))}
          </>
        )}

        {variant === "pizza-four-cheese" && (
          <>
            {[
              [-20, -16, 13, "#fff1c9"],
              [18, -20, 11, "#f2b23e"],
              [22, 16, 13, "#fce3a0"],
              [-12, 20, 12, "#fff1c9"],
              [-32, 2, 8, "#f2b23e"],
              [2, -2, 9, "#fce3a0"],
            ].map(([x, y, r, c], i) => (
              <ellipse key={i} cx={x as number} cy={y as number} rx={r as number} ry={(r as number) * 0.85} fill={c as string} />
            ))}
            {[
              [-4, -26],
              [30, -4],
              [-26, -26],
              [8, 30],
              [-36, 18],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#d48b2c" opacity="0.7" />
            ))}
          </>
        )}

        {variant === "pizza-farmhouse" && (
          <>
            <circle r="45" fill="#f7cf74" opacity="0.92" />
            {[
              [-24, -14, 20],
              [16, -26, -30],
              [26, 16, 60],
              [-10, 24, 0],
            ].map(([x, y, r], i) => (
              <path key={i} d="M-8 0 Q0 -8 8 0" transform={`translate(${x} ${y}) rotate(${r})`} stroke="#3a9d3a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            ))}
            {[
              [6, -10, 40],
              [-30, 8, -20],
              [30, -10, 10],
            ].map(([x, y, r], i) => (
              <path key={i} d="M-7 0 Q0 -7 7 0" transform={`translate(${x} ${y}) rotate(${r})`} stroke="#9b4f96" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ))}
            {[
              [-6, -30],
              [12, 14],
              [-28, 26],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill="#e5432f" />
                <circle cx={x} cy={y} r="3" fill="#f27a5f" />
              </g>
            ))}
            {[
              [0, 0],
              [22, -2],
              [-16, -2],
              [8, 34],
              [-36, -10],
              [36, 22],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.6" fill="#ffd54a" stroke="#e6b422" strokeWidth="0.6" />
            ))}
          </>
        )}

        {cuts.map((deg) => (
          <line
            key={deg}
            x1={Math.cos((deg * Math.PI) / 180) * -48}
            y1={Math.sin((deg * Math.PI) / 180) * -48}
            x2={Math.cos((deg * Math.PI) / 180) * 48}
            y2={Math.sin((deg * Math.PI) / 180) * 48}
            stroke="#7a3c14"
            strokeOpacity="0.22"
            strokeWidth="1.4"
          />
        ))}
      </g>
    </>
  )
}

function Breadsticks() {
  return (
    <>
      <Board />
      {[
        [-14, 0],
        [-6, 8],
        [2, -4],
        [10, 6],
      ].map(([r, dx], i) => (
        <g key={i} transform={`translate(${86 + dx} ${86 + i * 3}) rotate(${r - 16})`}>
          <rect x="-50" y="-5" width="100" height="10" rx="5" fill="#e3a34f" />
          <rect x="-48" y="-5" width="96" height="4" rx="2" fill="#f2c47a" />
          {[-34, -18, -2, 14, 30].map((x) => (
            <ellipse key={x} cx={x} cy="0" rx="2" ry="1" fill="#fff3d6" />
          ))}
        </g>
      ))}
      <ellipse cx="150" cy="92" rx="20" ry="9" fill="#ffffff" />
      <ellipse cx="150" cy="90" rx="16" ry="6" fill="#ffcf4a" />
      <ellipse cx="146" cy="89" rx="5" ry="1.6" fill="#fff0b3" />
    </>
  )
}

/* ---------- rolls ---------- */

function Roll({ variant }: { variant: DishArtKind }) {
  const filling =
    variant === "roll-veg-seekh"
      ? { main: "#8b4b23", light: "#a8653a", shape: "log" as const }
      : variant === "roll-chicken"
        ? { main: "#b5651d", light: "#d68a44", shape: "chunk" as const }
        : { main: "#f08a3c", light: "#ffc28a", shape: "cube" as const }

  return (
    <>
      <Shadow cy={124} rx={66} ry={7} />
      <g transform="rotate(-16 100 82)">
        <rect x="40" y="60" width="116" height="44" rx="22" fill="#f0cf94" />
        {[
          [70, 68],
          [92, 94],
          [116, 70],
          [130, 92],
          [58, 90],
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="2.5" fill="#c98b47" opacity="0.55" />
        ))}
        <path d="M34 58 H96 L90 66 L98 74 L90 82 L98 90 L90 98 L96 106 H34 Z" fill="#fff7e6" stroke="#e8d9b8" strokeWidth="1.2" />
        <rect x="34" y="72" width="58" height="6" fill="#d64545" />
        <rect x="34" y="84" width="58" height="3" fill="#d64545" opacity="0.6" />

        <ellipse cx="156" cy="82" rx="13" ry="22" fill="#e2b06c" />
        <ellipse cx="157" cy="82" rx="10" ry="18" fill="#7cbf4e" />
        {filling.shape === "cube" &&
          [
            [154, 72],
            [160, 86],
            [151, 92],
            [166, 76],
            [172, 90],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 5} y={y - 5} width="10" height="10" rx="2" fill={filling.main} />
              <rect x={x - 5} y={y - 5} width="10" height="4" rx="2" fill={filling.light} />
            </g>
          ))}
        {filling.shape === "log" &&
          [
            [158, 72, 20],
            [162, 86, -10],
            [172, 80, 30],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <rect x="-11" y="-4.5" width="22" height="9" rx="4.5" fill={filling.main} />
              <path d="M-6 -4 V4 M0 -4 V4 M6 -4 V4" stroke="#5e2f12" strokeWidth="1" />
            </g>
          ))}
        {filling.shape === "chunk" &&
          [
            [154, 72],
            [163, 87],
            [170, 74],
            [152, 92],
          ].map(([x, y], i) => (
            <path key={i} d={`M${x - 6} ${y} q2 -7 8 -5 q7 2 4 8 q-4 6 -9 4 q-5 -2 -3 -7z`} fill={filling.main} stroke={filling.light} strokeWidth="1" />
          ))}
        <path d="M150 66 q6 3 12 0 M152 98 q6 -3 12 0" stroke="#9b4f96" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="168" cy="96" r="2" fill="#fff3d6" />
        <circle cx="146" cy="78" r="1.8" fill="#fff3d6" />
      </g>
    </>
  )
}

/* ---------- biryani ---------- */

function Biryani({ veg }: { veg: boolean }) {
  return (
    <>
      <Shadow cy={130} rx={62} ry={7} />
      <path d="M44 82 Q44 130 100 130 Q156 130 156 82 Z" fill="#9c4a1a" />
      <path d="M52 90 Q56 120 86 126" stroke="#c06a33" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="100" cy="82" rx="58" ry="14" fill="#7a3812" />
      <path d="M50 82 Q58 50 100 44 Q142 50 150 82 Z" fill="#f8ebcf" />
      <ellipse cx="100" cy="82" rx="51" ry="10" fill="#f3dfb6" />
      {[
        [76, 60, 14, "#f4a93a"],
        [118, 56, 12, "#e8892a"],
        [96, 70, 10, "#f4a93a"],
        [132, 72, 9, "#f6c36b"],
        [66, 76, 8, "#e8892a"],
      ].map(([x, y, r, c], i) => (
        <ellipse key={i} cx={x as number} cy={y as number} rx={r as number} ry={(r as number) * 0.55} fill={c as string} opacity="0.85" />
      ))}
      {Array.from({ length: 26 }, (_, i) => {
        const x = 58 + ((i * 37) % 86)
        const y = 52 + ((i * 23) % 28)
        return <ellipse key={i} cx={x} cy={y} rx="2.6" ry="0.9" fill="#ffffff" transform={`rotate(${(i * 47) % 180} ${x} ${y})`} />
      })}
      {veg ? (
        <>
          {[
            [84, 58],
            [112, 64],
            [100, 50],
            [124, 74],
            [76, 72],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill="#5daa3b" />
          ))}
          {[
            [94, 62],
            [118, 50],
            [70, 64],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="6" height="6" rx="1.2" fill="#f07f2c" />
          ))}
          <ellipse cx="104" cy="76" rx="7" ry="5" fill="#f5f0dc" />
        </>
      ) : (
        <g transform="translate(98 56) rotate(-24)">
          <path d="M-20 -2 Q-22 -14 -6 -14 Q12 -14 16 -4 Q18 6 4 8 Q-16 10 -20 -2 Z" fill="#a8541f" />
          <path d="M-14 -8 Q-6 -12 6 -10" stroke="#c97a3f" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="14" y="-4" width="16" height="5" rx="2.5" fill="#fff3e0" />
          <circle cx="31" cy="-3" r="3.4" fill="#fff3e0" />
          <circle cx="31" cy="1" r="3.2" fill="#fff3e0" />
        </g>
      )}
      <path d="M70 66 q4 -4 8 0 M120 64 q4 -4 8 0 M102 74 q4 -4 8 0" stroke="#8a4a1d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Leaf x={86} y={48} r={-30} s={0.8} fill="#3e9b4f" />
      <Leaf x={126} y={60} r={40} s={0.8} fill="#3e9b4f" />
    </>
  )
}

function Kebab() {
  return (
    <g transform="translate(150 86) rotate(-28)">
      <line x1="-40" y1="0" x2="40" y2="0" stroke="#9e9e9e" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="-30" y="-8" width="56" height="16" rx="8" fill="#8b3a1a" />
      <path d="M-20 -7 l4 14 M-6 -7 l4 14 M8 -7 l4 14" stroke="#5a220c" strokeWidth="2" />
      <ellipse cx="-4" cy="-4" rx="18" ry="2" fill="#b0562c" opacity="0.7" />
      <path d="M30 14 a10 10 0 0 1 20 0 z" fill="#f4e04d" transform="rotate(28 40 14)" />
    </g>
  )
}

/* ---------- burgers & fries ---------- */

function Burger({ variant }: { variant: DishArtKind }) {
  const patty = variant === "burger-chicken" ? "#d9913a" : variant === "burger-veg" ? "#c76b2a" : "#5e3219"
  return (
    <>
      <Shadow cy={126} rx={58} ry={7} />
      <rect x="56" y="100" width="88" height="20" rx="9" fill="#e2a257" />
      <rect x="56" y="112" width="88" height="8" rx="4" fill="#c9843c" />
      <rect x="50" y="86" width="100" height="17" rx="8.5" fill={patty} />
      {variant === "burger-chicken" &&
        Array.from({ length: 14 }, (_, i) => <circle key={i} cx={56 + i * 6.8} cy={i % 2 ? 90 : 97} r="1.6" fill="#f2b866" />)}
      {variant === "burger-veg" &&
        Array.from({ length: 9 }, (_, i) => <circle key={i} cx={60 + i * 10} cy={i % 2 ? 91 : 97} r="1.6" fill="#7cb342" />)}
      {variant === "burger-classic" && <path d="M58 92 H142 M60 97 H140" stroke="#7a4426" strokeWidth="1.4" />}
      <path d="M52 86 H148 L146 90 L136 98 L130 90 L112 96 L104 90 L84 99 L78 90 L62 95 Z" fill="#ffc72c" />
      <rect x="54" y="78" width="92" height="9" rx="4.5" fill="#e2412f" />
      <path d="M50 78 q6 -8 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 v-4 H50 Z" fill="#6dbe45" />
      <path d="M52 74 Q52 32 100 30 Q148 32 148 74 Z" fill="#e9a24e" />
      <ellipse cx="82" cy="46" rx="20" ry="8" fill="#f5c27f" opacity="0.7" transform="rotate(-14 82 46)" />
      {[
        [76, 42, -20],
        [96, 38, 10],
        [116, 44, 30],
        [88, 56, -10],
        [110, 56, 20],
        [128, 58, 40],
        [70, 58, -30],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3" ry="1.5" fill="#fff5dc" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </>
  )
}

function Fries() {
  return (
    <>
      <Shadow cy={130} rx={40} ry={6} />
      {[
        [72, 40, -8],
        [80, 32, -4],
        [88, 38, 2],
        [96, 28, -2],
        [104, 34, 4],
        [112, 30, 6],
        [120, 40, 10],
        [128, 46, 12],
        [84, 46, -10],
        [108, 44, 0],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} 100)`}>
          <rect x={x - 3.5} y={y} width="7" height="64" rx="1.5" fill="#f6c445" />
          <rect x={x + 1.5} y={y} width="2" height="64" fill="#e0a526" />
        </g>
      ))}
      <path d="M66 74 L134 74 L124 128 L76 128 Z" fill="#d62839" />
      <path d="M66 74 Q100 88 134 74 L132 84 Q100 98 68 84 Z" fill="#a61b2b" />
      <rect x="74" y="104" width="52" height="6" fill="#ffffff" opacity="0.9" />
      <rect x="76" y="114" width="48" height="3" fill="#ffffff" opacity="0.6" />
    </>
  )
}

/* ---------- desserts ---------- */

function brownieBlock(cx: number, cy: number) {
  return (
    <g>
      <path d={`M${cx - 34} ${cy} L${cx} ${cy + 14} L${cx} ${cy + 34} L${cx - 34} ${cy + 20} Z`} fill="#3f2414" />
      <path d={`M${cx} ${cy + 14} L${cx + 34} ${cy} L${cx + 34} ${cy + 20} L${cx} ${cy + 34} Z`} fill="#4a2a18" />
      <path d={`M${cx - 34} ${cy} L${cx} ${cy - 14} L${cx + 34} ${cy} L${cx} ${cy + 14} Z`} fill="#5c3520" />
      <path
        d={`M${cx - 22} ${cy - 2} l8 -6 l6 8 l8 -8 l6 8 l8 -6`}
        stroke="#fff4e6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx={cx + 10} cy={cy + 3} rx="4" ry="2.6" fill="#c8a27a" />
      <ellipse cx={cx - 12} cy={cy + 4} rx="3.4" ry="2.2" fill="#c8a27a" />
    </g>
  )
}

function Brownies() {
  return (
    <>
      <Plate cy={114} rx={66} ry={16} />
      {brownieBlock(104, 82)}
      {brownieBlock(94, 58)}
    </>
  )
}

function CakeSlice() {
  return (
    <>
      <Plate cy={114} rx={68} ry={16} />
      <path d="M132 62 L156 82 L156 112 L132 92 Z" fill="#4a2817" />
      <path d="M56 92 L156 82 L156 112 L56 122 Z" fill="#5e3320" />
      <path d="M56 101 L156 91 L156 96 L56 106 Z" fill="#f3d9b1" />
      <path d="M56 113 L156 103 L156 107 L56 117 Z" fill="#f3d9b1" />
      <path d="M56 92 L132 62 L156 82 Z" fill="#3b1e10" />
      <path d="M78 84 L130 66" stroke="#6b3b22" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="138" cy="72" rx="9" ry="5" fill="#fff6ea" />
      <circle cx="138" cy="65" r="6" fill="#c1121f" />
      <circle cx="136" cy="63" r="1.8" fill="#ff6b6b" />
      <path d="M138 59 q2 -8 8 -10" stroke="#3a6b2a" strokeWidth="1.5" fill="none" />
    </>
  )
}

function LavaCake() {
  return (
    <>
      <Plate cy={112} rx={68} ry={17} />
      <path d="M100 104 Q120 110 140 116 Q110 124 76 118 Q88 110 100 104 Z" fill="#2b1309" />
      <path d="M64 106 Q64 58 100 56 Q136 58 136 106 Z" fill="#6a3720" />
      <path d="M64 106 Q66 96 100 96 Q134 96 136 106 Z" fill="#4b2616" />
      <path d="M72 76 Q78 62 96 60" stroke="#8d4f2f" strokeWidth="5" fill="none" strokeLinecap="round" />
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={78 + ((i * 29) % 44)} cy={60 + ((i * 13) % 12)} r="1.1" fill="#ffffff" opacity="0.9" />
      ))}
      <path d="M96 104 Q100 112 112 114" stroke="#5a2a14" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M140 106 q-6 -12 2 -16 q8 4 6 12 q-2 6 -8 4z" fill="#d7263d" />
      <path d="M140 90 l-4 -4 M142 90 l0 -6 M144 90 l4 -4" stroke="#3a8a3a" strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

/* ---------- Italian ---------- */

function Pasta({ variant }: { variant: DishArtKind }) {
  const base = variant === "pasta-pesto" ? "#7fa344" : variant === "pasta-alfredo" ? "#f6e4bc" : "#f2cf7a"
  return (
    <>
      <Shadow cy={128} rx={76} ry={8} />
      <ellipse cx="100" cy="102" rx="76" ry="26" fill="#ffffff" />
      <ellipse cx="100" cy="100" rx="60" ry="19" fill="#f2efe9" />
      <ellipse cx="100" cy="88" rx="48" ry="24" fill={base} />

      {variant === "pasta-pesto" && (
        <>
          {[
            [76, 82, 30],
            [92, 74, -20],
            [110, 80, 40],
            [124, 90, -30],
            [86, 96, 10],
            [104, 98, -40],
            [100, 70, 60],
            [118, 72, -10],
            [70, 94, -50],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <rect x="-9" y="-4" width="18" height="8" rx="2" fill="#f0c66e" />
              <ellipse cx="-9" cy="0" rx="1.6" ry="4" fill="#d9a441" />
              <path d="M-5 -4 l-2 8 M0 -4 l-2 8 M5 -4 l-2 8" stroke="#d9a441" strokeWidth="0.8" />
            </g>
          ))}
          {[
            [84, 86],
            [108, 88],
            [96, 80],
            [118, 98],
          ].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="7" ry="4" fill="#5b8f2e" opacity="0.85" />
          ))}
          {[
            [90, 90],
            [114, 82],
            [102, 94],
          ].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="2.2" ry="1.3" fill="#f7e3b5" />
          ))}
          <Leaf x={100} y={66} r={-20} s={1.1} />
        </>
      )}

      {variant === "pasta-alfredo" && (
        <>
          {[
            "M62 90 Q80 70 100 86 T138 84",
            "M66 98 Q86 80 104 96 T136 94",
            "M72 80 Q92 64 112 78 T134 76",
            "M74 104 Q96 92 118 104",
            "M80 72 Q98 60 118 70",
          ].map((d, i) => (
            <path key={i} d={d} stroke="#e9c77f" strokeWidth="5" fill="none" strokeLinecap="round" />
          ))}
          {[
            [86, 84, 9],
            [112, 90, 8],
            [100, 76, 6],
          ].map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.5} fill="#fff6e1" />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={74 + ((i * 31) % 54)} cy={72 + ((i * 17) % 30)} r="1.1" fill={i % 2 ? "#3a8a3a" : "#3b3b3b"} />
          ))}
        </>
      )}

      {variant === "pasta-aglio" && (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M${60 + i * 3} ${100 - i * 3} Q${82 + i * 2} ${64 + i * 2} ${100 + i * 2} ${88 - i * 2} T${140 - i * 2} ${80 + i * 2}`}
              stroke={i % 2 ? "#e6b653" : "#f5d27e"}
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
          ))}
          {[
            [86, 80],
            [110, 92],
            [100, 72],
            [124, 82],
          ].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="4" ry="2.4" fill="#fff5e1" stroke="#ead7b0" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={i} x={70 + ((i * 29) % 60)} y={70 + ((i * 13) % 32)} width="2.4" height="1.4" fill={i % 3 ? "#d62828" : "#3a8a3a"} />
          ))}
        </>
      )}
    </>
  )
}

function Lasagna({ veg }: { veg: boolean }) {
  const layers = veg
    ? ["#4f7a28", "#f1c46a", "#fff2d6", "#c2412b", "#f1c46a", "#fff2d6"]
    : ["#c2412b", "#f1c46a", "#fff2d6", "#c2412b", "#f1c46a", "#fff2d6"]
  return (
    <>
      <Plate cy={114} rx={70} ry={16} />
      <path d="M128 62 L150 74 L150 114 L128 102 Z" fill="#b8562e" />
      <path d="M56 70 L128 62 L150 74 L78 82 Z" fill="#f2b24c" />
      {layers.map((c, i) => (
        <path key={i} d={`M78 ${82 + i * 5.4} L150 ${74 + i * 5.4} L150 ${79.4 + i * 5.4} L78 ${87.4 + i * 5.4} Z`} fill={c} />
      ))}
      <path d="M56 70 L78 82 L78 114 L56 102 Z" fill="#d9822f" />
      {[
        [80, 72],
        [104, 70],
        [122, 70],
        [94, 76],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="2.2" fill="#c97a27" opacity="0.8" />
      ))}
      <Leaf x={110} y={68} r={-10} s={0.9} />
    </>
  )
}

function Risotto() {
  return (
    <>
      <Shadow cy={128} rx={76} ry={8} />
      <ellipse cx="100" cy="100" rx="76" ry="28" fill="#ffffff" />
      <ellipse cx="100" cy="96" rx="60" ry="22" fill="#e9e2d2" />
      <ellipse cx="100" cy="92" rx="54" ry="20" fill="#f3e2b6" />
      {Array.from({ length: 40 }, (_, i) => {
        const x = 56 + ((i * 41) % 88)
        const y = 80 + ((i * 19) % 24)
        return <ellipse key={i} cx={x} cy={y} rx="2.4" ry="1.3" fill={i % 3 ? "#fff6de" : "#e9d29a"} transform={`rotate(${(i * 53) % 180} ${x} ${y})`} />
      })}
      {[
        [82, 86],
        [112, 82],
        [100, 98],
        [124, 94],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 8} ${y} Q${x} ${y - 10} ${x + 8} ${y} Z`} fill="#9c6b43" />
          <rect x={x - 2.5} y={y} width="5" height="5" rx="1.5" fill="#d8bf9c" />
        </g>
      ))}
      {[
        [92, 80],
        [118, 100],
        [74, 98],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l8 -2 l-2 5 z`} fill="#fff9e8" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={70 + i * 8} cy={84 + ((i * 7) % 14)} r="1.2" fill="#3a8a3a" />
      ))}
    </>
  )
}

function Bruschetta() {
  return (
    <>
      <Board />
      {[
        [64, 92, -8],
        [100, 86, 4],
        [136, 92, 12],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse cx="0" cy="0" rx="22" ry="14" fill="#b9772e" />
          <ellipse cx="0" cy="-2" rx="19" ry="11" fill="#e0a85c" />
          {[
            [-8, -4],
            [2, -6],
            [10, -1],
            [-4, 2],
            [6, 4],
            [-12, 2],
          ].map(([tx, ty], j) => (
            <rect key={j} x={tx - 3} y={ty - 3} width="6" height="6" rx="1.4" fill={j % 2 ? "#c1121f" : "#e63946"} />
          ))}
          <Leaf x={0} y={-8} r={-20} s={0.6} />
        </g>
      ))}
    </>
  )
}

function GarlicBread() {
  return (
    <>
      <Board />
      {[
        [58, 90, -12],
        [84, 86, -4],
        [110, 86, 4],
        [136, 90, 12],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse cx="0" cy="0" rx="16" ry="20" fill="#c9862f" />
          <ellipse cx="0" cy="-1" rx="13" ry="17" fill="#f2c466" />
          <path d="M-10 -6 Q-4 -14 4 -8 Q12 -4 8 6 Q2 14 -6 8 Q-12 2 -10 -6 Z" fill="#ffd45c" />
          {[
            [-4, -4],
            [4, 2],
            [-2, 6],
            [6, -8],
          ].map(([hx, hy], j) => (
            <circle key={j} cx={hx} cy={hy} r="1.1" fill="#3a8a3a" />
          ))}
        </g>
      ))}
    </>
  )
}

function Tiramisu() {
  return (
    <>
      <Plate cy={114} rx={66} ry={16} />
      <path d="M128 56 L150 68 L150 110 L128 98 Z" fill="#8f5f3c" />
      {[
        ["#5a3a26", 0, 4],
        ["#fbebcb", 4, 9],
        ["#b07a4f", 13, 8],
        ["#fbebcb", 21, 9],
        ["#b07a4f", 30, 8],
        ["#fbebcb", 38, 6],
      ].map(([c, y, h], i) => (
        <path
          key={i}
          d={`M58 ${70 + (y as number)} L128 ${56 + (y as number)} L128 ${56 + (y as number) + (h as number)} L58 ${70 + (y as number) + (h as number)} Z`}
          fill={c as string}
        />
      ))}
      <path d="M58 70 L128 56 L150 68 L80 82 Z" fill="#6f4a33" />
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={74 + ((i * 23) % 60)} cy={66 + ((i * 7) % 12)} r="0.9" fill="#3b2414" />
      ))}
      <path d="M58 70 L80 82 L80 120 L58 108 Z" fill="#7a5235" opacity="0.4" />
      <ellipse cx="108" cy="66" rx="5" ry="3.2" fill="#3b2414" transform="rotate(-20 108 66)" />
      <path d="M104 67 q4 -2 8 -1" stroke="#6f4a33" strokeWidth="0.8" fill="none" />
    </>
  )
}

function PannaCotta() {
  return (
    <>
      <Plate cy={112} rx={66} ry={16} />
      <path d="M70 106 Q72 62 100 60 Q128 62 130 106 Z" fill="#fff8ea" />
      <path d="M118 70 Q126 84 128 104" stroke="#efe2c8" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M78 74 Q84 60 100 60 Q116 60 122 74 Q116 78 114 88 Q110 80 104 80 Q100 92 96 80 Q90 80 88 88 Q84 78 78 74 Z" fill="#b5172b" />
      <path d="M92 64 Q100 62 108 64" stroke="#e85d75" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[
        [62, 108, "#d7263d"],
        [140, 106, "#3d2c8d"],
        [132, 112, "#d7263d"],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={x as number} cy={y as number} r="5" fill={c as string} />
      ))}
      <Leaf x={100} y={58} r={-30} s={0.8} fill="#3e9b4f" />
    </>
  )
}

function Cannoli() {
  const tube = (x: number, y: number, r: number, end: string) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <rect x="-40" y="-11" width="80" height="22" rx="11" fill="#d59a4a" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={-30 + i * 6.6} cy={i % 2 ? -4 : 4} r="1.6" fill="#c27f33" />
      ))}
      <ellipse cx="-40" cy="0" rx="7" ry="11" fill="#fff5e2" />
      <ellipse cx="40" cy="0" rx="7" ry="11" fill="#fff5e2" />
      {[-3, 2, 6].map((d) => (
        <circle key={d} cx={-42} cy={d} r="1.6" fill={end} />
      ))}
      {[-5, 0, 5].map((d) => (
        <circle key={d} cx={42} cy={d} r="1.6" fill={end} />
      ))}
    </g>
  )
  return (
    <>
      <Plate cy={112} rx={70} ry={16} />
      {tube(96, 98, -8, "#8dbf5a")}
      {tube(104, 76, 10, "#3b2414")}
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={64 + ((i * 37) % 76)} cy={66 + ((i * 11) % 40)} r="0.9" fill="#ffffff" />
      ))}
    </>
  )
}

function Gelato() {
  return (
    <>
      <Shadow cy={130} rx={40} ry={6} />
      <circle cx="86" cy="70" r="22" fill="#b9d98c" />
      <path d="M68 76 q4 10 8 4 q4 8 8 2" stroke="#a5c978" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="114" cy="64" r="22" fill="#f4a6b8" />
      <ellipse cx="108" cy="56" rx="8" ry="4" fill="#ffc9d6" />
      <circle cx="80" cy="64" r="1.6" fill="#7aa24a" />
      <circle cx="92" cy="74" r="1.6" fill="#7aa24a" />
      <circle cx="120" cy="70" r="1.4" fill="#d6577a" />
      <rect x="120" y="30" width="7" height="34" rx="2" fill="#e8b566" transform="rotate(24 124 46)" />
      <path d="M68 84 L132 84 L122 128 L78 128 Z" fill="#ffffff" />
      <path d="M68 84 L132 84 L130 92 L70 92 Z" fill="#f06292" />
      {[84, 98, 112].map((x) => (
        <path key={x} d={`M${x} 96 L${x - 2} 124`} stroke="#f8bbd0" strokeWidth="5" />
      ))}
    </>
  )
}

function Cola() {
  return (
    <>
      <Shadow cy={130} rx={34} ry={5} />
      <rect x="112" y="18" width="5" height="70" rx="2" fill="#e63946" transform="rotate(14 114 52)" />
      <path d="M76 40 L124 40 L118 128 L82 128 Z" fill="#ffffff" fillOpacity="0.55" stroke="#bcdcf2" strokeWidth="2" />
      <path d="M78 54 L122 54 L118 126 L82 126 Z" fill="#4a2414" />
      <path d="M84 58 L90 58 L88 122 L85 122 Z" fill="#ffffff" opacity="0.2" />
      {[
        [94, 60, 12],
        [108, 64, -10],
      ].map(([x, y, r], i) => (
        <rect key={i} x={x - 8} y={y - 8} width="16" height="16" rx="3" fill="#ffffff" opacity="0.45" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {[
        [96, 96],
        [106, 108],
        [100, 116],
        [110, 88],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#ffffff" opacity="0.5" />
      ))}
      <circle cx="76" cy="44" r="12" fill="#ffe066" />
      <circle cx="76" cy="44" r="9" fill="#fff3b0" />
      <path d="M76 35 V53 M67 44 H85 M70 38 L82 50 M82 38 L70 50" stroke="#ffe066" strokeWidth="1.2" />
    </>
  )
}
