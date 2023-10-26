'use client'

import Main from "./components/Dashboard";

const Dashboard = () => {
    return (
      <div className="container mx-auto p-4">
        {typeof window !== 'undefined' && <Dashboard />}
      </div>
    );
  };
  
  export default Dashboard;