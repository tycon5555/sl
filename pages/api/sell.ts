import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { mint, amount } = req.body;

    const filePath = `./db/${mint}.json`;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Token not found" });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    data.sells += 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.json({
      message: "Sell successful",
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Sell error" });
  }
}
