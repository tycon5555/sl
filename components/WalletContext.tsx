"use client";

import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = "https://devnet.helius-rpc.com/?api-key=5fb05445-71c3-4632-afb4-d0e30699b906";

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
