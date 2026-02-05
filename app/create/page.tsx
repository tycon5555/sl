"use client";
import { useState } from "react";
import axios from "axios";

export default function CreateToken() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleCreate = async () => {
    const form = new FormData();
    form.append("name", name);
    form.append("symbol", symbol);
    if (file) form.append("icon", file);

    const res = await axios.post("/api/createToken", form);
    alert(res.data.message);
  };

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold">Create Token</h1>

      <div className="mt-10 max-w-lg">
        <input onChange={e => setName(e.target.value)} className="w-full p-3 bg-card rounded mb-4" placeholder="Token Name" />

        <input onChange={e => setSymbol(e.target.value)} className="w-full p-3 bg-card rounded mb-4" placeholder="Symbol" />

        <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} className="mb-4" />

        <button onClick={handleCreate} className="bg-primary px-6 py-3 rounded-xl font-bold">
          Create Token
        </button>
      </div>
    </div>
  );
}
