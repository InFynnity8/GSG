"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides: { src: string; title?: string; subtitle?: string; cta?: { primary: { label: string; href: string }; secondary: { label: string; href: string } }; type: string }[] = [
    {
        src: "/caro4.jpg",
        title: "Seeking God's Face",
        subtitle: "A registered non-denominational Christian ministry headquartered at Obomeng-Kwahu, Ghana — united by one mission since 2010.",
        cta: { primary: { label: "Our Story", href: "/about/history" }, secondary: { label: "Find a Branch", href: "/about/branches" } },
        type: "image"
    },
    {
        src: "/caro6.jpg",
        title: "New Dimensions of Worship",
        subtitle: "Encounter God's presence through spirit-filled worship, heartfelt prayer, and teachings that equip the saints for every good work.",
        cta: { primary: { label: "Find a Branch", href: "/about/branches" }, secondary: { label: "Our Mission", href: "/about/mission" } },
        type: "image"
    },
    {
        src: "/caro8.jpg",
        title: "Reaching the Lost",
        subtitle: "Through outreach, tract sharing, camp meetings, and one-on-one evangelism, GSG is bringing the Gospel to communities across Ghana.",
        cta: { primary: { label: "Our Activities", href: "/departments" }, secondary: { label: "Get Involved", href: "/contact" } },
        type: "image"
    },
    {
        src: "/videos/SOTW.mp4",
        title: "Word of the Season",
        subtitle: "Grow in faith through the revelation of God's Word and the ministry of the Holy Spirit — equipping and perfecting the saints.",
        cta: { primary: { label: "Upcoming Events", href: "/events" }, secondary: { label: "Give", href: "/give" } },
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
                                <div className="pb-12 md:pb-0 md:pt-0 text-white w-full md:w-auto text-center md:text-left">
                                    <h2 className="text-3xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
                                        {s.title}
                                    </h2>
                                    {s.subtitle && (
                                        <p className="mt-3 text-sm md:text-lg max-w-xl drop-shadow mx-auto md:mx-0">
                                            {s.subtitle}
                                        </p>
                                    )}
                                    {s.cta && (
                                        <div className="mt-8 flex flex-wrap justify-center md:justify-start items-center gap-3">
                                            <Link
                                                href={s.cta.primary.href}
                                                className="inline-flex items-center px-6 py-3 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary/90 transition-colors shadow-lg"
                                            >
                                                {s.cta.primary.label}
                                            </Link>
                                            <Link
                                                href={s.cta.secondary.href}
                                                className="inline-flex items-center px-6 py-3 bg-white/15 border border-white/50 backdrop-blur-sm text-white text-sm font-semibold rounded-md hover:bg-white hover:text-black transition-colors"
                                            >
                                                {s.cta.secondary.label}
                                            </Link>
                                        </div>
                                    )}
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
