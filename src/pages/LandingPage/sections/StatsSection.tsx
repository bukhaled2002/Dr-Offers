import { motion } from "framer-motion";
import { stats } from "@/constants";
import Counter from "@/components/Counter";
import { useTranslation } from "react-i18next";

const parseNumber = (str: string) => {
  return parseInt(str.replace(/[^0-9]/g, ""));
};

const getSuffix = (str: string) => {
  return str.replace(/[0-9,]/g, "");
};

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

const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-10 text-sm section-container"
    >
      {stats.map((item, index) => (
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4"
          key={index}
        >
          <h4 className="font-semibold text-4xl">
            <Counter value={parseNumber(item.number)} />
            {getSuffix(item.number)}
          </h4>
          <p className="text-gray-400 text-sm">{t(item.label, item.label)}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsSection;
