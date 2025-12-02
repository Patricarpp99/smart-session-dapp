import React from 'react';

export type LogEntry = {
  id: number;
  level: 'info' | 'error';
  message: string;
};

interface Props {
  logs: LogEntry[];
}

export const LogConsole: React.FC<Props> = ({ logs }) => {
  return (
    <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg overflow-auto text-xs font-mono">
      {logs.length === 0 && (
        <div className="p-3 text-slate-500">Logs will appear here…</div>
      )}
      {logs.map((log) => (
        <div
          key={log.id}
          className={`px-3 py-1 border-b border-slate-900 ${
            log.level === 'error' ? 'text-red-400' : 'text-slate-200'
          }`}
        >
          {log.message}
        </div>
      ))}
    </div>
  );
};