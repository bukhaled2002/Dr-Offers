import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryCards from "@/components/CategoriesCards";
import { categories } from "@/constants";

const CategoriesSection = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default CategoriesSection;
