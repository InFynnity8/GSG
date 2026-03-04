"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/utils/supabase"
import { EventItem } from "@/types/events"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Copy, Link as LinkIcon } from "lucide-react"
import { PageCover } from "@/components/ui/page-cover"
import { formatEventTime } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { FaWhatsapp, FaFacebookF, FaTwitter } from "react-icons/fa"

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<EventItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching event:", error)
      } else {
        setEvent(data as EventItem)
      }
      setLoading(false)
    }

    getEvent()
  }, [id])

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
  }

  const handleNativeShare = async () => {
    if (!event) return
    const url = window.location.href
    const shareData: ShareData = {
      title: event.title,
      text: `Check out this event: ${event.title}`,
      url: url,
    }

    try {
      // Logic to include image in native share
      if (event.image && typeof navigator !== 'undefined' && navigator.canShare) {
        try {
          const response = await fetch(event.image)
          const blob = await response.blob()
          const file = new File([blob], 'event.jpg', { type: blob.type })
          
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              ...shareData,
              files: [file],
            })
            return
          }
        } catch (fileErr) {
          console.error("File sharing not supported or failed:", fileErr)
        }
      }
      
      // Fallback to standard share if image sharing fails
      if (navigator.share) {
        await navigator.share(shareData)
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }
const handleSocialShare = (platform: string) => {
  if (!event) return
  const url = encodeURIComponent(window.location.href)
  const shareText = `Check out this event: ${event.title}\n\n${window.location.href}`
  const encodedText = encodeURIComponent(shareText)
  let shareUrl = ""

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedText}`
      break
    case "facebook":
      // Facebook sharer primarily uses the URL to crawl OG tags
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      break
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400 font-medium">Loading event details...</div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Event not found</h2>
        <p className="text-slate-500 mt-2 mb-8">The event you're looking for might have been removed or moved.</p>
        <Button asChild>
          <Link href="/events">Back to All Events</Link>
        </Button>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedTime = eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <PageCover
        imageUrl={event.image || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1600&auto=format&fit=crop"}
        title={event.title}
        subtitle={formattedDate}
      />

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-100">
              <Link href="/events" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to events
              </Link>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                  {event.type}
                </span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="rounded-full">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer hover:bg-primary">
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSocialShare("whatsapp")} className="cursor-pointer hover:bg-primary">
                      <FaWhatsapp className="mr-2 h-4 w-4 text-emerald-500" />
                      <span>WhatsApp</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSocialShare("facebook")} className="cursor-pointer hover:bg-primary">
                      <FaFacebookF className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Facebook</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSocialShare("twitter")} className="cursor-pointer hover:bg-primary">
                      <FaTwitter className="mr-2 h-4 w-4 text-sky-500" />
                      <span>Twitter</span>
                    </DropdownMenuItem>
                    {typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined' && (
                      <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer hover:bg-primary">
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>More Options...</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">About this Event</h2>
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>

                {event.image && (
                  <div className="relative aspect-auto rounded-lg overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Date</p>
                        <p className="text-sm font-semibold text-slate-700">{formattedDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Time</p>
                        <p className="text-sm font-semibold text-slate-700">{formatEventTime(event.time)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Location</p>
                        <p className="text-sm font-semibold text-slate-700">Main Campus / Online</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <Button className="w-full font-bold">Add to Calendar</Button>
                  </div>
                </div>

                <div className="p-6 border border-slate-200 rounded-lg bg-white">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Have Questions?</h3>
                  <p className="text-sm text-slate-500 mb-4">Reach out if you need more information about this event.</p>
                  <Button asChild variant="outline" className="w-full text-sm hover:bg-primary transition-colors">
                    <Link href="/contact">Contact Organizer</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
