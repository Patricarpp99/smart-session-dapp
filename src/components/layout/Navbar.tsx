import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from 'wagmi';
import { Button } from '../ui/Button';

interface NavbarProps {
    onMenuClick?: () => void;
    onLogoClick?: () => void;
}

export function Navbar({ onMenuClick, onLogoClick }: NavbarProps) {
    const { open } = useAppKit();
    const { isConnected } = useAccount();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Clickable Logo */}
                    <button
                        onClick={onLogoClick}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Shield className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-text-primary font-display">
                            Smart Session
                        </span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Network Switch Button */}
                    {isConnected && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => open({ view: 'Networks' })}
                            className="hidden sm:flex items-center gap-2"
                        >
                            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                            <span className="text-sm">Network</span>
                        </Button>
                    )}

                    {/* Wallet Connect Button */}
                    <Button
                        onClick={() => open()}
                        variant={isConnected ? 'secondary' : 'primary'}
                        size="sm"
                    >
                        {isConnected ? 'Account' : 'Connect Wallet'}
                    </Button>
                </div>
            </div>
        </header>
    );
}
