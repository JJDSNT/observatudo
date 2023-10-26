'use client'

import Dashboard from "./components/Dashboard";

const Home = () => {
    return (
      <div className="container mx-auto p-4">
        {typeof window !== 'undefined' && <Dashboard />}
      </div>
    );
  };
  
  export default Home;