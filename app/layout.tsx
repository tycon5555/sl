import "./globals.css";
import WalletWrapper from "../components/WalletWrapper";

export const metadata = {
  title: "SemiCrypto Pump",
  description: "Pump.fun style token launcher on Solana Devnet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark text-white">
        <WalletWrapper>
          {children}
        </WalletWrapper>
      </body>
    </html>
  );
}
