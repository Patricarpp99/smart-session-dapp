import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StepTarget } from './StepTarget';
import { StepPermissions } from './StepPermissions';
import { StepExpiry } from './StepExpiry';
import { StepReview } from './StepReview';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

interface CreateSessionWizardProps {
    onCancel: () => void;
    onComplete: (data: SessionFormData) => void;
}

export interface SessionFormData {
    targetAddress: string;
    targetName: string;
    permissions: string[];
    expiry: string;
}

export function CreateSessionWizard({ onCancel, onComplete }: CreateSessionWizardProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<SessionFormData>({
        targetAddress: '',
        targetName: '',
        permissions: [],
        expiry: '1h'
    });

    const totalSteps = 4;

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.targetAddress.match(/^0x[a-fA-F0-9]{40}$/);
            case 2:
                return formData.permissions.length > 0;
            case 3:
                return formData.expiry;
            case 4:
                return true;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else onComplete(formData);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else onCancel();
    };

    const handleSelectDapp = (name: string, address: string) => {
        setFormData({ ...formData, targetAddress: address, targetName: name });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-display">Create Smart Session</h2>
                    <p className="text-text-secondary text-sm mt-1">
                        Grant temporary permissions to a Dapp
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-text-secondary text-sm">
                        Step {step} of {totalSteps}
                    </div>
                    <Button variant="ghost" size="sm" onClick={onCancel}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between text-xs">
                {['Target', 'Permissions', 'Expiry', 'Review'].map((label, i) => (
                    <div
                        key={label}
                        className={`flex items-center gap-2 ${i + 1 <= step ? 'text-primary' : 'text-text-muted'
                            }`}
                    >
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 < step
                                ? 'bg-primary text-background'
                                : i + 1 === step
                                    ? 'bg-primary/20 border border-primary text-primary'
                                    : 'bg-white/10 text-text-muted'
                            }`}>
                            {i + 1 < step ? <Check className="h-3 w-3" /> : i + 1}
                        </div>
                        <span className="hidden sm:inline">{label}</span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <Card variant="glass" className="min-h-[400px] flex flex-col">
                <div className="flex-1">
                    {step === 1 && (
                        <StepTarget
                            value={formData.targetAddress}
                            onChange={(val: string) => setFormData({ ...formData, targetAddress: val })}
                            onSelectDapp={handleSelectDapp}
                        />
                    )}
                    {step === 2 && (
                        <StepPermissions
                            value={formData.permissions}
                            onChange={(val: string[]) => setFormData({ ...formData, permissions: val })}
                            targetName={formData.targetName}
                        />
                    )}
                    {step === 3 && (
                        <StepExpiry
                            value={formData.expiry}
                            onChange={(val: string) => setFormData({ ...formData, expiry: val })}
                        />
                    )}
                    {step === 4 && (
                        <StepReview data={formData} />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-8 border-t border-white/10 mt-8">
                    <Button variant="ghost" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {step === 1 ? 'Cancel' : 'Back'}
                    </Button>
                    <Button
                        onClick={handleNext}
                        variant={step === totalSteps ? 'primary' : 'secondary'}
                        disabled={!isStepValid()}
                    >
                        {step === totalSteps ? 'Sign & Create' : 'Next'}
                        {step !== totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
                        {step === totalSteps && <Check className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
