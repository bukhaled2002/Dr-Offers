import HeroSlider from "../../components/HeroSlider";
import CategoryCards from "@/components/CategoriesCards";
import SectionHeader from "@/components/ui/SectionHeader";
import DealsGrid from "@/components/DealsGrid";
import TopBrandsGrid from "@/components/TopBrandsGrid";
import { stats, brands, categories } from "@/constants";
import { useBestDeals } from "@/hooks/useBestDeals";
import { useTopBrands } from "@/hooks/useTopBrands";
import BrandOwnerJoin from "@/components/BrandOwnerJoin";

export default function LandingPage() {
  const { data: deals, isLoading: dealsLoading } = useBestDeals();
  const { data: topBrands } = useTopBrands();
  console.log(deals);
  return (
    <main className="bg-white text-black">
      <section className="pt-12 ">
        {/* hero slider */}
        <HeroSlider className="section-container " />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10 text-sm section-container ">
          {stats.map((item, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <h4 className="font-semibold text-4xl">{item.number}</h4>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
        {/* brands */}
        <div className="flex justify-around items-center my-10 flex-wrap gap-3 gap-y-6 bg-[#F6F3F2] p-10">
          {brands.map((brand) => (
            <img key={brand} src={brand} />
          ))}
        </div>
        {/* best deals */}
        <div className="section-container">
          <SectionHeader
            text="Today’s best deals on "
            primaryText="Dr Offers"
          />

          <DealsGrid deals={deals?.data || []} loading={dealsLoading} />
        </div>

        {/* categories */}

        <div className="section-container">
          <SectionHeader text="Shop From " primaryText="Top Categories" />

          <CategoryCards categories={categories} />
        </div>

        {/* top brands */}
        <div className="section-container">
          <SectionHeader text="Top " primaryText="Brands" />
          <TopBrandsGrid data={topBrands?.data || []} />;
        </div>

        <div className="section-container ">
          <BrandOwnerJoin targetPage="brandLanding" />
        </div>
      </section>
    </main>
  );
}
