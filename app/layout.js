import localFont from "next/font/local";
import "./globals.css";
import { WalletProvider } from "@/WalletProvider";
const lemonMilk = localFont({
  src: "./fonts/LEMONMILK.otf",
  variable: "--font-lemon-milk",
});

const kgRedHands = localFont({
  src: "./fonts/KGRedHands.ttf",
  variable: "--font-kg-red-hands",
});
const topSecret = localFont({
  src: "./fonts/TopSecret.ttf",
  variable: "--font-top-secret",
});
const caviarDreams = localFont({
  src: "./fonts/CaviarDreams.ttf",
  variable: "--font-caviar-dreams",
});
const groteskRegular = localFont({
  src: "./fonts/AlteHaasGroteskRegular.ttf",
  variable: "--font-groteskRegular",
});

export const metadata = {
  title: "Hedera Pulse",
  description: "Your AI Token Launcher on Hedera Blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lemonMilk.variable} ${groteskRegular.variable} ${caviarDreams.variable} ${topSecret.variable} ${kgRedHands.variable} antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
