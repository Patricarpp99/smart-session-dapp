import React, { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { appKit } from '../lib/appkit';
import {
  SMART_SESSION_TARGET_ADDRESS,
  SMART_SESSION_TARGET_ABI
} from '../lib/contracts';

export const SmartSessionPanel: React.FC = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const [logs, setLogs] = useState<string[]>([]);
  const [valueToStore, setValueToStore] = useState("42");
  const [executing, setExecuting] = useState(false);

  const log = (m: string) => setLogs(l => [...l, m]);

  const handleExecute = async () => {
    if (!address) {
      appKit.open();
      return log("Connect wallet first.");
    }

    setExecuting(true);

    try {
      log("Sending Smart Session execute request...");

      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress: address,
          chainId,
          contractAddress: SMART_SESSION_TARGET_ADDRESS,
          functionName: "store",
          args: [valueToStore]
        })
      });

      const data = await res.json();
      log(JSON.stringify(data, null, 2));
    } catch (err: any) {
      log("Error: " + err.message);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="p-4 border border-slate-700 rounded-lg mt-6">
      <h2 className="text-lg font-bold mb-4">Smart Session Runner</h2>

      <div>
        <input
          type="number"
          className="text-black p-2 rounded mr-2"
          value={valueToStore}
          onChange={e => setValueToStore(e.target.value)}
        />
        <button
          onClick={handleExecute}
          disabled={executing}
          className="px-4 py-2 bg-green-700 text-white rounded"
        >
          {executing ? "Executing..." : "Execute Smart Session"}
        </button>
      </div>

      <div className="mt-6 bg-black text-green-400 p-2 rounded h-56 overflow-auto text-xs">
        {logs.map((l,i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};