import React from 'react';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

export const Header: React.FC = () => {
  const { address, isConnected, chain } = useAccount();
  const { open } = useAppKit();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Smart Session Factory <span className="text-baseBlue">Base</span>
        </h1>
        <p className="text-xs text-slate-400">
          Reown AppKit + Smart Sessions • Base Sepolia
        </p>
      </div>
      <div className="flex items-center gap-3">
        {isConnected && (
          <div className="text-right text-xs mr-4">
            <div className="font-mono text-slate-200">
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </div>
            <div className="text-slate-500">
              {chain?.name ?? 'Unknown network'}
            </div>
          </div>
        )}
        <button
          onClick={() => open()}
          className="px-4 py-2 rounded-full bg-baseBlue text-xs font-semibold hover:bg-blue-500 transition"
        >
          {isConnected ? 'Change Wallet / Session' : 'Connect / Login'}
        </button>
      </div>
    </header>
  );
};