import fetch from "cross-fetch";
import { REOWN_API } from "./config";

export async function walletPrepareCalls(params) {
  const payload = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "wallet_prepareCalls",
    params,
  };

  const res = await fetch(REOWN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Bad RPC response: ${text}`);
  }
}