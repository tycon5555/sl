import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../lib/solana";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const OWNER_WALLET = "2MNswjcV6bmjYo1wNR9FUQv34DzAauiybEFrrYzdy3CD";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {

      const name = fields.name as string;
      const symbol = fields.symbol as string;

      if (!name || !symbol) {
        return res.status(400).json({ error: "Missing name or symbol" });
      }

      // 1️⃣ Generate new mint authority (token creator)
      const creator = Keypair.generate();

      // 2️⃣ Send launch fee to owner wallet
      const launchFeeTx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: creator.publicKey,
          toPubkey: new PublicKey(OWNER_WALLET),
          lamports: 0.01 * 1_000_000_000, // 0.01 SOL fee
        })
      );

      // ⚠️ Creator needs Devnet SOL from your faucet
      await sendAndConfirmTransaction(connection, launchFeeTx, [creator]);

      // 3️⃣ Create token mint
      const mint = await createMint(
        connection,
        creator,
        creator.publicKey,
        null,
        9
      );

      // 4️⃣ Create ATA for creator
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        creator,
        mint,
        creator.publicKey
      );

      // 5️⃣ Mint initial supply
      await mintTo(
        connection,
        creator,
        mint,
        tokenAccount.address,
        creator.publicKey,
        1_000_000_000_000 // 1T supply
      );

      // 6️⃣ Save token metadata
      const tokenData = {
        name,
        symbol,
        mint: mint.toBase58(),
        createdAt: Date.now(),
        buys: 0,
        sells: 0,
        marketCap: 0,
      };

      fs.writeFileSync(`./db/${mint.toBase58()}.json`, JSON.stringify(tokenData, null, 2));

      return res.json({
        message: "Token created successfully!",
        mint: mint.toBase58(),
      });
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Server error" });
  }
}
