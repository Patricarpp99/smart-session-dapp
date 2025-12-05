import React from 'react';
import { LayoutDashboard, Shield, History, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const navigation = [
    { name: 'Dashboard', href: '#', icon: LayoutDashboard, current: true },
    { name: 'Create Session', href: '#', icon: Shield, current: false },
    { name: 'Activity', href: '#', icon: History, current: false },
    { name: 'Settings', href: '#', icon: Settings, current: false },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-surface transition-transform duration-200 lg:static lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center px-6 border-b border-white/10 lg:hidden">
                    <span className="text-lg font-bold">Menu</span>
                </div>

                <nav className="flex flex-col gap-1 p-4">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                item.current
                                    ? "bg-primary/10 text-primary"
                                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </a>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Disconnect
                    </button>
                </div>
            </aside>
        </>
    );
}
