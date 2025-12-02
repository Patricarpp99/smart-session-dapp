import { RPC_URL, PRIVATE_KEY } from "./config";
import { base } from "viem/chains";
import { privateKeyToAccount, createWalletClient, http } from "viem";

const account = privateKeyToAccount(PRIVATE_KEY);

const wallet = createWalletClient({
  account,
  chain: base,
  transport: http(RPC_URL),
});

export async function executeSmartSessionCall(prepared) {
  const tx = prepared?.result?.call?.rawTransaction;

  if (!tx) {
    throw new Error("Missing rawTransaction in prepared call");
  }

  const hash = await wallet.sendRawTransaction({
    serializedTransaction: tx,
  });

  return hash;
}