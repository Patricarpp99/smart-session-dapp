import React from 'react';
import { Shield, Clock, Globe, Trash2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface Session {
    id: string;
    targetAddress: string;
    targetName?: string;
    permissions: string[];
    expiry: string;
    status: 'active' | 'expired' | 'revoked';
    createdAt: string;
}

interface SessionListProps {
    sessions: Session[];
    onRevoke: (id: string) => void;
}

export function SessionList({ sessions, onRevoke }: SessionListProps) {
    if (sessions.length === 0) {
        return (
            <Card variant="bordered" className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-white/5 p-4 mb-4">
                    <Shield className="h-8 w-8 text-text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-text-primary">No active sessions</h3>
                <p className="text-text-secondary max-w-sm mt-2 mb-6">
                    You haven't created any smart sessions yet. Create one to securely grant temporary permissions.
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {sessions.map((session) => (
                <Card key={session.id} variant="glass" className="group transition-all duration-200 hover:bg-white/5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left: Info */}
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Globe className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-lg">{session.targetName || 'Unknown Dapp'}</h4>
                                    <Badge variant={session.status === 'active' ? 'success' : 'default'}>
                                        {session.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary mt-1 font-mono">
                                    {session.targetAddress}
                                    <ExternalLink className="h-3 w-3 opacity-50 hover:opacity-100 cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Middle: Details */}
                        <div className="flex flex-col sm:items-end gap-1 text-sm text-text-secondary">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>Expires in {session.expiry}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>{session.permissions.length} Permissions</span>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 pt-4 sm:pt-0 border-t border-white/10 sm:border-0">
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onRevoke(session.id)}
                                className="w-full sm:w-auto"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Revoke
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
