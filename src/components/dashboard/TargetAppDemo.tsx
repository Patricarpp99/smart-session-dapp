import React, { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RefreshCw, Database, ArrowRight, Activity } from 'lucide-react';
import { SMART_SESSION_ABI, CONTRACT_ADDRESSES } from '../../lib/contracts';

// Hardcoded for demo purposes, ideally should come from chainId context
const CONTRACT_ADDRESS = CONTRACT_ADDRESSES.base;

export function TargetAppDemo() {
    const [newValue, setNewValue] = useState('');
    const [events, setEvents] = useState<{ val: string; executor: string; hash: string }[]>([]);

    // 1. READ: Get current number
    const { data: currentNumber, refetch, isFetching } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: SMART_SESSION_ABI,
        functionName: 'get',
    });

    // 2. WRITE: Store new number
    const { writeContract, data: hash, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    // 3. EVENT: Listen for updates
    useWatchContractEvent({
        address: CONTRACT_ADDRESS,
        abi: SMART_SESSION_ABI,
        eventName: 'NumberUpdated',
        onLogs(logs) {
            logs.forEach((log) => {
                // @ts-ignore - simple demo typing
                const { newValue, executor } = log.args;
                setEvents((prev) => [
                    {
                        val: newValue.toString(),
                        executor,
                        hash: log.transactionHash
                    },
                    ...prev
                ].slice(0, 5)); // Keep last 5
                refetch(); // Refresh value on event
            });
        },
    });

    const handleUpdate = () => {
        if (!newValue) return;
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: SMART_SESSION_ABI,
            functionName: 'store',
            args: [BigInt(newValue)],
        });
    };

    return (
        <Card variant="glass" className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                        <Database className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Target App State</h3>
                        <p className="text-sm text-text-secondary">Interact with the demo contract</p>
                    </div>
                </div>
                <Badge variant="outline" className="font-mono">
                    {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* READ SECTION */}
                <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-text-secondary text-sm uppercase tracking-wider font-medium">Current Value</span>
                        <button onClick={() => refetch()} className="text-primary hover:text-primary/80 transition-colors">
                            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                    <div className="text-4xl font-mono font-bold text-primary">
                        {currentNumber?.toString() || '0'}
                    </div>
                </div>

                {/* WRITE SECTION */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder="Enter new value"
                            className="flex-1 bg-surface border border-white/10 rounded-lg px-4 py-2 text-text-primary focus:border-primary focus:outline-none"
                        />
                        <Button
                            onClick={handleUpdate}
                            disabled={isPending || isConfirming || !newValue}
                            isLoading={isPending || isConfirming}
                        >
                            Update
                        </Button>
                    </div>
                    {isSuccess && (
                        <div className="text-xs text-success flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            Transaction confirmed!
                        </div>
                    )}
                </div>
            </div>

            {/* EVENTS FEED */}
            {events.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-text-secondary">Recent Updates</h4>
                    <div className="space-y-2">
                        {events.map((event, i) => (
                            <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-primary">{event.val}</span>
                                    <span className="text-text-secondary">by</span>
                                    <span className="font-mono text-text-muted">{event.executor.slice(0, 6)}...</span>
                                </div>
                                <a
                                    href={`https://basescan.org/tx/${event.hash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-text-secondary hover:text-primary flex items-center gap-1"
                                >
                                    View <ArrowRight className="h-3 w-3" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
