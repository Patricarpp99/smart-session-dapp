import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Contract } from "ethers";

import {
  CHAIN_CONFIG,
  getBackendWallet,
  type SupportedChainId,
} from "./config.js";
import { getTargetAddress, smartSessionAbi } from "./contracts.js";

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/execute", async (req, res) => {
  const { userAddress, chainId, functionName, args, contractAddress } = req.body;

  console.log("API /execute:", req.body);

  try {
    if (!CHAIN_CONFIG[chainId]) {
      return res.status(400).json({ error: "Unsupported chainId" });
    }

    const target =
      contractAddress || getTargetAddress(chainId as SupportedChainId);

    if (!target) {
      return res.status(400).json({
        error: "Missing contract address for this chain",
      });
    }

    if (functionName !== "store") {
      return res.status(400).json({ error: "Unsupported functionName" });
    }

    const wallet = getBackendWallet(chainId);
    const contract = new Contract(target, smartSessionAbi, wallet);

    const [value] = args || [];

    const tx = await contract.store(BigInt(value));
    console.log("TX:", tx.hash);

    const receipt = await tx.wait();

    return res.json({
      status: "ok",
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      explorerUrl: `${CHAIN_CONFIG[chainId].explorerUrl}/tx/${tx.hash}`,
    });
  } catch (err) {
    console.error("execute error", err);
    return res.status(500).json({
      error: "Execution failed",
      details: err.message ?? String(err),
    });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running → http://localhost:${PORT}`)
);
