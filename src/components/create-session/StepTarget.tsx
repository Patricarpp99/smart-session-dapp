import React from 'react';
import { Search, Globe } from 'lucide-react';

interface StepTargetProps {
    value: string;
    onChange: (value: string) => void;
}

export function StepTarget({ value, onChange }: StepTargetProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Select Target Application</h3>
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
                    className="block w-full rounded-lg border border-white/10 bg-surface py-3 pl-10 pr-4 text-text-primary placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm"
                />
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                    Popular Dapps
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Uniswap', 'Aave', 'Curve', 'OpenSea'].map((dapp) => (
                        <button
                            key={dapp}
                            onClick={() => { }} // Placeholder
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-left"
                        >
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Globe className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{dapp}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
