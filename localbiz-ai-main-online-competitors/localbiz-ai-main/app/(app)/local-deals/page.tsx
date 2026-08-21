'use client'

import { useMemo, useState } from 'react'
import {
  Backpack,
  BadgeIndianRupee,
  Check,
  Footprints,
  Headphones,
  MapPin,
  Navigation,
  PackageCheck,
  Rotate3D,
  Search,
  Sparkles,
  Star,
  Store,
  Tag,
} from 'lucide-react'

const categories = ['All', 'Electronics', 'Fashion', 'Bags'] as const

type Category = (typeof categories)[number]

type StoreDeal = {
  id: string
  name: string
  area: string
  distance: number
  price: number
  stock: number
  rating: number
}

type Product = {
  id: string
  name: string
  category: Exclude<Category, 'All'>
  onlinePrice: number
  icon: 'speaker' | 'shoe' | 'bag'
  stores: StoreDeal[]
}

const products: Product[] = [
  {
    id: 'speaker',
    name: 'Pulse Mini Bluetooth Speaker',
    category: 'Electronics',
    onlinePrice: 999,
    icon: 'speaker',
    stores: [
      { id: 's1', name: 'Sri Tech Corner', area: 'Kuniyamuthur', distance: 1.2, price: 849, stock: 7, rating: 4.6 },
      { id: 's2', name: 'City Mobile Hub', area: 'Ukkadam', distance: 2.8, price: 899, stock: 12, rating: 4.4 },
      { id: 's3', name: 'Digital Point', area: 'Town Hall', distance: 4.1, price: 929, stock: 5, rating: 4.5 },
    ],
  },
  {
    id: 'sneakers',
    name: 'StreetRun Everyday Sneakers',
    category: 'Fashion',
    onlinePrice: 1499,
    icon: 'shoe',
    stores: [
      { id: 'f1', name: 'Walkway Footwear', area: 'Sundarapuram', distance: 1.8, price: 1199, stock: 9, rating: 4.7 },
      { id: 'f2', name: 'Step In', area: 'R.S. Puram', distance: 5.3, price: 1249, stock: 14, rating: 4.5 },
      { id: 'f3', name: 'Urban Sole', area: 'Gandhipuram', distance: 6.1, price: 1299, stock: 6, rating: 4.3 },
    ],
  },
  {
    id: 'backpack',
    name: 'MetroLite Laptop Backpack',
    category: 'Bags',
    onlinePrice: 1299,
    icon: 'bag',
    stores: [
      { id: 'b1', name: 'Bag Bazaar', area: 'Selvapuram', distance: 2.1, price: 999, stock: 11, rating: 4.6 },
      { id: 'b2', name: 'Campus Collections', area: 'Peelamedu', distance: 6.8, price: 1049, stock: 20, rating: 4.5 },
      { id: 'b3', name: 'Travel Mate', area: 'Gandhipuram', distance: 5.9, price: 1099, stock: 8, rating: 4.4 },
    ],
  },
]

function ProductGlyph({ icon }: { icon: Product['icon'] }) {
  const className = 'size-24 stroke-[1.25] text-white drop-shadow-[0_12px_28px_rgba(34,211,238,0.34)] sm:size-28'

  if (icon === 'speaker') return <Headphones className={className} />
  if (icon === 'shoe') return <Footprints className={className} />
  return <Backpack className={className} />
}

