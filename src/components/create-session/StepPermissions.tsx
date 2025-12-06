import React from 'react';
import { Check, Plus, Trash2, Shield, Zap, DollarSign, Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StepPermissionsProps {
    value: string[];
    onChange: (value: string[]) => void;
    targetName?: string;
}

// Predefined permission templates based on common dapp functions
const PERMISSION_TEMPLATES = [
    {
        id: 'swap',
        name: 'Token Swaps',
        description: 'Allow swapping tokens',
        icon: Zap,
        functions: ['swap', 'swapExactTokensForTokens', 'exactInputSingle']
    },
    {
        id: 'approve',
        name: 'Token Approvals',
        description: 'Allow approving token spending',
        icon: Check,
        functions: ['approve', 'increaseAllowance']
    },
    {
        id: 'transfer',
        name: 'Token Transfers',
        description: 'Allow transferring tokens',
        icon: DollarSign,
        functions: ['transfer', 'transferFrom']
    },
    {
        id: 'lend',
        name: 'Lending Operations',
        description: 'Allow supply, borrow, repay',
        icon: Shield,
        functions: ['supply', 'borrow', 'repay', 'withdraw']
    }
];

export function StepPermissions({ value, onChange, targetName }: StepPermissionsProps) {
    const togglePermission = (permId: string) => {
        if (value.includes(permId)) {
            onChange(value.filter(p => p !== permId));
        } else {
            onChange([...value, permId]);
        }
    };

    const selectAll = () => {
        onChange(PERMISSION_TEMPLATES.map(p => p.id));
    };

    const clearAll = () => {
        onChange([]);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold font-display">Define Permissions</h3>
                <p className="text-text-secondary">
                    Choose which actions {targetName || 'the Dapp'} can perform on your behalf.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={selectAll}>
                    Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>
                    Clear All
                </Button>
            </div>

            {/* Permission Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERMISSION_TEMPLATES.map((perm) => {
                    const isSelected = value.includes(perm.id);
                    const Icon = perm.icon;

                    return (
                        <button
                            key={perm.id}
                            onClick={() => togglePermission(perm.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${isSelected
                                    ? 'border-success bg-success/10'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-success/20 text-success' : 'bg-white/10 text-text-muted'
                                }`}>
                                {isSelected ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`font-semibold ${isSelected ? 'text-success' : 'text-text-primary'}`}>
                                    {perm.name}
                                </div>
                                <div className="text-xs text-text-muted mt-1">
                                    {perm.description}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {perm.functions.slice(0, 2).map(fn => (
                                        <span key={fn} className="text-xs px-2 py-0.5 rounded bg-white/10 text-text-muted font-mono">
                                            {fn}
                                        </span>
                                    ))}
                                    {perm.functions.length > 2 && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-text-muted">
                                            +{perm.functions.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected Count */}
            <div className="text-sm text-text-secondary">
                {value.length === 0 ? (
                    <span className="text-warning">⚠️ Select at least one permission to continue</span>
                ) : (
                    <span className="text-success">✓ {value.length} permission{value.length > 1 ? 's' : ''} selected</span>
                )}
            </div>
        </div>
    );
}
