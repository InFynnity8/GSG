"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides: { src: string; title?: string; subtitle?: string; type: string }[] = [

    {
        src: "/caro3.jpeg",
        title: "Welcome",
        subtitle: "Join our vibrant and welcoming community, where faith, fellowship, and growth come together to create a meaningful spiritual journey for everyone.",
        type: "image"
    },
    {
        src: "/worship.jpg",
        title: "Worship",
        subtitle: "Experience our inspiring worship services, filled with uplifting music, heartfelt prayers, and teachings that guide you closer to God in every aspect of life.",
        type: "image"
    },
    {
        src: "/caro2.jpeg",
        title: "Outreach",
        subtitle: "Be part of our outreach initiatives that serve the community, offering support, love, and practical help to those in need, making a real impact around us.",
        type: "image"
    },
    {
        src: "/videos/SOTW.mp4",
        title: "Sermons",
        subtitle: "Grow with us through our sermons, designed to enlighten, encourage, and challenge you, helping you apply faith and wisdom in your everyday life.",
        type: "video"
    }
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const delay = 5000;

    useEffect(() => {
        if (isPaused) return;

        timeoutRef.current = window.setTimeout(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, delay);

        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, [index, isPaused]);

    // swipe handling for mobile
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    function onTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.changedTouches[0].clientX;
    }
    function onTouchMove(e: React.TouchEvent) {
        touchEndX.current = e.changedTouches[0].clientX;
    }
    function onTouchEnd() {
        if (touchStartX.current == null || touchEndX.current == null) return;
        const dx = touchStartX.current - touchEndX.current;
        const threshold = 50;
        if (dx > threshold) {
            // swipe left -> next
            setIndex((i) => (i + 1) % slides.length);
        } else if (dx < -threshold) {
            // swipe right -> prev
            setIndex((i) => (i - 1 + slides.length) % slides.length);
        }
        touchStartX.current = null;
        touchEndX.current = null;
    }

    function goPrev() {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    function goNext() {
        setIndex((i) => (i + 1) % slides.length);
    }

    return (
        <section
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
        >
            {/* Slides */}
            <div className="relative h-[60vh] md:h-[85vh]">
                {slides.map((s, i) => {
                    const active = i === index;
                    return (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${active ? "opacity-100 z-20" : "opacity-0 z-10"
                                }`}
                            aria-hidden={!active}
                        >

                            {s.type === "image" ? (
                                <Image
                                    src={s.src}
                                    alt={s.title ?? `slide-${i}`}
                                    fill
                                    sizes="(min-width: 1024px) 1200px, 100vw"
                                    className="object-cover"
                                    style={{ objectPosition: "center" }}
                                    quality={100}
                                />
                            ) : (
                                <video
                                    src={s.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                ></video>
                            )}

                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />


                            <div className="absolute inset-0 max-w-6xl mx-auto px-6 md:px-12 flex items-end md:items-center">
                                <div className="pb-12 md:pb-0 md:pt-0 text-white">
                                    <h2 className="text-3xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
                                        {s.title}
                                    </h2>
                                    {s.subtitle && (
                                        <p className="mt-3 text-sm md:text-lg max-w-xl drop-shadow">
                                            {s.subtitle}
                                        </p>
                                    )}
                                    <div className="mt-6">
                                        <Button className="cursor-pointer bg-white hover:text-white text-black hover:opacity-95">
                                            Join Us
                                        </Button>
                                        <Button variant="outline" className="ml-3 text-white/90 bg-transparent hover:text-black hover:bg-white  cursor-pointer ">
                                            Learn more
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="hidden md:flex cursor-pointer absolute left-4 md:top-1/2 -translate-y-1/2 z-30 rounded-full p-2 bg-white/20 hover:bg-white/30 text-white"
            >
                <FiChevronLeft size={20} />
            </button>
            <button
                onClick={goNext}
                aria-label="Next slide"
                className="hidden md:flex cursor-pointer absolute right-4 md:top-1/2 -translate-y-1/2 z-30 rounded-full p-2 bg-white/20 hover:bg-white/30 text-white"
            >
                <FiChevronRight size={20} />
            </button>


            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${i === index ? "w-10 bg-primary" : "bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
