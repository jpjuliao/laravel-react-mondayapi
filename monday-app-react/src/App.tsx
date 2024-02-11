// App.tsx
import React from 'react';
import Dashboard from './components/Dashboard';

function App(): JSX.Element {
  return (
    <div className="container">
      <h1>Monday.com Dashboard</h1>
      <Dashboard />
    </div>
  );
}

export default App;
