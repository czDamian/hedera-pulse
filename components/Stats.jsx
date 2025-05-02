import { AiOutlineLink } from "react-icons/ai";
import { TiCreditCard } from "react-icons/ti";
import { BiTask } from "react-icons/bi";

const StatCard = ({ title, value, icon }) => (
  <div className="flex-1 min-w-[300px] max-w-[400px] bg-gradient-to-r from-[#1A5913] from-70% to-[#A9FF9E] rounded-lg p-6 md:p-8 text-white transition-transform hover:scale-[1.02] duration-200">
    <div className="flex justify-between items-center">
      <div className="space-y-4">
        <h1 className="text-base md:text-lg font-[family-name:var(--font-lemon-milk)]">
          {title}
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
          {value}
        </h2>
      </div>
      <span className="bg-white/10 p-3 rounded-full">
        {icon}
      </span>
    </div>
  </div>
);

const Stats = () => {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          <StatCard
            title="Total Tokens Created"
            value="85+"
            icon={<AiOutlineLink className="text-white" size={30} />}
          />
          <StatCard
            title="AI Tasks Used"
            value="359+"
            icon={<BiTask className="text-white" size={30} />}
          />
          <StatCard
            title="Topics Created"
            value="1600+"
            icon={<TiCreditCard className="text-white" size={30} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
