import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navigation from "@/components/Navigation";
import RecentTokens from "@/components/RecentTokens";
import Stats from "@/components/Stats";
import WhatTheySay from "@/components/WhatTheySay";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-groteskRegular)] ">
      <Navigation />
      <Hero />
      <Stats />
      <HowItWorks />
      <RecentTokens/>
      <WhatTheySay />
      <Footer />
    </div>
  );
}
