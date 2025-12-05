import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StepTarget } from './StepTarget';
import { StepPermissions } from './StepPermissions';
import { StepExpiry } from './StepExpiry';
import { StepReview } from './StepReview';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface CreateSessionWizardProps {
    onCancel: () => void;
    onComplete: () => void;
}

export function CreateSessionWizard({ onCancel, onComplete }: CreateSessionWizardProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        targetAddress: '',
        permissions: [] as any[],
        expiry: '1h'
    });

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else onComplete();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else onCancel();
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Create Smart Session</h2>
                <div className="text-text-secondary">
                    Step {step} of {totalSteps}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            <Card variant="glass" className="min-h-[400px] flex flex-col">
                <div className="flex-1">
                    {step === 1 && (
                        <StepTarget
                            value={formData.targetAddress}
                            onChange={(val: string) => setFormData({ ...formData, targetAddress: val })}
                        />
                    )}
                    {step === 2 && (
                        <StepPermissions
                            value={formData.permissions}
                            onChange={(val: any[]) => setFormData({ ...formData, permissions: val })}
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

                <div className="flex justify-between pt-8 border-t border-white/10 mt-8">
                    <Button variant="ghost" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button onClick={handleNext} variant={step === totalSteps ? 'primary' : 'secondary'}>
                        {step === totalSteps ? 'Sign & Create' : 'Next'}
                        {step !== totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
                        {step === totalSteps && <Check className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
