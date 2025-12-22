"use client"

import { CarFront, ShoppingCart } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"

type Book = {
  id: string
  title: string
  description?: string
  author: string
  price: number
  category?: string
  image: string
}

const sampleBooks: Book[] = [
  {
    id: "b1",
    title: "Founder's Journey",
    description: "Memoir and lessons from our founder on building community.",
    author: "Ps. James Atta",
    price: 19.99,
    category: "Memoir",
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
  },
  {
    id: "b2",
    title: "Designing with Purpose",
    description: "A practical guide to thoughtful product design.",
    author: "Ps. James Atta",
    price: 24.5,
    category: "Design",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
  },
  {
    id: "b3",
    title: "Community Building 101",
    description: "Strategies and stories that grew our organization.",
    author: "Ps. James Atta",
    price: 14.0,
    category: "Business",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
  },
  {
    id: "b4",
    title: "Creative Rituals",
    description: "Daily habits for productive creative work.",
    author: "Ps. James Atta",
    price: 12.0,
    category: "Self-help",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
  }
]

export default function BooksPage() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [category, setCategory] = useState<string | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance")
  const [loading, setLoading] = useState(false)

  // debounce input
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setDebouncedQuery(query)
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const categories = useMemo(() => {
    return Array.from(new Set(sampleBooks.map((b) => b.category || "Other")))
  }, [])

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    let list = sampleBooks.filter((b) => b.author === "Ps. James Atta")

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
  }, [debouncedQuery, category, maxPrice, sort])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 pb-20">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Library</h1>
        <p className="text-sm text-muted-foreground mt-1">A curated collection created by our founder.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full h-fit sticky lg:w-64 bg-white border rounded-md p-4 shadow-sm">
          <label className="block mb-2 text-sm font-medium">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, description..."
            className="w-full px-3 py-2 border rounded-md text-sm"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
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
            <input
              type="number"
              value={maxPrice as any}
              onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="No limit"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
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
            <div className="text-sm text-gray-400">
              {loading ? "Searching..." : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
            </div>
            <div className="text-sm text-gray-400">Showing books authored by  Ps James Atta</div>
          </div>
<div className="h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 ">
            {filtered.map((book) => (
              <article key={book.id} className="border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col max-h-[50vh]">
                <div className="aspect-4/5 bg-gray-100 overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex-1">{book.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-600">by {book.author}</div>
                      <div className="text-sm font-medium">GHC{book.price.toFixed(2)}</div>
                    </div>
                    <button className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary"> <ShoppingCart/></button>
                  </div>
                </div>
              </article>
            ))}
          </div></div>
        </main>
      </div>
    </div>
  )
}