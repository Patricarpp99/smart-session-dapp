import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { walletPrepareCalls } from "./prepareCalls";
import { executeSmartSessionCall } from "./signAndSend";
import { TARGET_ABI, TARGET_ADDRESS } from "./contracts";
import { PORT } from "./config";
import { encodeFunctionData } from "viem";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/execute", async (req, res) => {
  try {
    const { userAddress, chainId, functionName, args } = req.body;

    const data = encodeFunctionData({
      abi: TARGET_ABI,
      functionName,
      args,
    });

    const params = [
      {
        from: userAddress,
        chainId: "0x2105", // Base mainnet
        calls: [
          {
            to: TARGET_ADDRESS,
            data,
          },
        ],
        capabilities: {},
      }
    ];

    const prepared = await walletPrepareCalls(params);
    const txHash = await executeSmartSessionCall(prepared);

    return res.json({ success: true, txHash });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Smart Session backend running at http://localhost:${PORT}`);
});