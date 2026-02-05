import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { curve } from "../../lib/curve";

const OWNER = "2MNswjcV6bmjYo1wNR9FUQv34DzAauiybEFrrYzdy3CD";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { mint, amount } = req.body;

    const filePath = `./db/${mint}.json`;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Token not found" });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Update buys
    data.buys += 1;

    // Update supply (simulate bonding curve)
    const newSupply = data.buys * amount * 10_000;

    data.marketCap = curve.marketCap(newSupply);

    // Save updated token data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.json({
      message: "Buy successful!",
      newMarketCap: data.marketCap,
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Buy error" });
  }
}
