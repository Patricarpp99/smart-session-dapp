import React from 'react';
import { Shield, Zap, Lock, Clock } from 'lucide-react';
import { AppKitButton } from "@reown/appkit/react";
import { Card } from './ui/Card';

export function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
            <div className="space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                    <Zap className="h-4 w-4" />
                    <span>Next Gen Web3 UX</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary pb-2">
                    Smart Sessions
                </h1>

                <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                    Secure, temporary, and granular permissions for your Dapps.
                    Stop signing every transaction. Start using Smart Sessions.
                </p>

                <div className="pt-4 flex justify-center">
                    <AppKitButton />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                <Card variant="glass" className="text-left space-y-4 hover:bg-white/5 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Granular Control</h3>
                    <p className="text-text-secondary">
                        Define exactly what an app can do. Limit by contract, function, and value.
                    </p>
                </Card>

                <Card variant="glass" className="text-left space-y-4 hover:bg-white/5 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
                        <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Auto-Expiry</h3>
                    <p className="text-text-secondary">
                        Sessions expire automatically. Set it for 1 hour, 1 day, or 1 week.
                    </p>
                </Card>

                <Card variant="glass" className="text-left space-y-4 hover:bg-white/5 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center text-success">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Instant Revocation</h3>
                    <p className="text-text-secondary">
                        Kill any session instantly from your dashboard. You are always in control.
                    </p>
                </Card>
            </div>
        </div>
    );
}
