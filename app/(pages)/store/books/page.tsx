"use client"

import { ShoppingCart } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { supabase } from "@/utils/supabase"
import { Book } from "@/types/books"

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [category, setCategory] = useState<string | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance")
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)

  // Fetch books from Supabase
  useEffect(() => {
    async function loadBooks() {
      setLoading(true)
      const { data, error } = await supabase
        .from("books")
        .select("*")
      
      if (error) {
        console.error("Error fetching books:", error)
      } else {
        setBooks((data as Book[]) ?? [])
      }
      setLoading(false)
    }
    loadBooks()
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
    return Array.from(new Set(books.map((b) => b.category || "Other")))
  }, [books])

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    let list = [...books]

    if (category) {
      list = list.filter((b) => (b.category || "").toLowerCase() === category.toLowerCase())
    }

    if (q) {
      list = list.filter((b) => {
        return (
          b.title.toLowerCase().includes(q) ||
          (b.description || "").toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
        )
      })
    }

    if (maxPrice !== "") {
      const p = Number(maxPrice)
      if (!Number.isNaN(p)) list = list.filter((b) => b.price <= p)
    }

    if (sort === "price-asc") list = list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = list.sort((a, b) => b.price - a.price)

    return list
  }, [debouncedQuery, category, maxPrice, sort, books])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-20">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Library</h1>
        <p className="text-sm text-muted-foreground mt-1">A curated collection created by our community and founder.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full h-fit lg:w-64 bg-white border rounded-md p-4 shadow-sm lg:sticky lg:top-24">
          <label className="block mb-2 text-sm font-medium text-slate-700">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author..."
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Categories</option>
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
              {loading ? "Loading library..." : searching ? "Searching..." : `${filtered.length} book${filtered.length !== 1 ? "s" : ""} found`}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No books found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((book) => (
                <article key={book.id} className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white flex flex-col group transition-all hover:shadow-md">
                  <div className="aspect-square bg-slate-100 overflow-hidden relative">
                    {book.image ? (
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                        {book.category || "Other"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">{book.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4 flex-grow line-clamp-3 leading-relaxed">{book.description}</p>
                    
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Author</span>
                          <span className="text-xs font-semibold text-slate-700">{book.author}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Price</span>
                          <span className="text-sm font-bold text-primary">GHS {book.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90 transition-colors">
                        <ShoppingCart className="w-3.5 h-3.5" />
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
