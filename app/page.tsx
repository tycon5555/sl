import Link from "next/link";

export default function Home() {
  return (
    <div className="px-10 py-20">
      <h1 className="text-5xl font-bold">SemiCrypto Pump</h1>

      <p className="text-gray-400 mt-4 text-lg">
        Launch tokens instantly. Bonding curve. Buy & Sell. Trending. Leaderboard.
      </p>

      <div className="mt-10 space-x-4">
        <Link href="/create" className="bg-primary px-6 py-3 rounded-xl font-semibold">
          Create Token
        </Link>

        <Link href="/trending" className="bg-card px-6 py-3 rounded-xl font-semibold">
          Trending Tokens
        </Link>
      </div>
    </div>
  );
}
