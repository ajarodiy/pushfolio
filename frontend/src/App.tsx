import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import GitHubProfiler from '@/components/github-profiler';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="github-portfolio-theme">
      <div className="min-h-screen bg-background">
        <GitHubProfiler />
      </div>
    </ThemeProvider>
  );
}

export default App;