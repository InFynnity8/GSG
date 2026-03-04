"use client"

import React, { useEffect, useMemo, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { supabase } from "@/utils/supabase"
import { Merch } from "@/types/merchant"

export default function MerchandisePage() {
  const [merch, setMerch] = useState<Merch[]>([])
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [category, setCategory] = useState<string | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance")
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)

  // Fetch merchandise from Supabase
  useEffect(() => {
    async function loadMerch() {
      setLoading(true)
      const { data, error } = await supabase
        .from("merchandise")
        .select("*")
      
      if (error) {
        console.error("Error fetching merchandise:", error)
      } else {
        setMerch((data as Merch[]) ?? [])
      }
      setLoading(false)
    }
    loadMerch()
  }, [])

  // debounce input
  useEffect(() => {
    setSearching(true)
    const t = setTimeout(() => {
      setDebouncedQuery(query)
      setSearching(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const categories = useMemo(() => {
    return Array.from(new Set(merch.map((m) => m.category || "Other")))
  }, [merch])

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    let list = [...merch]

    if (category) {
      list = list.filter((m) => (m.category || "").toLowerCase() === category.toLowerCase())
    }

    if (q) {
      list = list.filter((m) => {
        return (
          m.title.toLowerCase().includes(q) ||
          (m.description || "").toLowerCase().includes(q)
        )
      })
    }

    if (maxPrice !== "") {
      const p = Number(maxPrice)
      if (!Number.isNaN(p)) list = list.filter((m) => m.price <= p)
    }

    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price)

    return list
  }, [debouncedQuery, category, maxPrice, sort, merch])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-20">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900">GSG Store</h1>
        <p className="text-sm text-muted-foreground mt-1">Official merchandise — T-shirts, caps, and more to support the mission.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full h-fit lg:w-64 bg-white border border-slate-200 rounded-lg p-4 shadow-sm lg:sticky lg:top-24">
          <label className="block mb-2 text-sm font-medium text-slate-700">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search merchandise..."
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Items</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">Max Price (GHS)</label>
            <input
              type="number"
              value={maxPrice as any}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="No limit"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">Sort By</label>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value as any)} 
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-slate-500 font-medium">
              {loading ? "Loading products..." : searching ? "Searching..." : `${filtered.length} item${filtered.length !== 1 ? "s" : ""} found`}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No merchandise found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article key={item.id} className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white flex flex-col group transition-all hover:shadow-md">
                  <div className="aspect-square bg-slate-50 overflow-hidden relative">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm border border-slate-100">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-tight mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-6 flex-grow line-clamp-2 leading-relaxed">{item.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Price</span>
                        <span className="text-lg font-bold text-primary">GHS {item.price.toFixed(2)}</span>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90 transition-colors shadow-sm active:scale-[0.98]">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
