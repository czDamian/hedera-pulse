"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-6 md:py-12 lg:py-16 px-8 sm:px-16 lg:px-20"
    >
      {/* Glow effect (visible on md and above) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.5 }}
        className="hidden md:block absolute -top-30 -left-40 w-[30rem] h-[30rem] rounded-full z-0"
        style={{
          background: "radial-gradient(circle, #96FA8A, #30F917, #1B696600)",
          filter: "blur(120px)",
        }}
      />

      {/* bg wavy image */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/hero-design4.png"
          alt="hero"
          height={1000}
          width={1000}
          className="w-full md:max-w-2/3 absolute top-0 md:top-10 left-0 z-10"
        />
      </motion.div>

      <div className="relative z-20 flex flex-1 flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left text-3xl sm:text-4xl lg:text-4xl font-bold flex flex-col gap-3 md:gap-4 lg:gap-6 font-[family-name:var(--font-lemon-milk)] mt-16 md:mt-0"
            >
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                LAUNCH
              </motion.span>
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1A6F0F] via-[#30F917] to-[#71FF60] hero-glow"
              >
                AI-POWERED TOKENS
              </motion.span>
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                IN SECONDS
              </motion.span>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-sm text-center md:text-left mt-6 md:mt-12 font-normal max-w-xl lowercase font-[family-name:var(--font-groteskRegular)]"
            >
              create, analyze, and explore smart tokens with real-time AI
              insights...
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <Image
            src="/hero-design3.png"
            alt="hero"
            height={1000}
            width={1000}
            className="max-w-60 md:max-w-96 mx-auto"
          />
          <Image
            src="/logo.png"
            alt="logo"
            height={1000}
            width={1000}
            className="max-w-20 md:max-w-40 absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-20 flex gap-8 text-black font-[family-name:var(--font-kg-red-hands)] text-xs sm:text-sm justify-center md:justify-start"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            className="bg-gradient-to-r from-[#97FF8B] to-[#21AF0F] rounded-md px-6 py-2 inline-block"
            href="analyze-token"
          >
            Analyze Token
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            className="bg-gradient-to-r from-[#30F917] to-[#FEE440] rounded-md px-6 py-2 inline-block"
            href="/create-token"
          >
            Create Token
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
