const Card = ({ title, description }) => (
  <div className="border-[#1A750F] border-2 rounded-lg p-6 max-w-[300px] w-full text-center mx-auto">
    <h2 className="font-bold text-xl mb-4 md:mb-6">{title}</h2>
    <p className="text-sm">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="text-white px-4 py-12 my-12 md:px-8 lg:px-12"
    >
      <h1 className="font-bold text-3xl md:text-4xl mb-8 font-[family-name:var(--font-top-secret)] text-center">
        HOW IT WORKS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
        <Card
          title="Create"
          description="Enter a token name, symbol and total supply"
        />
        <Card
          title="Analyze"
          description="Paste a token address and get real-time risk + audit insights"
        />
        <Card
          title="Explore"
          description="Explore AI-generated trending names & narratives"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
