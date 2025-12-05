import React, { useState } from "react";
import axios from "axios";
import { useAccount, useChainId } from "wagmi";
import { networks } from "../lib/wagmi";
import { SMART_SESSION_TARGETS } from "../lib/contracts";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

type LogEntry = {
  ts: string;
  level: "info" | "error";
  message: string;
};

function formatAddress(addr?: string | null) {
  if (!addr) return "Not connected";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatChain(chainId?: number | null) {
  if (!chainId) return "Unknown";
  const n = networks.find((c) => c.id === chainId);
  return n ? `${n.name} (chainId ${chainId})` : `chainId ${chainId}`;
}

const SmartSessionPlayground: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const [valueToStore, setValueToStore] = useState("0");
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastTx, setLastTx] = useState<{
    txHash: string;
    explorerUrl?: string;
  } | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const appendLog = (entry: LogEntry) =>
    setLogs((prev) => [entry, ...prev].slice(0, 50));

  const currentTarget =
    chainId != null ? SMART_SESSION_TARGETS[chainId] : undefined;

  async function handleExecute() {
    if (!isConnected || !address) {
      appendLog({
        ts: new Date().toISOString(),
        level: "error",
        message: "Connect a wallet first.",
      });
      return;
    }

    if (!chainId) {
      appendLog({
        ts: new Date().toISOString(),
        level: "error",
        message: "No active chain. Please select Base, Optimism, or Celo.",
      });
      return;
    }

    if (!SMART_SESSION_TARGETS[chainId]) {
      appendLog({
        ts: new Date().toISOString(),
        level: "error",
        message:
          "No contract address configured for this chain. " +
          "Deploy SmartSessionTarget and set the VITE_*_CONTRACT_ADDRESS env.",
      });
      return;
    }

    if (!valueToStore || Number.isNaN(Number(valueToStore))) {
      appendLog({
        ts: new Date().toISOString(),
        level: "error",
        message: "Please enter a valid uint256 value to store.",
      });
      return;
    }

    setIsExecuting(true);
    setLastTx(null);

    try {
      const body = {
        userAddress: address,
        chainId,
        contractAddress: SMART_SESSION_TARGETS[chainId],
        functionName: "store",
        args: [valueToStore],
      };

      appendLog({
        ts: new Date().toISOString(),
        level: "info",
        message: `Sending execute request: ${JSON.stringify(body)}`,
      });

      const { data } = await axios.post(`${backendUrl}/execute`, body);

      if (data?.error) {
        appendLog({
          ts: new Date().toISOString(),
          level: "error",
          message: `Backend error: ${data.error}`,
        });
      } else {
        appendLog({
          ts: new Date().toISOString(),
          level: "info",
          message: `Tx sent on chain ${data.chainId}: ${data.txHash}`,
        });

        setLastTx({ txHash: data.txHash, explorerUrl: data.explorerUrl });
      }
    } catch (err: any) {
      appendLog({
        ts: new Date().toISOString(),
        level: "error",
        message: `Execute failed: ${err?.message ?? String(err)}`,
      });
    } finally {
      setIsExecuting(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      {/* Left: Controls */}
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Session & Network
        </h2>

        <div className="grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Status</p>
            <p className="mt-1 font-medium">
              {isConnected ? "Wallet connected" : "Not connected"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Address:{" "}
              <span className="font-mono">
                {formatAddress(address ?? undefined)}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-xs text-slate-400">Network</p>
            <p className="mt-1 font-medium">{formatChain(chainId)}</p>
            <p className="mt-1 text-xs text-slate-500">
              Supported: Base (8453), Optimism (10), Celo (42220)
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Target contract
          </p>
          <p className="mt-1 font-mono text-xs">
            {currentTarget ?? "No contract configured for this chain"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Deployed <code>SmartSessionTarget</code> per chain and keep the
            addresses in sync between Hardhat and your <code>.env</code>. Each
            write call is sent from a backend sponsor wallet.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Store value (uint256)
              </p>
              <p className="text-xs text-slate-400">
                Calls <code>store(newNumber)</code> on the target.
              </p>
            </div>
          </div>

          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-indigo-500/40 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2"
            value={valueToStore}
            onChange={(e) => setValueToStore(e.target.value)}
            min={0}
          />

          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {isExecuting ? "Executing…" : "Execute Sponsored Call"}
          </button>

          {lastTx && (
            <div className="mt-2 rounded-lg border border-emerald-600/40 bg-emerald-500/10 p-2 text-xs">
              <p className="font-semibold text-emerald-300">
                Last transaction
              </p>
              <p className="mt-1 break-all font-mono text-emerald-100/90">
                {lastTx.txHash}
              </p>
              {lastTx.explorerUrl && (
                <a
                  href={lastTx.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex text-[11px] text-emerald-300 underline"
                >
                  View on explorer
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Right: Logs */}
      <section className="flex min-h-[260px] flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Execution log
          </h2>
          <button
            className="text-xs text-slate-400 hover:text-slate-200"
            onClick={() => setLogs([])}
          >
            Clear
          </button>
        </div>

        <div className="flex-1 overflow-auto rounded-xl border border-slate-900 bg-black/40 p-2 text-xs font-mono text-slate-200">
          {logs.length === 0 ? (
            <p className="text-slate-500">
              No logs yet. Connect a wallet, pick a chain, and send a call.
            </p>
          ) : (
            <ul className="space-y-1">
              {logs.map((log, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-slate-500">
                    {new Date(log.ts).toLocaleTimeString()}
                  </span>
                  <span
                    className={
                      log.level === "error" ? "text-red-400" : "text-emerald-300"
                    }
                  >
                    {log.level.toUpperCase()}
                  </span>
                  <span className="flex-1 text-slate-100">{log.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default SmartSessionPlayground;
