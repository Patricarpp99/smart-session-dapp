import React from 'react';
import { Search, ExternalLink } from 'lucide-react';

interface StepTargetProps {
    value: string;
    onChange: (value: string) => void;
    onSelectDapp?: (name: string, address: string) => void;
}

// Popular dapps with their contract addresses on Base
const POPULAR_DAPPS = [
    {
        name: 'Uniswap V3',
        address: '0x2626664c2603336E57B271c5C0b26F421741e481',
        icon: '🦄',
        color: 'from-pink-500/20 to-purple-500/20',
        description: 'Swap Router'
    },
    {
        name: 'Aave V3',
        address: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
        icon: '👻',
        color: 'from-purple-500/20 to-blue-500/20',
        description: 'Lending Pool'
    },
    {
        name: 'Aerodrome',
        address: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
        icon: '✈️',
        color: 'from-blue-500/20 to-cyan-500/20',
        description: 'DEX Router'
    },
    {
        name: 'BaseSwap',
        address: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
        icon: '🔵',
        color: 'from-blue-600/20 to-indigo-500/20',
        description: 'DEX Router'
    }
];

export function StepTarget({ value, onChange, onSelectDapp }: StepTargetProps) {
    const handleSelectDapp = (dapp: typeof POPULAR_DAPPS[0]) => {
        onChange(dapp.address);
        onSelectDapp?.(dapp.name, dapp.address);
    };

    const isValidAddress = value.match(/^0x[a-fA-F0-9]{40}$/);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold font-display">Select Target Application</h3>
                <p className="text-text-secondary">
                    Enter the contract address of the Dapp you want to create a session for.
                </p>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0x..."
                    className={`block w-full rounded-lg border bg-surface py-3 pl-10 pr-4 text-text-primary placeholder-text-muted font-mono text-sm focus:ring-1 transition-colors ${value && !isValidAddress
                            ? 'border-danger focus:border-danger focus:ring-danger'
                            : value && isValidAddress
                                ? 'border-success focus:border-success focus:ring-success'
                                : 'border-white/10 focus:border-primary focus:ring-primary'
                        }`}
                />
                {value && isValidAddress && (
                    <a
                        href={`https://basescan.org/address/${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-primary transition-colors"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                )}
            </div>
            {value && !isValidAddress && (
                <p className="text-sm text-danger">Please enter a valid Ethereum address (0x...42 characters)</p>
            )}

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                    Popular Dapps on Base
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {POPULAR_DAPPS.map((dapp) => (
                        <button
                            key={dapp.name}
                            onClick={() => handleSelectDapp(dapp)}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left group ${value === dapp.address
                                    ? 'border-primary bg-primary/10 shadow-glow-sm'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${dapp.color} flex items-center justify-center text-xl shrink-0`}>
                                {dapp.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-text-primary">{dapp.name}</div>
                                <div className="text-xs text-text-muted truncate font-mono">
                                    {dapp.description}
                                </div>
                            </div>
                            {value === dapp.address && (
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Contract Option */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-text-muted">
                    Don't see your Dapp? Paste any contract address above to create a custom session.
                </p>
            </div>
        </div>
    );
}
