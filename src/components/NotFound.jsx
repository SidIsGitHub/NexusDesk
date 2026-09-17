import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
      <h2 className="text-4xl font-mono text-white tracking-widest">404 // DIRECTORY_NOT_FOUND</h2>
      <a 
        href="/" 
        className="px-6 py-2 border border-white/20 rounded-full text-white font-mono text-xs hover:bg-white/10 transition-colors"
      >
        RETURN TO TERMINAL
      </a>
    </div>
  );
}
