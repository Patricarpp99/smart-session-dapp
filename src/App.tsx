import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./components/LandingPage";
import { CreateSessionWizard } from "./components/create-session/CreateSessionWizard";
import { SessionList, Session } from "./components/dashboard/SessionList";
import { TargetAppDemo } from "./components/dashboard/TargetAppDemo";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Badge } from "./components/ui/Badge";
import { Shield, Plus, Clock, AlertTriangle } from "lucide-react";

// Mock Data
const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    targetAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    targetName: 'Uniswap V2 Router',
    permissions: ['swapExactTokensForTokens'],
    expiry: '55m',
    status: 'active',
    createdAt: '2023-10-27T10:00:00Z'
  },
  {
    id: '2',
    targetAddress: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    targetName: 'Uniswap V3 Router',
    permissions: ['exactInputSingle'],
    expiry: '23h',
    status: 'active',
    createdAt: '2023-10-26T15:30:00Z'
  }
];

function App() {
  const { isConnected } = useAccount();
  const [view, setView] = useState<'dashboard' | 'create'>('dashboard');
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);

  const handleRevoke = (id: string) => {
    // In a real app, this would call a contract function
    setSessions(sessions.filter(s => s.id !== id));
  };

  const handleCreateComplete = () => {
    // Mock adding a new session
    const newSession: Session = {
      id: Math.random().toString(),
      targetAddress: '0x...',
      targetName: 'New Session',
      permissions: ['Any'],
      expiry: '1h',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setSessions([newSession, ...sessions]);
    setView('dashboard');
  };

  if (!isConnected) {
    return (
      <Layout>
        <LandingPage />
      </Layout>
    );
  }

  if (view === 'create') {
    return (
      <Layout>
        <CreateSessionWizard
          onCancel={() => setView('dashboard')}
          onComplete={handleCreateComplete}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary mt-1">Manage your active smart sessions and permissions.</p>
          </div>
          <Button onClick={() => setView('create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>

        {/* Demo Contract Interaction */}
        <TargetAppDemo />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="glass" className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Active Sessions</span>
            </div>
            <div className="text-2xl font-bold">{sessions.length}</div>
          </Card>
          <Card variant="glass" className="space-y-2">
            <div className="flex items-center gap-2 text-warning">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Expiring Soon</span>
            </div>
            <div className="text-2xl font-bold">{sessions.filter(s => s.expiry.includes('m')).length}</div>
          </Card>
          <Card variant="glass" className="space-y-2">
            <div className="flex items-center gap-2 text-text-secondary">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Total Created</span>
            </div>
            <div className="text-2xl font-bold">{sessions.length + 5}</div>
          </Card>
        </div>

        {/* Active Sessions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Active Sessions</h2>
          <SessionList sessions={sessions} onRevoke={handleRevoke} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
