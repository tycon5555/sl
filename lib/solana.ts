import { Connection, clusterApiUrl } from "@solana/web3.js";

export const connection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=5fb05445-71c3-4632-afb4-d0e30699b906",
  "confirmed"
);
