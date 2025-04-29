import CreateToken from "./CreateToken";

export const metadata = {
  title: "Create Token - Hedera Pulse",
  description: "Your AI Token Launcher on Hedera Blockchain",
};
const page = () => {
  return (
    <div>
      <CreateToken />
    </div>
  );
};

export default page;
