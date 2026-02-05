"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import BuySellPanel from "../../../components/BuySellPanel";

export default function TokenPage({ params }: any) {
  const { mint } = params;
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/trending").then(res => {
      const found = res.data.find((t: any) => t.mint === mint);
      setToken(found);
    });
  }, [mint]);

  if (!token) {
    return (
      <div className="px-10 py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold">{token.name}</h1>
      <p className="text-gray-400 mb-6">{token.symbol}</p>

      <div className="bg-card p-6 rounded-xl mb-8">
        <p className="font-semibold">
          Market Cap:{" "}
          <span className="text-primary">
            {token.marketCap?.toFixed(2) ?? 0}
          </span>
        </p>

        <p className="text-gray-400">
          Buys: {token.buys} | Sells: {token.sells}
        </p>
      </div>

      <div className="bg-card h-[300px] rounded-xl flex items-center justify-center text-gray-500 mb-10">
        Chart Coming Soon
      </div>

      <BuySellPanel mint={mint} />
    </div>
  );
}
