import React from 'react';
import { Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface StepExpiryProps {
    value: string;
    onChange: (value: string) => void;
}

const options = [
    { label: '1 Hour', value: '1h' },
    { label: '1 Day', value: '1d' },
    { label: '1 Week', value: '1w' },
    { label: '1 Month', value: '1m' },
];

export function StepExpiry({ value, onChange }: StepExpiryProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Set Session Expiry</h3>
                <p className="text-text-secondary">
                    Choose how long this session should remain active. It will automatically revoke after this time.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={clsx(
                            "flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200",
                            value === option.value
                                ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                                : "bg-surface border-white/10 text-text-secondary hover:bg-white/5 hover:border-white/20"
                        )}
                    >
                        <Clock className={clsx("h-8 w-8 mb-3", value === option.value ? "text-primary" : "text-text-secondary")} />
                        <span className="font-medium text-lg">{option.label}</span>
                    </button>
                ))}
            </div>

            <div className="pt-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                    Or enter custom duration (seconds)
                </label>
                <input
                    type="number"
                    placeholder="3600"
                    className="block w-full rounded-lg border border-white/10 bg-surface py-3 px-4 text-text-primary placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm"
                />
            </div>
        </div>
    );
}
