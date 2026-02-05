"use client";
import axios from "axios";
import { useState } from "react";

export default function BuySellPanel({ mint }: { mint: string }) {
  const [amount, setAmount] = useState(1);

  const buy = async () => {
    const res = await axios.post("/api/buy", {
      mint,
      amount
    });

    alert(res.data.message);
  };

  const sell = async () => {
    const res = await axios.post("/api/sell", {
      mint,
      amount
    });

    alert(res.data.message);
  };

  return (
    <div className="bg-card p-6 rounded-xl">
      <h3 className="text-2xl font-bold mb-4">Trade Token</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-3 bg-[#1a1b1f] rounded mb-4"
      />

      <div className="flex gap-4">
        <button onClick={buy} className="bg-primary px-6 py-3 rounded-xl font-bold w-full">
          Buy
        </button>

        <button onClick={sell} className="bg-red-600 px-6 py-3 rounded-xl font-bold w-full">
          Sell
        </button>
      </div>
    </div>
  );
}
