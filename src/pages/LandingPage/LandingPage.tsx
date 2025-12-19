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
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";

const parseNumber = (str: string) => {
  return parseInt(str.replace(/[^0-9]/g, ""));
};

const getSuffix = (str: string) => {
  return str.replace(/[0-9,]/g, "");
};

export default function LandingPage() {
  const { data: deals, isLoading: dealsLoading } = useBestDeals();
  // const { data: topBrands } = useTopBrands();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="bg-white text-black overflow-hidden">
      <section className="pt-12 ">
        {/* hero slider */}
        <HeroSlider className="section-container " />

        {/* stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10 text-sm section-container "
        >
          {stats.map((item, index) => (
            <motion.div variants={itemVariants} className="flex flex-col gap-4" key={index}>
              <h4 className="font-semibold text-4xl">
                <Counter value={parseNumber(item.number)} />
                {getSuffix(item.number)}
              </h4>
              <p className="text-gray-400 text-sm">
                {t(item.label, item.label)}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* brands marquee */}
        <div className="bg-[#F6F3F2] py-10 mt-10 overflow-hidden relative border-y border-gray-100" dir="ltr">
          <motion.div 
            animate={{ x: ["0%", "-100%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-10 whitespace-nowrap w-full h-10"
          >
            {[...brands,...brands, ...brands].map((brand, index) => (
              <img 
                key={index} 
                src={brand} 
                alt="brand-logo" 
                className="size-18 object-contain md:size-24 transition-all"
              />
            ))}
          </motion.div>
        </div>

        {/* best deals */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
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
        </motion.div>

        {/* categories */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container"
        >
          <SectionHeader
            text={t("shop_from", "Shop From ")}
            primaryText={t("top_categories", "Top Categories")}
          />
          <CategoryCards categories={categories} />
        </motion.div>

        {/* brand owner join */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-container "
        >
          <BrandOwnerJoin targetPage="brandLanding" />
        </motion.div>
      </section>
    </main>
  );
}
