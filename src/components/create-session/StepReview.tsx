import React from 'react';
import { Card } from '../ui/Card';
import { Shield, Clock, Globe, AlertTriangle } from 'lucide-react';

interface StepReviewProps {
    data: {
        targetAddress: string;
        permissions: any[];
        expiry: string;
    };
}

export function StepReview({ data }: StepReviewProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Review & Sign</h3>
                <p className="text-text-secondary">
                    Verify the details below before creating the session. You will need to sign a transaction.
                </p>
            </div>

            <div className="space-y-4">
                <Card variant="glass" className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Globe className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wider">Target Application</h4>
                            <div className="text-lg font-mono mt-1 break-all">{data.targetAddress || 'Not specified'}</div>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning shrink-0">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wider">Expiry Duration</h4>
                            <div className="text-lg mt-1">{data.expiry}</div>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success shrink-0">
                            <Shield className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-text-secondary text-sm uppercase tracking-wider">Permissions</h4>
                            <div className="mt-2 space-y-2">
                                {data.permissions.length > 0 ? (
                                    data.permissions.map((p, i) => (
                                        <div key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                                            Contract Call: Any
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-text-muted italic">No specific permissions (Full Access)</div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/5 border border-warning/10 text-warning">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <p className="text-sm">
                        This session key will have access to perform actions on your behalf within the specified limits.
                        You can revoke it at any time from the dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
