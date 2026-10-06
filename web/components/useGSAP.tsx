"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGSAP() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin once
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
      // plugin already registered or registration error
    }

    // cleanup on unmount: kill all ScrollTriggers created by this mount
    return () => {
      try {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return { gsap, ScrollTrigger };
}
