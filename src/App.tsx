import React, { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./components/LandingPage";
import { CreateSessionWizard } from "./components/create-session/CreateSessionWizard";
import { SessionList, Session } from "./components/dashboard/SessionList";
import { ActivityPage } from "./components/ActivityPage";
import { SettingsPage } from "./components/SettingsPage";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { ToastProvider, useToast } from "./components/ui/Toast";
import { useSessionContract } from "./hooks/useSessionContract";
import { Shield, Plus, Clock, Activity, TrendingUp, ExternalLink } from "lucide-react";

// Start with empty sessions - will be populated from onchain
const createMockSessions = (): Session[] => [];

type View = 'dashboard' | 'create' | 'activity' | 'settings';

function AppContent() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { success, error, info } = useToast();
  const [view, setView] = useState<View>('dashboard');
  const [sessions, setSessions] = useState<Session[]>(createMockSessions);

  const {
    createSession: createSessionOnchain,
    revokeSession: revokeSessionOnchain,
    isCreating,
    isRevoking,
    isConfirming,
    chainMetadata
  } = useSessionContract();

  const handleRevoke = async (id: string) => {
    try {
      info('Please confirm the transaction in your wallet...');
      const result = await revokeSessionOnchain(id);
      setSessions(sessions.filter(s => s.id !== id));
      success(
        <div className="flex items-center gap-2">
          <span>Session revoked!</span>
          <a
            href={result.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            View tx <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      );
    } catch (err: any) {
      if (err?.message?.includes('User rejected')) {
        error('Transaction cancelled');
      } else {
        error('Failed to revoke session: ' + (err?.message || 'Unknown error'));
      }
    }
  };

  const handleRefresh = async (id: string) => {
    try {
      // Extend by 1 hour
      setSessions(sessions.map(s =>
        s.id === id
          ? { ...s, expiry: new Date(new Date(s.expiry).getTime() + 60 * 60 * 1000).toISOString() }
          : s
      ));
      success('Session extended by 1 hour');
    } catch (err) {
      error('Failed to extend session');
    }
  };

  const handleCreateComplete = async (formData: { targetAddress: string; targetName: string; permissions: string[]; expiry: string }) => {
    const getExpiryMs = (expiry: string): number => {
      switch (expiry) {
        case '1h': return 60 * 60 * 1000;
        case '1d': return 24 * 60 * 60 * 1000;
        case '1w': return 7 * 24 * 60 * 60 * 1000;
        case '1m': return 30 * 24 * 60 * 60 * 1000;
        default: return 60 * 60 * 1000;
      }
    };

    try {
      info('Please confirm the transaction in your wallet...');
      const result = await createSessionOnchain({
        targetAddress: formData.targetAddress,
        targetName: formData.targetName,
        permissions: formData.permissions,
        expiry: formData.expiry,
      });

      const newSession: Session = {
        id: `session-${Date.now()}`,
        targetAddress: formData.targetAddress,
        targetName: formData.targetName || 'Custom Session',
        permissions: formData.permissions,
        expiry: new Date(Date.now() + getExpiryMs(formData.expiry)).toISOString(),
        status: 'active',
        createdAt: new Date().toISOString(),
        chainId: chainId,
        txHash: result.hash,
      };
      setSessions([newSession, ...sessions]);
      setView('dashboard');
      success(
        <div className="flex items-center gap-2">
          <span>Session created! 🎉</span>
          <a
            href={result.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            View tx <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      );
    } catch (err: any) {
      if (err?.message?.includes('User rejected')) {
        error('Transaction cancelled');
      } else {
        error('Failed to create session: ' + (err?.message || 'Unknown error'));
      }
      // Stay on create view if failed
    }
  };

  const handleNavigate = (newView: View) => {
    setView(newView);
  };

  if (!isConnected) {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <LandingPage />
      </Layout>
    );
  }

  if (view === 'create') {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <CreateSessionWizard
          onCancel={() => setView('dashboard')}
          onComplete={handleCreateComplete}
        />
      </Layout>
    );
  }

  if (view === 'activity') {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <ActivityPage />
      </Layout>
    );
  }

  if (view === 'settings') {
    return (
      <Layout onNavigate={handleNavigate} currentView={view}>
        <SettingsPage />
      </Layout>
    );
  }

  // Stats calculation
  const activeSessions = sessions.filter(s => s.status === 'active').length;
  const expiringSoon = sessions.filter(s => {
    const expiry = new Date(s.expiry).getTime();
    return expiry - Date.now() < 60 * 60 * 1000 && expiry > Date.now();
  }).length;

  return (
    <Layout onNavigate={handleNavigate} currentView={view}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary font-display">Dashboard</h1>
            <p className="text-text-secondary mt-1">Manage your active smart sessions and permissions.</p>
          </div>
          <Button onClick={() => setView('create')} className="animate-glow">
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-medium text-sm">Active Sessions</span>
            </div>
            <div className="text-3xl font-bold">{activeSessions}</div>
          </Card>

          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-warning">
              <Clock className="h-5 w-5" />
              <span className="font-medium text-sm">Expiring Soon</span>
            </div>
            <div className="text-3xl font-bold">{expiringSoon}</div>
          </Card>

          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-success">
              <Activity className="h-5 w-5" />
              <span className="font-medium text-sm">Executions Today</span>
            </div>
            <div className="text-3xl font-bold">12</div>
          </Card>

          <Card variant="glass" className="space-y-2 glass-card-hover">
            <div className="flex items-center gap-2 text-secondary">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium text-sm">Total Created</span>
            </div>
            <div className="text-3xl font-bold">{sessions.length + 5}</div>
          </Card>
        </div>

        {/* Active Sessions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Active Sessions</h2>
            {sessions.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setView('activity')}>
                View Activity
              </Button>
            )}
          </div>
          <SessionList
            sessions={sessions}
            onRevoke={handleRevoke}
            onRefresh={handleRefresh}
            isRevoking={isRevoking}
          />
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
