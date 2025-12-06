import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useChainId } from 'wagmi';

// Network color themes with full color schemes
export const NETWORK_THEMES = {
    // Base - Blue gradient
    8453: {
        name: 'Base',
        primary: '#0052FF',
        secondary: '#00A3FF',
        tertiary: '#0066CC',
        accent: '#00F0FF',
        gradientFrom: 'rgba(0, 82, 255, 0.4)',
        gradientTo: 'rgba(0, 163, 255, 0.3)',
        bgColor: '#050A14',
    },
    // Optimism - Red gradient  
    10: {
        name: 'Optimism',
        primary: '#FF0420',
        secondary: '#FF4D4D',
        tertiary: '#CC0000',
        accent: '#FF6B6B',
        gradientFrom: 'rgba(255, 4, 32, 0.4)',
        gradientTo: 'rgba(255, 77, 77, 0.3)',
        bgColor: '#140505',
    },
    // Celo - Yellow/Green gradient
    42220: {
        name: 'Celo',
        primary: '#35D07F',
        secondary: '#FCFF52',
        tertiary: '#FBCC5C',
        accent: '#73E17D',
        gradientFrom: 'rgba(53, 208, 127, 0.4)',
        gradientTo: 'rgba(252, 255, 82, 0.3)',
        bgColor: '#0A1408',
    },
    // Default - Cyan (not connected)
    default: {
        name: 'Default',
        primary: '#00F0FF',
        secondary: '#7000FF',
        tertiary: '#00A3FF',
        accent: '#00F0FF',
        gradientFrom: 'rgba(0, 240, 255, 0.3)',
        gradientTo: 'rgba(112, 0, 255, 0.2)',
        bgColor: '#0B0C15',
    },
};

interface AuroraBackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
    const { isConnected } = useAccount();
    const chainId = useChainId();

    const theme = useMemo(() => {
        if (!isConnected) return NETWORK_THEMES.default;
        return NETWORK_THEMES[chainId as keyof typeof NETWORK_THEMES] || NETWORK_THEMES.default;
    }, [isConnected, chainId]);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ backgroundColor: theme.bgColor }}
        >
            {/* Aurora gradient blobs - more visible with stronger opacity */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Primary blob - largest, moves slowly */}
                <motion.div
                    className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vh] rounded-full opacity-70"
                    style={{
                        background: `radial-gradient(circle at center, ${theme.gradientFrom}, transparent 60%)`,
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        x: ['0%', '20%', '5%', '15%', '0%'],
                        y: ['0%', '15%', '25%', '10%', '0%'],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Secondary blob - top right */}
                <motion.div
                    className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vh] rounded-full opacity-60"
                    style={{
                        background: `radial-gradient(circle at center, ${theme.gradientTo}, transparent 60%)`,
                        filter: 'blur(80px)',
                    }}
                    animate={{
                        x: ['0%', '-25%', '5%', '-15%', '0%'],
                        y: ['0%', '20%', '-10%', '15%', '0%'],
                        scale: [1, 0.9, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                />

                {/* Tertiary blob - bottom center */}
                <motion.div
                    className="absolute -bottom-1/4 left-1/4 w-[60vw] h-[60vh] rounded-full opacity-50"
                    style={{
                        background: `radial-gradient(circle at center, ${theme.gradientFrom}, transparent 50%)`,
                        filter: 'blur(100px)',
                    }}
                    animate={{
                        x: ['0%', '15%', '-20%', '10%', '0%'],
                        y: ['0%', '-20%', '5%', '-10%', '0%'],
                        scale: [1, 1.05, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 5,
                    }}
                />

                {/* Small accent blob */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[40vw] h-[40vh] rounded-full opacity-40"
                    style={{
                        background: `radial-gradient(circle at center, ${theme.accent}50, transparent 60%)`,
                        filter: 'blur(50px)',
                        transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                        x: ['-50%', '-40%', '-60%', '-45%', '-50%'],
                        y: ['-50%', '-40%', '-55%', '-45%', '-50%'],
                        scale: [1, 1.2, 0.8, 1.1, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 3,
                    }}
                />
            </div>

            {/* Content */}
            {children}
        </div>
    );
}

// Hook for accessing current network theme
export function useNetworkTheme() {
    const { isConnected } = useAccount();
    const chainId = useChainId();

    return useMemo(() => {
        if (!isConnected) return NETWORK_THEMES.default;
        return NETWORK_THEMES[chainId as keyof typeof NETWORK_THEMES] || NETWORK_THEMES.default;
    }, [isConnected, chainId]);
}
