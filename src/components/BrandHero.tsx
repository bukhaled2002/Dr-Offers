import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function BrandHero() {
  const { t } = useTranslation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section-container min-h-[70vh] flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl leading-14 lg:leading-18 font-bold text-center space-y-4"
      >
        <motion.h1 variants={itemVariants}>{t("brand_hero_heading_1")}</motion.h1>
        <motion.h1 variants={itemVariants}>
          <Trans
            i18nKey="brand_hero_heading_2"
            components={{ highlight: <span className="bg-[#F9ED32]" /> }}
          />
        </motion.h1>
      </motion.div>
    </section>
  );
}