export default function LocalDealsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [selectedId, setSelectedId] = useState(products[0].id)
  const [reservedStoreId, setReservedStoreId] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()

    return products.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category
      const searchMatch = !q || product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q)
      return categoryMatch && searchMatch
    })
  }, [category, query])

  const selected = products.find((product) => product.id === selectedId) ?? filteredProducts[0] ?? products[0]
  const sortedStores = [...selected.stores].sort((a, b) => a.price - b.price)
  const bestStore = sortedStores[0]
  const saving = selected.onlinePrice - bestStore.price
  const savingPct = Math.round((saving / selected.onlinePrice) * 100)

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#07101d]/80 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/12 blur-[110px]" />

      <div className="relative z-10 flex flex-col gap-6">
        <header className="flex flex-col gap-5 rounded-3xl border border-white/[0.14] bg-white/[0.055] p-5 backdrop-blur-[24px] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <Navigation className="size-3.5" />
              Spatial Marketplace · Demo nearby data
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Nearby Best Price
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Compare nearby local-store prices, spot the cheapest deal, and explore the product on an animated 3D-style stage before you visit.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] px-4 py-3 text-sm text-emerald-100">
            <p className="flex items-center gap-2 font-semibold"><Sparkles className="size-4" /> Support local. Pay less.</p>
            <p className="mt-1 text-xs text-emerald-200/70">Prices shown here are prototype demo data.</p>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 backdrop-blur-xl focus-within:border-cyan-300/35 focus-within:bg-white/[0.08]">
            <Search className="size-5 text-cyan-300" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search speaker, sneakers, backpack..."
              className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                  category === item
                    ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-100 shadow-[0_8px_24px_rgba(34,211,238,0.12)]'
                    : 'border-white/[0.10] bg-white/[0.045] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => {
                const cheapest = Math.min(...product.stores.map((store) => store.price))
                const isSelected = selected.id === product.id

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(product.id)
                      setReservedStoreId(null)
                    }}
                    className={`group rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-cyan-300/30 bg-gradient-to-br from-cyan-400/[0.12] to-violet-400/[0.08] shadow-[0_16px_44px_rgba(34,211,238,0.10)]'
                        : 'border-white/[0.10] bg-white/[0.05] hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.075]'
                    }`}
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.07] text-cyan-200">
                      {product.icon === 'speaker' ? <Headphones className="size-5" /> : product.icon === 'shoe' ? <Footprints className="size-5" /> : <Backpack className="size-5" />}
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{product.category}</p>
                    <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-white">{product.name}</h2>
                    <p className="mt-3 text-xs text-slate-400">Nearby from</p>
                    <p className="mt-0.5 text-xl font-bold text-emerald-300">₹{cheapest.toLocaleString('en-IN')}</p>
                  </button>
                )
              }) : (
                <div className="sm:col-span-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.035] p-8 text-center text-sm text-slate-400">
                  No demo products match that search yet.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/[0.12] bg-white/[0.055] p-4 backdrop-blur-[24px] sm:p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Nearby stores</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">{selected.name}</h2>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200">
                  <BadgeIndianRupee className="size-4" /> Save up to ₹{saving.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {sortedStores.map((store, index) => {
                  const isBest = index === 0
                  const reserved = reservedStoreId === store.id

                  return (
                    <div
                      key={store.id}
                      className={`flex flex-col gap-4 rounded-2xl border p-4 transition-all md:flex-row md:items-center ${
                        isBest
                          ? 'border-emerald-300/25 bg-emerald-400/[0.075] shadow-[0_14px_34px_rgba(16,185,129,0.08)]'
                          : 'border-white/[0.10] bg-black/10'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border ${isBest ? 'border-emerald-300/25 bg-emerald-400/15 text-emerald-200' : 'border-white/[0.12] bg-white/[0.06] text-slate-300'}`}>
                          <Store className="size-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-white">{store.name}</p>
                            {isBest ? <span className="rounded-full border border-emerald-300/20 bg-emerald-400/15 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-emerald-200">Best price</span> : null}
                          </div>
                          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {store.area} · {store.distance} km</span>
                            <span className="inline-flex items-center gap-1"><Star className="size-3 fill-current text-amber-300" /> {store.rating}</span>
                            <span className="inline-flex items-center gap-1"><PackageCheck className="size-3" /> {store.stock} in stock</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 md:justify-end">
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Store price</p>
                          <p className="text-2xl font-bold text-white">₹{store.price.toLocaleString('en-IN')}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReservedStoreId(reserved ? null : store.id)}
                          className={`min-w-28 rounded-xl border px-3 py-2 text-sm font-semibold transition ${reserved ? 'border-emerald-300/25 bg-emerald-400/15 text-emerald-100' : 'border-white/[0.14] bg-white/[0.07] text-white hover:bg-white/[0.12]'}`}
                        >
                          {reserved ? <span className="inline-flex items-center gap-1.5"><Check className="size-4" /> Reserved</span> : 'Reserve item'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-b from-white/[0.075] to-white/[0.035] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-[28px]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Interactive preview</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">3D-style product stage</h2>
                </div>
                <span className="flex size-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                  <Rotate3D className="size-5" />
                </span>
              </div>

              <div className="relative mt-5 flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.10] bg-[#040914] [perspective:900px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(139,92,246,0.14),transparent_34%)]" />
                <div className="pointer-events-none absolute inset-x-8 bottom-16 h-20 rounded-[50%] border border-cyan-300/15 bg-cyan-400/[0.045] shadow-[0_0_60px_rgba(34,211,238,0.12)] [transform:rotateX(68deg)]" />
                <div className="pointer-events-none absolute size-56 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-cyan-300/15" />
                <div className="pointer-events-none absolute size-72 animate-[spin_18s_linear_infinite_reverse] rounded-full border border-violet-300/10" />

                <div className="relative z-10 flex animate-[bounce_3.4s_ease-in-out_infinite] flex-col items-center">
                  <div className="flex size-48 items-center justify-center rounded-[2.5rem] border border-white/[0.13] bg-gradient-to-br from-cyan-400/[0.14] via-blue-500/[0.10] to-violet-500/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl [transform:rotateY(-12deg)_rotateX(5deg)] transition-transform duration-500 hover:[transform:rotateY(12deg)_rotateX(-2deg)_scale(1.04)]">
                    <ProductGlyph icon={selected.icon} />
                  </div>
                  <div className="mt-5 h-3 w-32 rounded-[50%] bg-black/50 blur-md" />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/[0.10] bg-black/15 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{selected.name}</p>
                    <p className="mt-1 text-xs text-slate-400">Best local deal at {bestStore.name}</p>
                  </div>
                  <span className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-200">-{savingPct}%</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.045] p-3">
                    <p className="text-xs text-slate-500">Online reference</p>
                    <p className="mt-1 text-lg font-semibold text-slate-300 line-through">₹{selected.onlinePrice.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] p-3">
                    <p className="text-xs text-emerald-200/70">Nearby best</p>
                    <p className="mt-1 text-lg font-bold text-emerald-300">₹{bestStore.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/15 bg-amber-300/[0.055] p-3 text-xs leading-relaxed text-amber-100/80">
                  <Tag className="mt-0.5 size-4 shrink-0 text-amber-200" />
                  Prototype prices are sample data. A production version would connect verified shop inventory and location APIs.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
