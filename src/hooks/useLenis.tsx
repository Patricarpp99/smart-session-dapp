import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface UseLenisOptions {
    /** Scroll duration multiplier (default: 1.2) */
    duration?: number;
    /** Easing function (default: easeOutExpo) */
    easing?: (t: number) => number;
    /** Enable smooth scroll (default: true) */
    smoothWheel?: boolean;
    /** Wheel multiplier (default: 1) */
    wheelMultiplier?: number;
    /** Touch multiplier (default: 2) */
    touchMultiplier?: number;
    /** Enable infinite scroll (default: false) */
    infinite?: boolean;
    /** Gesture orientation (default: vertical) */
    orientation?: 'vertical' | 'horizontal';
    /** Gesture direction (default: 1) */
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    /** Smooth touch (default: false for better touchpad support) */
    smoothTouch?: boolean;
    /** Sync touch lerp (default: 0.1) */
    syncTouch?: boolean;
    /** Sync touch lerp value */
    syncTouchLerp?: number;
}

// Premium easing function - easeOutExpo
const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function useLenis(options: UseLenisOptions = {}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: options.duration ?? 1.2,
            easing: options.easing ?? easeOutExpo,
            orientation: options.orientation ?? 'vertical',
            gestureOrientation: options.gestureOrientation ?? 'vertical',
            smoothWheel: options.smoothWheel ?? true,
            smoothTouch: options.smoothTouch ?? false,
            syncTouch: options.syncTouch ?? true,
            syncTouchLerp: options.syncTouchLerp ?? 0.075,
            wheelMultiplier: options.wheelMultiplier ?? 1,
            touchMultiplier: options.touchMultiplier ?? 2,
            infinite: options.infinite ?? false,
        });

        lenisRef.current = lenis;

        // RAF loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [
        options.duration,
        options.easing,
        options.smoothWheel,
        options.wheelMultiplier,
        options.touchMultiplier,
        options.infinite,
        options.orientation,
        options.gestureOrientation,
        options.smoothTouch,
        options.syncTouch,
        options.syncTouchLerp
    ]);

    return lenisRef;
}

// Provider component for app-wide Lenis
export function LenisProvider({ children }: { children: React.ReactNode }) {
    useLenis({
        duration: 1.0,
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: true,
        syncTouchLerp: 0.075,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
    });

    return <>{children}</>;
}
