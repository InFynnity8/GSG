"use client"

import React, { useEffect, useMemo, useState } from "react"
import { ShoppingCart } from "lucide-react"

type Merch = {
  id: string
  title: string
  description?: string
  price: number
  category: string
  image: string
}

// Only T-Shirt and Cap categories — images are product-style (round-neck shirts / caps)
const sampleMerch: Merch[] = [
  {
    id: "m1",
    title: "GSG Round Neck T-Shirt — Black",
    description: "Premium round-neck cotton tee with GSG print.",
    price: 25.0,
    category: "T-Shirt",
    image: "https://images.unsplash.com/photo-1602810316149-4f075f9f8b66?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
  },
  {
    id: "m2",
    title: "GSG Round Neck T-Shirt — White",
    description: "Classic white round-neck tee, unisex fit.",
    price: 25.0,
    category: "T-Shirt",
    image: "https://images.unsplash.com/photo-1585386959984-a4155222f9a4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
  },
  {
    id: "m3",
    title: "GSG Cap (Embroidered)",
    description: "Adjustable embroidered cap — one size fits all.",
    price: 15.0,
    category: "Cap",
    image: "https://images.unsplash.com/photo-1600180758890-3c9a4b6d6b67?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
  },
]

export default function Merchandise() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [category, setCategory] = useState<string | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setDebouncedQuery(query)
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  // fixed categories per request
  const categories = useMemo(() => ["T-Shirt", "Cap"], [])

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    let list = sampleMerch

    if (category) list = list.filter((m) => m.category.toLowerCase() === category.toLowerCase())

    if (q) {
      list = list.filter((m) => m.title.toLowerCase().includes(q) || (m.description || "").toLowerCase().includes(q))
    }

    if (maxPrice !== "") {
      const p = Number(maxPrice)
      if (!Number.isNaN(p)) list = list.filter((m) => m.price <= p)
    }

    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price)

    return list
  }, [debouncedQuery, category, maxPrice, sort])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-20">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">GSG Merchandise</h1>
        <p className="text-sm text-muted-foreground mt-1">T-shirts and caps — show your support.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full h-fit sticky lg:w-64 bg-white border rounded-md p-4 shadow-sm">
          <label className="block mb-2 text-sm font-medium">Search</label>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search merch..." className="w-full px-3 py-2 border rounded-md text-sm" />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm">
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <input type="number" value={maxPrice as any} onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="No limit" className="w-full px-3 py-2 border rounded-md text-sm" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="w-full px-3 py-2 border rounded-md text-sm">
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-400">{loading ? "Searching..." : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}</div>
            <div className="text-sm text-gray-400">Official GSG merchandise</div>
          </div>

          <div className="h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
              {filtered.map((m) => (
                <article key={m.id} className="border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col max-h-[50vh]">
                  <div className="aspect-4/5 bg-gray-100 overflow-hidden">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold line-clamp-2">{m.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 flex-1">{m.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-600">GSG Official</div>
                        <div className="text-sm font-medium">GHC{m.price.toFixed(2)}</div>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary"><ShoppingCart /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}