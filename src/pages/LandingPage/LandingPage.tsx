import HeroSlider from "../../components/HeroSlider";
import CategoryCards from "@/components/CategoriesCards";
import SectionHeader from "@/components/ui/SectionHeader";
import DealsGrid from "@/components/DealsGrid";
// import TopBrandsGrid from "@/components/TopBrandsGrid";
import { stats, brands, categories } from "@/constants";
import { useBestDeals } from "@/hooks/useBestDeals";
// import { useTopBrands } from "@/hooks/useTopBrands";
import BrandOwnerJoin from "@/components/BrandOwnerJoin";
import { Link } from "react-router";
import { useAuth } from "@/context/useAuth";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { data: deals, isLoading: dealsLoading, error } = useBestDeals();
  // const { data: topBrands } = useTopBrands();
  const { language } = useAuth();
  const { t } = useTranslation();

  console.log(error);
  console.log(language);

  return (
    <main className="bg-white text-black">
      <section className="pt-12 ">
        {/* hero slider */}
        <HeroSlider className="section-container " />

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10 text-sm section-container ">
          {stats.map((item, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <h4 className="font-semibold text-4xl">{item.number}</h4>
              <p className="text-gray-400 text-sm">
                {t(item.label, item.label)}
              </p>
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
          <div className="flex items-center justify-between">
            <SectionHeader
              text={t("todays_best_deals_on", "Today’s best deals on ")}
              primaryText={t("dr_offers", "Dr Offers")}
            />
            <Link
              to={"/products"}
              className="text-muted-foreground underline cursor-pointer"
            >
              {t("view_all_products", "View all products")}
            </Link>
          </div>
          <DealsGrid deals={deals?.data || []} loading={dealsLoading} />
        </div>

        {/* categories */}
        <div className="section-container">
          <SectionHeader
            text={t("shop_from", "Shop From ")}
            primaryText={t("top_categories", "Top Categories")}
          />
          <CategoryCards categories={categories} />
        </div>

        {/* top brands */}
        {/* <div className="section-container">
          <SectionHeader
            text={t("top", "Top ")}
            primaryText={t("brands", "Brands")}
          />
          <TopBrandsGrid data={topBrands?.data || []} />
        </div> */}

        {/* brand owner join */}
        <div className="section-container ">
          <BrandOwnerJoin targetPage="brandLanding" />
        </div>
      </section>
    </main>
  );
}
