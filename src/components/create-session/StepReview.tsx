import React from 'react';
import { Card } from '../ui/Card';
import { Shield, Clock, Globe, AlertTriangle, ExternalLink, Check } from 'lucide-react';
import { SessionFormData } from './CreateSessionWizard';

interface StepReviewProps {
    data: SessionFormData;
}

const EXPIRY_LABELS: Record<string, string> = {
    '1h': '1 Hour',
    '1d': '1 Day (24 Hours)',
    '1w': '1 Week (7 Days)',
    '1m': '1 Month (30 Days)'
};

const PERMISSION_LABELS: Record<string, string> = {
    'swap': 'Token Swaps',
    'approve': 'Token Approvals',
    'transfer': 'Token Transfers',
    'lend': 'Lending Operations'
};

export function StepReview({ data }: StepReviewProps) {
    const displayName = data.targetName || 'Custom Contract';
    const expiryLabel = EXPIRY_LABELS[data.expiry] || data.expiry;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold font-display">Review & Sign</h3>
                <p className="text-text-secondary">
                    Verify the session details before signing. This action requires a wallet signature.
                </p>
            </div>

            <div className="space-y-4">
                <Card variant="glass" className="space-y-4">
                    {/* Target Application */}
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Globe className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wider">Target Application</h4>
                            <div className="text-lg font-semibold mt-1">{displayName}</div>
                            <a
                                href={`https://basescan.org/address/${data.targetAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-text-muted font-mono mt-1 hover:text-primary transition-colors"
                            >
                                {data.targetAddress.slice(0, 10)}...{data.targetAddress.slice(-8)}
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Expiry Duration */}
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning shrink-0">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wider">Session Duration</h4>
                            <div className="text-lg font-semibold mt-1">{expiryLabel}</div>
                            <div className="text-sm text-text-muted mt-1">
                                Auto-expires on {new Date(Date.now() + getExpiryMs(data.expiry)).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Permissions */}
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success shrink-0">
                            <Shield className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wider">Permissions ({data.permissions.length})</h4>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {data.permissions.length > 0 ? (
                                    data.permissions.map((perm) => (
                                        <div
                                            key={perm}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20 text-sm text-success"
                                        >
                                            <Check className="h-3 w-3" />
                                            {PERMISSION_LABELS[perm] || perm}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-text-muted italic">No specific permissions</div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Warning */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-warning font-medium">Security Notice</p>
                        <p className="text-sm text-text-secondary mt-1">
                            This session will allow <strong>{displayName}</strong> to perform selected actions on your behalf.
                            You can revoke this session at any time from your dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getExpiryMs(expiry: string): number {
    switch (expiry) {
        case '1h': return 60 * 60 * 1000;
        case '1d': return 24 * 60 * 60 * 1000;
        case '1w': return 7 * 24 * 60 * 60 * 1000;
        case '1m': return 30 * 24 * 60 * 60 * 1000;
        default: return parseInt(expiry) * 1000 || 60 * 60 * 1000;
    }
}
