"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function TrendingPage() {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/trending").then(res => {
      setTokens(res.data);
    });
  }, []);

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-8">Trending Tokens</h1>

      <div className="space-y-4">
        {tokens.length === 0 && (
          <p className="text-gray-400">No tokens found.</p>
        )}

        {tokens.map((token, i) => (
          <Link
            key={i}
            href={`/token/${token.mint}`}
            className="block bg-card p-5 rounded-xl hover:bg-[#1a1b1f] transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{token.name}</h2>
                <p className="text-gray-400">{token.symbol}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">
                  MC: {token.marketCap?.toFixed(2) ?? 0}
                </p>
                <p className="text-gray-400 text-sm">
                  Buys: {token.buys}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
