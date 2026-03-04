import HeroCarousel from "@/components/sections/HeroCarousel";
import About from "@/components/sections/About";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import Give from "@/components/sections/Give";
import Values from "@/components/sections/Values";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <div className="">
      <HeroCarousel />
      <ScrollReveal direction="up" distance={50} delay={200}>
        <About />
      </ScrollReveal>
      <ScrollReveal direction="up" distance={40} delay={100}>
        <UpcomingEvents />
      </ScrollReveal>
      <ScrollReveal direction="up" distance={50} delay={200}>
        <Values />
      </ScrollReveal>
      <ScrollReveal direction="up" distance={40} delay={100}>
        <Give />
      </ScrollReveal>
    </div>
  );
}
