"use client";
import { motion } from "framer-motion";

const Card = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5,
      delay: index * 0.2,
      ease: "easeOut"
    }}
    viewport={{ once: true }}
    whileHover={{ 
      scale: 1.05,
      borderColor: "#30F917",
      transition: { duration: 0.2 }
    }}
    className="border-[#1A750F] border-2 rounded-lg p-6 max-w-[300px] w-full text-center mx-auto"
  >
    <motion.h2 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.3 }}
      className="font-bold text-xl mb-4 md:mb-6"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.4 }}
      className="text-sm"
    >
      {description}
    </motion.p>
  </motion.div>
);

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="text-white px-4 py-12 my-12 md:px-8 lg:px-12"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-bold text-3xl md:text-4xl mb-8 font-[family-name:var(--font-top-secret)] text-center"
      >
        HOW IT WORKS
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
        <Card
          index={0}
          title="Create"
          description="Enter a token name, symbol and total supply"
        />
        <Card
          index={1}
          title="Analyze"
          description="Paste a token address and get real-time risk + audit insights"
        />
        <Card
          index={2}
          title="Explore"
          description="Explore AI-generated trending names & narratives"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
