"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@/components/useGSAP";

export default function AnimateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  // ensure ScrollTrigger is registered
  useGSAP();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context((self) => {
      // page fade/slide in
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }
      );

      // fade-up for elements with data-animate="fade-up" (scoped to this container)
      const fadeUps = gsap.utils.toArray("[data-animate=\"fade-up\"]", containerRef.current) as Element[];
      if (fadeUps.length) {
        gsap.from(fadeUps, { y: 14, autoAlpha: 0, duration: 0.55, ease: "power2.out", stagger: 0.05 });
      }

      // scroll-triggered fade-in for elements with data-animate="scroll-fade"
      const scrollFades = gsap.utils.toArray("[data-animate=\"scroll-fade\"]", containerRef.current) as Element[];
      if (scrollFades.length) {
        scrollFades.forEach((el: Element) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // breathing subtle pulse for elements with data-animate="breath"
      const breaths = gsap.utils.toArray("[data-animate=\"breath\"]", containerRef.current) as Element[];
      if (breaths.length) {
        gsap.to(breaths, { scale: 1.02, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }

      // pop reveals
      const pops = gsap.utils.toArray("[data-animate=\"pop\"]", containerRef.current) as Element[];
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
