import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { AppKitButton } from "@reown/appkit/react";
import { Button } from '../ui/Button';

interface NavbarProps {
    onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden text-text-secondary hover:text-text-primary"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Shield className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-text-primary">
                            Smart Session
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <AppKitButton />
                </div>
            </div>
        </header>
    );
}
