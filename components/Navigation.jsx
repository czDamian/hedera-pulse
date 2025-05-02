import Link from "next/link";

const Navigation = () => {
  return (
    <section id="nav">
      <div className="flex bg-gradient-to-r from-[#14450E] to-[#14450E] h-16 items-center justify-between px-4 md:px-8 text-white sticky z-10">
        <div className="font-bold text-xl md:text-2xl font-[family-name:var(--font-lemon-milk)]">
          Hedera Pulse
        </div>
        <nav className="hidden  sm:flex gap-4 md:gap-6 lg:gap-8">
          <Link href="/my-tokens">View Tokens</Link>
          <Link href="/analyze-token">Analyze Token</Link>
        </nav>
        <div className="shadow-lg">
          <button className="text-black bg-gradient-to-b from-[#1EB40B] to-[#30F917] rounded-lg px-4 md:px-6 py-2 ">
            <Link href="/onboard"> Get Started</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
