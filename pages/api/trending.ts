import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const files = fs.readdirSync("./db");

    const tokens = files.map(file => {
      const data = JSON.parse(fs.readFileSync(`./db/${file}`, "utf8"));
      return { ...data };
    });

    const sorted = tokens.sort((a, b) => b.buys - a.buys);

    return res.json(sorted);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error loading trending" });
  }
}
