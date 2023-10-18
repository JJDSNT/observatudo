'use client'
import React from 'react';
import Main from '@/app/components/Main'


const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {typeof window !== 'undefined' && <Main />}
    </div>
  );
};

export default Home;
