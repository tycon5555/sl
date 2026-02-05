"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Leaderboard() {
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/trending").then(res => {
      const sorted = res.data.sort((a: any, b: any) => b.buys - a.buys);
      setTokens(sorted);
    });
  }, []);

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>

      <div className="space-y-4">
        {tokens.map((token, i) => (
          <Link
            key={i}
            href={`/token/${token.mint}`}
            className="block bg-card p-5 rounded-xl hover:bg-[#1a1b1f] transition"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-400">{i + 1}</p>

              <div>
                <h2 className="text-xl font-bold">{token.name}</h2>
                <p className="text-gray-400">{token.symbol}</p>
              </div>

              <p className="text-primary font-semibold">Buys: {token.buys}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
