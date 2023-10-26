import React from 'react';
import Dashboard from '@/app/components/Dashboard';
//esse main não precisaria, é o proprio children
const Main = () => {

  return (
    <div className="container mx-auto">
      <Dashboard />
    </div>
  );
};

export default Main;
