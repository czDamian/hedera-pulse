import MyTokens from "./MyTokens";

export const metadata = {
  title: "My Tokens - Hedera Pulse",
  description: "Your AI Token Launcher on Hedera Blockchain",
};
const page = () => {
  return (
    <div>
      <MyTokens />
    </div>
  );
};

export default page;
