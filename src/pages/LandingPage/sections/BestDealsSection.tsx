import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/ui/SectionHeader";
import DealsGrid, { DealsGridSkeleton } from "@/components/DealsGrid";
import { useBestDeals } from "@/hooks/useBestDeals";
import { Suspense } from "react";

const BestDealsContent = () => {
  const { data: deals } = useBestDeals();
  return <DealsGrid deals={deals?.data || []} />;
};

const BestDealsSection = () => {
  const { t } = useTranslation();

  return (
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

      <Suspense fallback={<DealsGridSkeleton />}>
        <BestDealsContent />
      </Suspense>
    </motion.div>
  );
};

export default BestDealsSection;
