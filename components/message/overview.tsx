import { motion } from "framer-motion";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-3 leading-relaxed text-center max-w-xl">
        <h3 className="text-lg font-semibold">I'm a Real Estate Assistant</h3>
        <div className="text-muted-foreground">
          I can help you with your real estate needs, whether you're buying, selling, or renting a property.
        </div>
        <div className="text-muted-foreground">
          I'm here to provide you with the information and support you need to make informed decisions.
        </div>
        <div className="text-muted-foreground">
          Whether you need help with property listings, market analysis, or legal advice, I'm here to assist you every step of the way.
        </div>
      </div>
    </motion.div>
  );
};
