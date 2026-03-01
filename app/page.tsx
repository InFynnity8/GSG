import HeroCarousel from "@/components/sections/HeroCarousel";
import About from "@/components/sections/About";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import Give from "@/components/sections/Give";
import Values from "@/components/sections/Values";

export default function Home() {
  return (
    <div className="">
      <HeroCarousel />
      <About />
      <UpcomingEvents />
      <Values/>
      <Give />
    </div>
  );
}
