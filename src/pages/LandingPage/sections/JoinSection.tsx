import { motion } from "framer-motion";
import BrandOwnerJoin from "@/components/BrandOwnerJoin";

const JoinSection = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="section-container "
    >
      <BrandOwnerJoin targetPage="brandLanding" />
    </motion.div>
  );
};

export default JoinSection;
