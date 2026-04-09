import React from 'react';
import MatrixBackground from './components/MatrixBackground';
import TerminalDashboard from './components/TerminalDashboard';

function App() {
  return (
    <div className="relative min-h-screen">
      <MatrixBackground />
      <TerminalDashboard />
    </div>
  );
}

export default App;