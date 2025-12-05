import React from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StepPermissionsProps {
    value: any[];
    onChange: (value: any[]) => void;
}

export function StepPermissions({ value, onChange }: StepPermissionsProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Define Permissions</h3>
                <p className="text-text-secondary">
                    Specify which functions the session key can call and how much value it can spend.
                </p>
            </div>

            <div className="space-y-4">
                {/* Permission List */}
                {value.length === 0 ? (
                    <Card variant="bordered" className="border-dashed flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-text-secondary mb-4">No permissions added yet.</p>
                        <Button variant="secondary" onClick={() => onChange([...value, { type: 'contract-call', target: 'Any' }])}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Permission
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {value.map((perm, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Contract Call</div>
                                        <div className="text-sm text-text-secondary">Target: Any Contract</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onChange(value.filter((_, i) => i !== index))}
                                    className="text-text-secondary hover:text-danger transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full border border-dashed border-white/20" onClick={() => onChange([...value, { type: 'contract-call', target: 'Any' }])}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Another Permission
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
