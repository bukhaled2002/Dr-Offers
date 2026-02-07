import HeroSlider from "../../components/HeroSlider";
import StatsSection from "./sections/StatsSection";
import BrandsMarquee from "./sections/BrandsMarquee";
import BestDealsSection from "./sections/BestDealsSection";
import CategoriesSection from "./sections/CategoriesSection";
import JoinSection from "./sections/JoinSection";

export default function LandingPage() {
  return (
    <main className="bg-white text-black overflow-hidden">
      <section className="pt-12 ">
        {/* hero slider */}
        <HeroSlider className="section-container " />

        {/* stats */}
        <StatsSection />

        {/* brands marquee */}
        <BrandsMarquee />

        {/* best deals */}
        <BestDealsSection />

        {/* categories */}
        <CategoriesSection />

        {/* brand owner join */}
        <JoinSection />
      </section>
    </main>
  );
}
