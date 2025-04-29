import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-24 md:py-12 lg:py-16 px-8 sm:px-16 lg:px-20"
    >
      {/* Glow effect (visible on md and above) */}
      <div
        className="hidden md:block absolute -top-30 -left-40 w-[30rem] h-[30rem] rounded-full opacity-40 z-0"
        style={{
          background: "radial-gradient(circle, #96FA8A, #30F917, #1B696600)",
          filter: "blur(120px)",
        }}
      />

      {/* bg wavy image */}
      <Image
        src="/hero-design4.png"
        alt="hero"
        height={1000}
        width={1000}
        className="w-full md:max-w-2/3 absolute top-10 left-0 z-10"
      />

      <div className="relative z-20 flex flex-1 flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white">
            <div className="text-center md:text-left text-3xl sm:text-4xl lg:text-4xl font-bold flex flex-col gap-3 md:gap-4 lg:gap-6 font-[family-name:var(--font-lemon-milk)] ">
              <span>LAUNCH</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1A6F0F] via-[#30F917] to-[#71FF60] hero-glow">
                AI-POWERED TOKENS
              </span>
              <span className="block">IN SECONDS</span>
            </div>
            <div className="text-sm text-center md:text-left mt-6 md:mt-12 font-normal max-w-xl lowercase font-[family-name:var(--font-groteskRegular)]">
              create, analyze, and explore smart tokens with real-time AI
              insights...
            </div>
          </div>
        </div>
        <div className="relative">
          {/* hedera logo placed on top of hero design logo */}
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
        </div>
      </div>

      <div className="relative z-20 flex gap-8 text-black font-[family-name:var(--font-kg-red-hands)] text-xs sm:text-sm justify-center md:justify-start">
        <Link
          className="bg-gradient-to-r from-[#97FF8B] to-[#21AF0F] rounded-md px-6 py-2"
          href="analyze-token"
        >
          Analyze Token
        </Link>
        <Link
          className="bg-gradient-to-r from-[#30F917] to-[#FEE440] rounded-md px-6 py-2"
          href="/create-token"
        >
          Create Token
        </Link>
      </div>
    </section>
  );
};

export default Hero;
