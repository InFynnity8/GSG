"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function AnimateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use GSAP context to scope selectors and cleanup on unmount
    const ctx = gsap.context(() => {
      // page fade/slide in
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // staggered fade-up for elements opting in with data-animate="fade-up"
      const elems = gsap.utils.toArray("[data-animate=\"fade-up\"]");
      if (elems.length) {
        gsap.from(elems, {
          y: 18,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
        });
      }

      // small reveal for elements with data-animate="pop"
      const pops = gsap.utils.toArray("[data-animate=\"pop\"]");
      if (pops.length) {
        gsap.from(pops, { scale: 0.96, autoAlpha: 0, duration: 0.45, stagger: 0.04, ease: "back.out(1.1)" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={containerRef} className="gsap-page">
      {children}
    </div>
  );
}
